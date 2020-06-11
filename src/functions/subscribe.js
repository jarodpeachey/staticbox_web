const stripeSdk = require('stripe');
const stripe = stripeSdk(
  'pk_test_51Gr3KVKyL3kUtkPFJMQdsezF9hqGudJNNnwfdA9ZdH4i7MCdwni4qjxl32KSe1ClUpdapbLCMUkMeLfBeEHbwm5G00sPUTEKHc'
);
const nodemailer = require('nodemailer');
const faunadb = require('faunadb');

const q = faunadb.query;

const client = new faunadb.Client({
  secret: 'fnADq29sx9ACE4FItI0Ps8suOAzL0UHyqDNFNjgV',
});

exports.handler = async (event, context) => {
  const eventJSON = JSON.parse(event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      event: event,
    }),
  };

  // client
  //   .query(
  //     q.Let(
  //       {
  //         user: q.Get(
  //           q.Match(
  //             q.Index('user_by_email'),
  //             event.body.data.object.customer_email
  //           )
  //         ),
  //         userRef: q.Select('ref', q.Var('user')),
  //       },
  //       q.Update(q.Var('userRef'), {
  //         data: {
  //           plan: event.body.data.object.subscription,
  //         },
  //       })
  //     )
  //   )
  //   .then((res) => {
  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify({
  //         res,
  //       }),
  //     };
  //   })
  //   .catch((err) => {
  //     return {
  //       statusCode: 200,
  //       body: JSON.stringify({
  //         err,
  //       }),
  //     };
  //   });
};
