const stripeSdk = require('stripe');
const stripe = stripeSdk(
  'pk_test_51Gr3KVKyL3kUtkPFJMQdsezF9hqGudJNNnwfdA9ZdH4i7MCdwni4qjxl32KSe1ClUpdapbLCMUkMeLfBeEHbwm5G00sPUTEKHc'
);
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  const sig = event.headers['stripe-signature'];

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jarodpeachey@gmail.com',
      pass: 'jpdevelop_google1',
    },
  });

  const mailOptions = {
    from: 'jarodpeachey@gmail.com',
    to: 'jarodpeachey@gmail.com',
    subject: 'User signed up.',
    text: `${JSON.stringify(event)}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        error: err,
      }),
    };

    console.log('ERROR');
  }

  // Handle the checkout.session.completed stripeEvent
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;

    // Fulfill the purchase...
    handleCheckoutSession(session);
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    body: JSON.stringify({
      received: true,
    }),
  };
};
