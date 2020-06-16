/* eslint-disable prefer-arrow-callback */
const stripeSdk = require('stripe');
const { callbackPromise } = require('nodemailer/lib/shared');
const stripe = stripeSdk(
  'pk_test_51Gr3KVKyL3kUtkPFJMQdsezF9hqGudJNNnwfdA9ZdH4i7MCdwni4qjxl32KSe1ClUpdapbLCMUkMeLfBeEHbwm5G00sPUTEKHc'
);

exports.handler = async function (event, context, callback) {
  const json = JSON.parse(event.body);
  let response;
  const res = await stripe.billingPortal.sessions.create(
    {
      customer: json.customer,
      return_url: 'https://example.com/account',
    },
    function (err, session) {
      console.log('test');
      console.log(err);

      response = session;

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(session),
      });
    }
  );
  // .then((res) => {
  //   callback(null, {
  //     statusCode: 200,
  //     body: JSON.stringify({
  //       body: res,
  //     }),
  //   });
  // })
  // .catch((err) => {
  //   callback(null, {
  //     statusCode: 200,
  //     body: JSON.stringify({
  //       body: { msg: 'Error!', data: err },
  //     }),
  //   });
  // });
};
