import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import StripeWebhook = require("../lib/stripe-webhook-stack");

test("Empty Stack", () => {
  const app = new cdk.App({ outdir: "./cdk.out" });
  // WHEN
  const stack = new StripeWebhook.StripeWebhookStack(app, "MyTestStack", {
    stage: "fake",
    webhook_secret: "fake_webhook_secret",
    secret_key: "fake_secret_key",
  });
  // THEN
  expectCDK(stack).to(haveResource("AWS::IAM::Role"));
  expectCDK(stack).to(haveResource("AWS::Lambda::Function"));
  expectCDK(stack).to(haveResource("AWS::ApiGateway::RestApi"));
});
