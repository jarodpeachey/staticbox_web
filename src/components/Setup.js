import React, { useContext } from 'react';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import Header from './layout/Header';
import Section from './layout/Section';
import { DatabaseContext } from '../providers/DatabaseProvider';
import Card from './Card';
import Button from './Button';
import Accordion from './Accordion';
import Row from './grid/Row';
import { getCookie } from '../utils/cookies';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51Gr3KVKyL3kUtkPFJMQdsezF9hqGudJNNnwfdA9ZdH4i7MCdwni4qjxl32KSe1ClUpdapbLCMUkMeLfBeEHbwm5G00sPUTEKHc'
);

const Setup = ({}) => {
  const { state, q } = useContext(DatabaseContext);
  const { user, userClient } = state;

  const onClick = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        // Replace with the ID of your price
        {
          price:
            getCookie('selectedPlan') === 'monthly'
              ? 'price_1GsUwJKyL3kUtkPFMSMOB4kN'
              : 'price_1Gr3MLKyL3kUtkPFnhncjTRQ',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: 'https://app.staticbox.io',
      cancelUrl: 'https://app.staticbox.io',
    });
  };

  return (
    <>
      <Header>
        <Title className='mb-3'>{user && user.data.name}</Title>
        {/* <SiteLink href='https://google.com'>
                  https://google.com
                </SiteLink> */}
      </Header>
      <Section>
        <h1>Finish Setting Up Your Account</h1>
        <Card className='my-3 p-5'>
          <h4 className='m-none'>Add Billing Info</h4>
          <p>
            Your free trial does not start until you activate your account. Add
            your billing info to start your 7-day trial.
          </p>
          <Button onClick={onClick} className='m-none'>
            Add Info
          </Button>
        </Card>
      </Section>
    </>
  );
};

const Title = styled.h1`
  color: white !important;
`;

export default Setup;
