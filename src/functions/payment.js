const stripeSdk = require('stripe');
const stripe = stripeSdk(
  'pk_test_51Gr3KVKyL3kUtkPFJMQdsezF9hqGudJNNnwfdA9ZdH4i7MCdwni4qjxl32KSe1ClUpdapbLCMUkMeLfBeEHbwm5G00sPUTEKHc'
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

  let response = {};

  const client = new faunadb.Client({
    secret: 'fnADq29sx9ACE4FItI0Ps8suOAzL0UHyqDNFNjgV',
  });

  // await client
  //   .query(
  //     q.Let(
  //       {
  //         user: q.Get(
  //           q.Match(q.Index('user_by_email'), body.data.object.customer_email)
  //         ),
  //         userRef: q.Select('ref', q.Var('user')),
  //       },
  //       q.Update(q.Var('userRef'), {
  //         data: {
  //           plan: body.data.object.subscription,
  //           stripeId: body.data.object.id,
  //         },
  //       })
  //     )
  //   )
  //   .then((res) => {
  //     response = res;
  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify({
  //         test: 'Test',
  //         res,
  //       }),
  //     };
  //   })
  //   .catch((err) => {
  //     response = err;
  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify({
  //         test: 'Test',
  //         err,
  //       }),
  //     };
  //   });
  return {
    statusCode: 200,
    body: JSON.stringify({
      body,
    }),
  };
};
