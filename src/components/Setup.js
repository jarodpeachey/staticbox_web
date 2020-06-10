import React, { useContext, useState } from 'react';
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
import { ThemeContext } from './theme';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51Gr3KVKyL3kUtkPFJMQdsezF9hqGudJNNnwfdA9ZdH4i7MCdwni4qjxl32KSe1ClUpdapbLCMUkMeLfBeEHbwm5G00sPUTEKHc'
);

const Setup = ({}) => {
  const { state, q } = useContext(DatabaseContext);
  const { user, userClient } = state;
  const theme = useContext(ThemeContext);
  const [planSelectOpen, setPlanSelectOpen] = useState(false);

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

  const togglePlanSelect = () => {
    console.log('Opening');
    setPlanSelectOpen(!planSelectOpen);
  };

  console.log(planSelectOpen);

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
        <Card
          customStyles={`
            transition-duration: .2s;
            h4 {
              margin: 0;
              width: 100%;
              cursor: pointer;
              padding: 27.5px;
              transition-duration: .2s;
              border-radius: 6px;
              color: ${
                planSelectOpen ? null : `${theme.color.success}`
              } !important;
              background: ${
                planSelectOpen ? '#ffffff' : `${theme.color.success}10`
              };
              :hover {
                background: ${
                  planSelectOpen ? '#00000010' : `${theme.color.success}20`
                };
              }
            }
            border: 1px solid ${
              planSelectOpen ? null : `${theme.color.success}`
            } !important;
          `}
          className='my-4 p-none'
        >
          <h4 onClick={togglePlanSelect}>Select Your Plan</h4>
          <Content className='px-5' open={planSelectOpen}>
            <Row spacing={[24]} breakpoints={[769]}>
              <div widths={[6]}>
                <Card
                  customStyles={`
                  margin: 0 auto !important;
                  width: 100%;
                  height: 250px;
                `}
                >
                  $25
                </Card>
              </div>
              <div widths={[6]}>
                <Card
                  customStyles={`
                  margin: 0 auto !important;
                  width: 100%;
                  height: 250px;
                `}
                >
                  $25
                </Card>
              </div>
            </Row>
          </Content>
        </Card>
        <Card className='my-4 p-5'>
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

const Content = styled.div`
  -webkit-transition: all 0.35s;
  -moz-transition: all 0.35s;
  -ms-transition: all 0.35s;
  -o-transition: all 0.35s;
  transition: all 0.35s;
  overflow: hidden;
  max-height: ${(props) => (props.open ? '300px' : '0')} !important;
  border-bottom: ${(props) => (props.open ? '1px solid #e8e8e8' : 'none')};
  padding-top: ${(props) => (props.open ? '18px' : '0px')};
  height: 300px;
`;

export default Setup;
