#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { StripeWebhookStack } from "../lib/stripe-webhook-stack";
import * as dotenv from "dotenv";

dotenv.config();
const {
  STAGE: stage,
  WEBHOOK_SECRET: webhook_secret,
  SECRET_KEY: secret_key,
} = process.env;

if (!stage || !webhook_secret || !secret_key)
  throw new Error("Missing env config");

const app = new cdk.App();
new StripeWebhookStack(app, `StripeWebhookStack-${stage}`, {
  stage,
  webhook_secret,
  secret_key,
});
