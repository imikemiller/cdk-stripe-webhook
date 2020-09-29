import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import StripeWebhook = require('../lib/stripe-webhook-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new StripeWebhook.StripeWebhookStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
