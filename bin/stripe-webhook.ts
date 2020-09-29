#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StripeWebhookStack } from '../lib/stripe-webhook-stack';

const app = new cdk.App();
new StripeWebhookStack(app, 'StripeWebhookStack');
