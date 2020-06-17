/* eslint-disable prefer-arrow-callback */
const stripeSdk = require('stripe');

const stripe = stripeSdk(
  'sk_test_51Gr3KVKyL3kUtkPFScDjdRzYyQWVKxDLdsLzxXge8D3pfFzJSpqh0ocbszyUBJwilRlAnfhZ1Pkii8dP3t1K4jUA00BruwtUWI'
);

exports.handler = async function (event, context, callback) {
  const json = JSON.parse(event.body);
  let response = {
    test: 'Test',
    testTwo: 'Test',
  };

  const res = await stripe.billingPortal.sessions.create(
    {
      customer: json.customer,
      return_url: 'https://app.staticbox.io',
    },
    function (err, session) {
      console.log('test');
      console.log(err);

      response = session;

      return {
        statusCode: 200,
        body: session
      };
    }
  );
};
