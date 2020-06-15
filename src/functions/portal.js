const stripeSdk = require('stripe');
const stripe = stripeSdk(
  'pk_test_51Gr3KVKyL3kUtkPFJMQdsezF9hqGudJNNnwfdA9ZdH4i7MCdwni4qjxl32KSe1ClUpdapbLCMUkMeLfBeEHbwm5G00sPUTEKHc'
);

exports.handler = async (event, context) => {
  stripe.billingPortal.sessions.create(
    {
      customer: 'cus',
      return_url: 'https://app.staticbox.io',
    },
    function (err, session) {
      return {
        statusCode: 200,
        body: session
    }
  );
};
