const stripeSdk = require('stripe');
const stripe = stripeSdk(
  'sk_test_51Gr3KVKyL3kUtkPFScDjdRzYyQWVKxDLdsLzxXge8D3pfFzJSpqh0ocbszyUBJwilRlAnfhZ1Pkii8dP3t1K4jUA00BruwtUWI'
);
const nodemailer = require('nodemailer');
const faunadb = require('faunadb');

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  let response = null;

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     body,
  //   }),
  // };
  const q = faunadb.query;

  const client = new faunadb.Client({
    secret: 'fnADq29sx9ACE4FItI0Ps8suOAzL0UHyqDNFNjgV',
  });

  try {
    const customer = await stripe.customers.retrieve(body.data.object.customer);

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(res),
    // };

    await client
      .query(
        q.Let(
          {
            user: q.Get(q.Match(q.Index('user_by_email'), customer.email)),
            userRef: q.Select('ref', q.Var('user')),
          },
          q.Update(q.Var('userRef'), {
            data: {
              status: body.data.object.status,
            },
          })
        )
      )
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = err;
        // return {
        //   statusCode: 200,
        //   body: JSON.stringify({
        //     test: 'Test',
        //     err,
        //   }),
        // };
      });

    return {
      statusCode: 200,
      body: JSON.stringify({
        test: 'Test',
        response,
      }),
    };
  } catch (e) {
    return {
      statusCode: 422,
      body: JSON.stringify(e),
    };
  }
};
