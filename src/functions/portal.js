/* eslint-disable prefer-arrow-callback */
const stripeSdk = require('stripe');
const { callbackPromise } = require('nodemailer/lib/shared');
const stripe = stripeSdk(
  'pk_test_51Gr3KVKyL3kUtkPFJMQdsezF9hqGudJNNnwfdA9ZdH4i7MCdwni4qjxl32KSe1ClUpdapbLCMUkMeLfBeEHbwm5G00sPUTEKHc'
);

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  let response;

  callback(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: 'test',
  });
};
