import Stripe from "stripe";

/**
 * Register handlers for the stripe events here
 *
 * https://stripe.com/docs/api/events/types
 */
type ControllerFunction = (
  data: Stripe.Event.Data.Object,
  stripe: Stripe
) => void;

const Controllers: { [key: string]: ControllerFunction } = {
  //Example event controller
  "customer.subscription.updated": async (data) =>
    console.log("Sub Updated", data),
};

export default Controllers;
