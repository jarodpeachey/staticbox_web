/* eslint-disable react/jsx-fragments */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Header from './layout/Header';
import Section from './layout/Section';
import { DatabaseContext } from '../providers/DatabaseProvider';
import Card from './Card';
import Button from './Button';
import Accordion from './Accordion';
import Row from './grid/Row';
import { getCookie, setCookie } from '../utils/cookies';
import { ThemeContext } from './theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
  'pk_test_51Gr3KVKyL3kUtkPFJMQdsezF9hqGudJNNnwfdA9ZdH4i7MCdwni4qjxl32KSe1ClUpdapbLCMUkMeLfBeEHbwm5G00sPUTEKHc'
);

const Setup = ({}) => {
  const { state, q } = useContext(DatabaseContext);
  const { user, userClient } = state;
  const theme = useContext(ThemeContext);
  const [selectedPlan, setSelectedPlan] = useState(getCookie('selectedPlan'));
  const [planSelectOpen, setPlanSelectOpen] = useState(selectedPlan === '');

  console.log(selectedPlan);

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
      customerEmail: user.data.email,
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
              border-radius: 4px;
              border-bottom-right-radius: ${planSelectOpen ? '0px' : '4px'};
              border-bottom-left-radius: ${planSelectOpen ? '0px' : '4px'};
              color: ${
                planSelectOpen
                  ? null
                  : selectedPlan !== '' && `${theme.color.success}`
              } !important;
              background: ${
                planSelectOpen
                  ? '#ffffff'
                  : selectedPlan !== '' && `${theme.color.success}10`
              };
              :hover {
                background: ${
                  planSelectOpen
                    ? '#00000010'
                    : selectedPlan !== '' && `${theme.color.success}20`
                };
              }
            }
            border: 1px solid ${
              planSelectOpen
                ? null
                : selectedPlan !== '' && `${theme.color.success}`
            } !important;
          `}
          className='my-4 p-none'
        >
          <h4
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={togglePlanSelect}
          >
            {selectedPlan !== '' && (
              <FontAwesomeIcon
                style={{
                  fontSize: 22,
                  marginRight: 8,
                  position: 'relative',
                  top: -1,
                }}
                icon='check'
              />
            )}
            Select Your Plan
            <FontAwesomeIcon
              style={{
                fontSize: 22,
                position: 'relative',
                top: 1,
                left: 6,
                marginLeft: 'auto',
                transform: `${planSelectOpen ? 'rotate(180deg)' : 'none'}`,
                transitionDuration: '.2s',
                display: 'block',
              }}
              icon='chevron-down'
            />
          </h4>
          <Content className='px-5' open={planSelectOpen}>
            <Row spacing={[8, 18]} breakpoints={[769]}>
              <div widths={[6]}>
                <Card
                  customStyles={`
                    margin: 0 auto !important;
                    width: 100%;
                    cursor: pointer;
                    border: ${
                      selectedPlan === 'monthly'
                        ? `1px solid ${theme.color.success}`
                        : null
                    };
                  `}
                  onClick={() => {
                    setSelectedPlan('monthly');
                    setCookie('selectedPlan', 'monthly');
                  }}
                >
                  <Flex>
                    <h1 className='m-none'>Monthly</h1>
                    <Price>$10</Price>
                  </Flex>
                </Card>
              </div>
              <div widths={[6]}>
                <Card
                  customStyles={`
                    margin: 0 auto !important;
                    width: 100%;
                    cursor: pointer;
                    border: ${
                      selectedPlan === 'yearly'
                        ? `1px solid ${theme.color.success}`
                        : null
                    };
                  `}
                  onClick={() => {
                    setSelectedPlan('yearly');
                    setCookie('selectedPlan', 'yearly');
                  }}
                >
                  <Flex>
                    <h1 className='m-none'>Yearly</h1>
                    <Price>$99</Price>
                  </Flex>
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
          <Button color='primary' onClick={onClick} className='m-none'>
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
  transition-duration: 0.15s;
  overflow: hidden;
  max-height: ${(props) => (props.open ? '300px' : '0')} !important;
  border-bottom: ${(props) => (props.open ? '1px solid #e8e8e8' : 'none')};
  padding-top: ${(props) => (props.open ? '18px' : '0px')};
  padding-bottom: ${(props) => (props.open ? '27.5px' : '0px')};
  height: fit-content;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.h1`
  font-size: 48px !important;
  font-weight: bold !important;
  margin: 0 !important;
`;

export default Setup;
