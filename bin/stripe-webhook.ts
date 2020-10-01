#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { StripeWebhookStack } from "../lib/stripe-webhook-stack";
import * as dotenv from "dotenv";

dotenv.config();
const stage = process.env.STAGE || "develop";
const webhook_secret = process.env.WEBHOOK_SECRET || "";
const secret_key = process.env.SECRET_KEY || "";

const app = new cdk.App();
new StripeWebhookStack(app, `StripeWebhookStack-${stage}`, {
  stage,
  webhook_secret,
  secret_key,
});
