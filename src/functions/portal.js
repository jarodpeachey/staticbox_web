/* eslint-disable prefer-arrow-callback */
const stripeSdk = require('stripe');
const stripe = stripeSdk(
  'pk_test_51Gr3KVKyL3kUtkPFJMQdsezF9hqGudJNNnwfdA9ZdH4i7MCdwni4qjxl32KSe1ClUpdapbLCMUkMeLfBeEHbwm5G00sPUTEKHc'
);

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  let response;

  return {
    statusCode: 200,
    body: 'Test',
  };
};
