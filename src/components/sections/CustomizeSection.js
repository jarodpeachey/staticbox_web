import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Section from '../layout/Section';
import Row from '../grid/Row';
import { ThemeContext } from '../theme';
import Spacer from '../Spacer';
import paintBucket from '../../images/icons8-fill-color-100.png';
import slider from '../../images/icons8-tune-100-2.png';
import Switch from 'react-switch';
import Card from '../Card';
import Button from '../Button';
import { loadStripe } from '@stripe/stripe-js';
import { setCookie } from '../../utils/cookies';
import { isBrowser } from '../../utils/isBrowser';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51Gr3KVKyL3kUtkPFJMQdsezF9hqGudJNNnwfdA9ZdH4i7MCdwni4qjxl32KSe1ClUpdapbLCMUkMeLfBeEHbwm5G00sPUTEKHc'
);

const CustomizeSection = ({ data }) => {
  const yearlyPriceID = 'price_1Gr3MLKyL3kUtkPFnhncjTRQ';
  const monthlyPriceID = 'price_1Gr3MLKyL3kUtkPFNHorrSve';

  const theme = useContext(ThemeContext);

  const [inputChecked, setInputChecked] = useState(false);

  const customOnChange = (setChecked) => {
    setInputChecked(setChecked);
  };

  const onClick = async () => {
    // TODO: Set FaunaDB temp selected plan option
    setCookie('selectedPlan', inputChecked ? 'yearly' : 'monthly');

    if (isBrowser()) {
      window.location.href = 'https://app.staticbox.io/signup';
    }
  };

  return (
    <Section
      customStyles={`
        position: relative !important;
        z-index: 1 !important;
        display: block !important;
        padding-bottom: 150px;
        margin-bottom: -150px;
      `}
      background='#ffffff'
    >
      <h1 className='center'>Dead-Simple Pricing</h1>
      <p className='center'>
        No hidden costs or surprise charges: one rate for everything you need
        for comments on your site.
      </p>
      <ToggleContainer>
        <span style={{ fontWeight: !inputChecked ? 'bold' : 400 }}>
          Monthly
        </span>
        <Switch
          checked={inputChecked}
          onChange={customOnChange}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow='0px 0px 9px -3px #666'
          activeBoxShadow='none'
          id='material-switch'
          offColor={theme.color.primary.main}
          onColor={theme.color.primary.main}
          offHandleColor='#ffffff'
          onHandleColor='#ffffff'
          className='mx-3 react-switch'
        />
        <span style={{ fontWeight: inputChecked ? 'bold' : 400 }}>Yearly</span>
      </ToggleContainer>
      <PricingCard
        customStyles={`
        max-width: 350px;
        margin: 38px auto;
      `}
      >
        {inputChecked ? <Alert>Save $21 a year!</Alert> : null}
        <Price>${inputChecked ? '99' : '10'}</Price>
        <PriceFrequency>per {inputChecked ? 'year' : 'month'}</PriceFrequency>
        <List>
          <ListItem>
            <FontAwesomeIcon
              style={{ color: theme.color.primary.main, marginRight: 8 }}
              icon='check'
            />
            Fully customizable form
          </ListItem>
          <ListItem>
            <FontAwesomeIcon
              style={{ color: theme.color.primary.main, marginRight: 8 }}
              icon='check'
            />
            Simple integration
          </ListItem>
          <ListItem>
            <FontAwesomeIcon
              style={{ color: theme.color.primary.main, marginRight: 8 }}
              icon='check'
            />
            Bulk moderation
          </ListItem>
          <ListItem>
            <FontAwesomeIcon
              style={{ color: theme.color.primary.main, marginRight: 8 }}
              icon='check'
            />
            Spam filtering
          </ListItem>
          <ListItem>
            <FontAwesomeIcon
              style={{ color: theme.color.primary.main, marginRight: 8 }}
              icon='check'
            />
            Custom messages and branding
          </ListItem>
          <ListItem>
            <FontAwesomeIcon
              style={{ color: theme.color.primary.main, marginRight: 8 }}
              icon='check'
            />
            Free support
          </ListItem>
        </List>
        <Button onClick={onClick} className='full-width mt-6 mb-4'>
          Start Free Trial
        </Button>
      </PricingCard>
    </Section>
  );
};

const Alert = styled.div`
  padding: 12px;
  width: 100%;
  margin: 0 auto;
  margin: 8px auto;
  background: ${(props) => props.theme.color.success};
  color: white;
  border-radius: 4px;
`;

const List = styled.div`
  margin: 0 auto;
  text-align: left;
  margin-top: 24px;
`;

const ListItem = styled.div`
  font-size: 16px;
  margin: 4px 0;
`;

const PricingCard = styled(Card)`
  padding: 16px;
  box-shadow: 1px 0px 7px 0px #666;
`;

const PriceIndicator = styled.span`
  font-size: 26px !important;
  font-weight: bold !important;
`;
const Price = styled.span`
  font-size: 64px !important;
  font-weight: bold !important;
`;
const PriceFrequency = styled.div`
  font-size: 18px !important;
  font-weight: 400 !important;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Feature = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  margin: 18px 0;
  align-items: flex-start;
  :first-child {
    margin-top: 0;
  }
`;

const FeatureIcon = styled.div`
  font-size: 36px !important;
  padding-right: 24px;
`;

const FeatureContent = styled.div``;

const FeatureTitle = styled.strong`
  display: block;
  margin: 0;
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 6px;
`;

const FeatureSubtitle = styled.p`
  margin-top: 0;
  font-size: 18px !important;
`;

export default CustomizeSection;
