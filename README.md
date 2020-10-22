# Stripe Webhook Server

To deploy an API Gateway as a proxy to a Lambda function that will serve as the handler for the incoming Stripe events (further information on the events that can be expected can be found [here](https://stripe.com/docs/api/events/types))

## Setting Up Locally

### Retrieving a Stripe Secret Key
Create a Stripe account and retrieve your secret key from the console [here](https://dashboard.stripe.com/test/apikeys).

Copy the secret key into your `.env.local` using the example provided.

### Setup a local listener
Ensure you have the Stripe CLI installed and run:

`stripe listen --forward-to=127.0.0.1:4242`

The log should print a message similar to this:

`> Ready! Your webhook signing secret is whsec_yoursecret (^C to quit)`

### Invoke the Lambda local server
Copy the secret into your `env.local` file, open another terminal window and run:

`yarn invoke`

This will start a local web server listening on `127.0.0.1:4242` which will recieve events from Stripe.

### Start recieving events
Any events sent over Stripe's API will be forwarded onto your local webserver. To simulate this locally using the CLI run:

`stripe trigger <any.event.name>`

## Useful commands

 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
