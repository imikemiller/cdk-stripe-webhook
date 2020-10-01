import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import controllers from "./controllers";
import Stripe from "stripe";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    //validation
    if (!event.body) throw new Error("No request body!");
    if (!process.env.SECRET_KEY || !process.env.WEBHOOK_SECRET)
      throw new Error("Missing required env");

    const stripe = new Stripe(process.env.SECRET_KEY, {
      apiVersion: "2020-08-27",
    });

    const validEvent: Stripe.Event = stripe.webhooks.constructEvent(
      event.body,
      event.headers["stripe-signature"],
      process.env.WEBHOOK_SECRET
    );

    //pass data into the event handler if registered
    const { data, type } = validEvent;
    if (controllers[type] instanceof Function) {
      controllers[type](data, stripe);
    }

    return responseBody(200, `Handled event of type ${type}`);
  } catch (err) {
    return responseBody(
      err.statusCode || 501,
      err.message || "Internal server error"
    );
  }
};

const responseBody = (
  statusCode: number,
  body: string
): APIGatewayProxyResult => ({
  statusCode,
  headers: { "Content-Type": "text/plain" },
  body,
});
