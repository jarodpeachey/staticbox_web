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
    to: 'jwpeachey107@aol.com',
    subject: 'Staticbox Test Email',
    text: `${JSON.stringify(event)}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      test: true,
      testTwo: 'test',
    }),
  };
};
