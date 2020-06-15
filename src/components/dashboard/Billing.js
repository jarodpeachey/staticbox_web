/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-fragments */
// src/pages/Dashboard.js
import React, { useContext, useEffect } from 'react';
import { Link } from 'gatsby';
import styled, { keyframes, css } from 'styled-components';
import Card from '../Card';
import Button from '../Button';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import Spacer from '../Spacer';
import Header from '../layout/Header';
import Section from '../layout/Section';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
  'pk_test_51Gr3KVKyL3kUtkPFJMQdsezF9hqGudJNNnwfdA9ZdH4i7MCdwni4qjxl32KSe1ClUpdapbLCMUkMeLfBeEHbwm5G00sPUTEKHc'
);

const Billing = () => {
  const { state, q } = useContext(DatabaseContext);
  const { user, userClient } = state;

  useEffect(() => {}, [user]);

  const onClick = async () => {
    fetch('/.netlify/functions/portal')
      .then((res) => {
        console.log(res);
        // const bodyTwo = JSON.parse(res.body);
        // console.log(bodyTwo);
      })
      .catch((err) => console.log(err));
  };

  return (
    // <DelayedLoad>
    <span>
      <Header>
        <Title className='mb-3'>{user && user.data.name}</Title>
        {/* <SiteLink href='https://google.com'>
                  https://google.com
                </SiteLink> */}
        <Tabs>
          <Tab
            active={
              window.location.pathname.includes('sites') ||
              window.location.pathname === '/'
            }
            to='/sites'
          >
            {/* <FontAwesomeIcon icon='home' /> */}
            Sites
          </Tab>
          <Tab
            active={window.location.pathname.includes('billing')}
            to='/billing'
          >
            {/* <FontAwesomeIcon icon='dollar-sign' /> */}
            Billing
          </Tab>
          <Tab
            to='/settings'
            active={window.location.pathname.includes('settings')}
          >
            {/* <FontAwesomeIcon icon='cog' /> */}
            Settings
          </Tab>

          {/* <Tab
                      active={
                        typeof window !== 'undefined' &&
                        window.location.pathname.includes('/dashboard/settings')
                      }
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.history.pushState({}, '', '/dashboard/dashboard/billing');
                        }
                        setActiveTab('billing');
                      }}
                    >
                      <FontAwesomeIcon icon='dollar-sign' />
                      Billing
                    </Tab> */}
        </Tabs>
      </Header>
      <Section>
        {/* <Row spacing={[12]} breakpoints={[0]}>
          <div widths={[6]}>
            <h1 className='m-none'>Billing</h1>
          </div>
          <div widths={[6]}></div>
        </Row> */}
        <Spacer height={38} />
        <Card title='Billing'>
          <p>
            Your billing information is secured by Stripe. To edit your
            subscription or billing information, you can access the Stripe
            customer portal below.
          </p>
          <Button color='primary' onClick={onClick}>
            Go To Portal
          </Button>
        </Card>
      </Section>
    </span>
  );
};

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const Title = styled.h1`
  color: white !important;
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-left: -10px;
`;

const Tab = styled(Link)`
  width: fit-content;
  display: block;
  text-align: center;
  padding: 8px 16px;
  border-radius: 4px;
  margin-right: 6px;
  font-weight: 600 !important;
  transition-duration: 0.25s;
  color: ${(props) => (props.active ? 'white' : '#ffffff90')};
  :hover {
    cursor: pointer;
    background: #00000060;
    transition-duration: 0.25s;
  }
  svg {
    color: inherit;
    @media (min-width: 435px) {
      margin-right: 8px;
    }
  }
  text-decoration: none;
`;

const Skeleton = styled.div`
  padding: 16px;
  // margin-bottom: 32px;
  background: white;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.gray.three};
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 225px;
  overflow: hidden;
  position: relative;
  transform: scale(${(props) => (props.animate ? 0 : 1)});
  opacity: ${(props) => (props.animate ? 0 : 1)};
  transition: all 0.2s ease-in;
  ::after {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
    left: 0 !important;
    height: 100% !important;
    bottom: 0 !important;
    transform: translateX(-100%) !important;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.5) 30%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.5) 70%,
      rgba(255, 255, 255, 0) 100%
    ) !important;
    animation: ${shimmer} 2s infinite !important;
  }
`;

const Site = styled(Link)`
  width: 100%;
  height: 100%;
  // max-width: 300px;
  height: 225px;
  display: block;
  // border-bottom: 2px solid ${(props) => props.theme.color.gray.three};
  text-decoration: none;
`;

const SiteName = styled.h2`
  margin-top: 0;
  ${(props) =>
    props.skeleton &&
    css`
      width: 60%;
      height: 20px;
      border-radius: 5px;
      background: ${props.theme.color.gray.four};
      margin: 0 auto;
      display: block;
      margin: 0 0 12px 0;
      overflow-x: hidden;
      position: relative;
    `};
`;

const SiteDate = styled.small`
  color: ${(props) => props.theme.color.text.paragraph};
  margin-top: 0;
  ${(props) =>
    props.skeleton &&
    css`
      width: 30%;
      height: 20px;
      border-radius: 5px;
      background: ${props.theme.color.gray.four};
      margin: 0 auto;
      display: block;
      overflow-x: hidden;
    //   ::after {
    //     content: '';
    //     position: absolute;
    //     top: 0;
    //     right: 0;
    //     left: 0;
    //     bottom: 0;
    //     transform: translateX(-100%);
    //     background-image: linear-gradient(
    //       90deg,
    //       rgba(255, 255, 255, 0) 0,
    //       rgba(255, 255, 255, 0.2) 20%,
    //       rgba(255, 255, 255, 0.5) 60%,
    //       rgba(255, 255, 255, 0) 0
    //     );
    //     animation: ${shimmer} 5s infinite;
    //   }
    // `};
`;

const animation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const SlideWrapper = styled.div`
  animation: ${animation} 250ms ease-out;
`;

export default Billing;
