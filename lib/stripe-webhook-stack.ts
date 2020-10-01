import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda-nodejs";
import * as cdk from "@aws-cdk/core";


export interface StripeWebhookProps {
  stage: string;
  secret_key: string;
  webhook_secret: string;
}

export class StripeWebhookStack extends cdk.Stack {
  constructor(
    scope: cdk.Construct,
    id: string,
    props: StripeWebhookProps = {
      stage: "develop",
      secret_key: "",
      webhook_secret: "",
    }
  ) {
    super(scope, id);

    if (!props.secret_key || !props.webhook_secret)
      throw new Error(
        "Must set Stripe env variables SECRET_KEY and WEBHOOK_SECRET"
      );

    const backend = new lambda.NodejsFunction(
      this,
      `StripeWebhookHandlerLambda-${props.stage}`,
      {
        handler: "handler",
        entry: __dirname + "/handler/index.ts",
        environment: {
          SECRET_KEY: props.secret_key,
          WEBHOOK_SECRET: props.webhook_secret,
        },
      }
    );

    new apigateway.LambdaRestApi(
      this,
      `StripeWebhookHandlerApi-${props.stage}`,
      {
        handler: backend,
        deployOptions:{
          stageName:props.stage
        }
      }
    );
  }
}
