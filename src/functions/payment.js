const stripeSdk = require('stripe');
const stripe = stripeSdk(
  'sk_test_51Gr3KVKyL3kUtkPFScDjdRzYyQWVKxDLdsLzxXge8D3pfFzJSpqh0ocbszyUBJwilRlAnfhZ1Pkii8dP3t1K4jUA00BruwtUWI'
);
const nodemailer = require('nodemailer');
const faunadb = require('faunadb');

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

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
    const res = await stripe.customers.retrieve(body.data.object.customer);

    await client
      .query(
        q.Let(
          {
            user: q.Get(q.Match(q.Index('user_by_stripe_id'), res.data.email)),
            userRef: q.Select('ref', q.Var('user')),
          },
          q.Update(q.Var('userRef'), {
            data: {
              status: body.status,
            },
          })
        )
      )
      .then((response) => {
        return {
          statusCode: 200,
          body: JSON.stringify({
            test: 'Test',
            response,
          }),
        };
      })
      .catch((err) => {
        response = err;
        return {
          statusCode: 200,
          body: JSON.stringify({
            test: 'Test',
            err,
          }),
        };
      });
  } catch (e) {
    return {
      statusCode: 422,
      body: JSON.stringify(e),
    };
  }
};
