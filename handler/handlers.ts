import Stripe from "stripe";

type HandlerFunction = (
  data: Stripe.Event.Data.Object,
  stripe: Stripe
) => Promise<void>;

const Handlers: { [key: string]: HandlerFunction } = {
  //Example event controller
  "customer.subscription.updated": async (data) =>
    console.log("Sub Updated", data),
};

export default Handlers;
