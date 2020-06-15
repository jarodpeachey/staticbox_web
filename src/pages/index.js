/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-fragments */
// src/pages/dashboard.js
import React, { useContext, useState, useEffect } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled from 'styled-components';
import DelayedLoad from '../components/DelayedLoad';
import Card from '../components/Card';
import Button from '../components/Button';
import { isBrowser } from '../utils/isBrowser';
import { DatabaseContext } from '../providers/DatabaseProvider';
import Site from '../components/dashboard/Site';
import Sites from '../components/dashboard/Sites';
import Settings from '../components/dashboard/Settings';
import Section from '../components/layout/Section';
import Header from '../components/layout/Header';
import SiteComments from '../components/dashboard/SiteComments';
import SiteSettings from '../components/dashboard/SiteSettings';
import SiteDashboard from '../components/dashboard/SiteDashboard';
import Setup from '../components/Setup';
import Row from '../components/grid/Row';
import Billing from '../components/dashboard/Billing';

const IndexPage = ({ location }) => {
  const { state, dispatch, loadingUser } = useContext(DatabaseContext);
  const { user, site } = state;

  // console.log('Events: ', getEvents());
  // // For older versions of Node, see https://github.com/stripe/stripe-node/#auto-pagination
  // for await (const event of events) {
  //   const session = event.data.object;

  //   // Fulfill the purchase...
  //   handleCheckoutSession(session);
  // }

  return (
    <DelayedLoad
      fullHeight
      condition={user}
      loading={loadingUser}
      min={
        location &&
        location.state &&
        location.state.noLoad &&
        location.state.noLoad
          ? 0
          : 1500
      }
      // min={0}
      render={
        <>
          {user && user.data && !user.data.plan ? (
            <Setup path='/setup' />
          ) : (
            <Router>
              <Sites path='/' />
              <Sites path='/sites' />
              <Settings path='/settings' />
              <Billing path='/billing' />
              <Site path='/sites/:siteId'>
                <SiteDashboard path='/' />
                <SiteComments path='/comments' />
                <SiteSettings path='/settings' />
              </Site>
            </Router>
          )}
        </>
      }
      fail={
        <>
          <Header></Header>
          <Section>
            <h1 className='center'>You're not signed in.</h1>
            <p className='center'>
              Sign in to access your comments, or create an account to get
              started.
            </p>
            <ButtonFlex className='mt-5'>
              <Button
                className='mr-4'
                color='primary'
                variant='outlined'
                link='/signup'
              >
                Create Account
              </Button>
              <Button color='primary' link='/login'>
                Login
              </Button>
            </ButtonFlex>
          </Section>
        </>
      }
    />
  );
};

const ButtonFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default IndexPage;
