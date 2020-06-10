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

const IndexPage = ({ location }) => {
  const { state, dispatch, loadingUser } = useContext(DatabaseContext);
  const { user, site } = state;

  return (
    <DelayedLoad
      fullHeight
      condition={user}
      loading={loadingUser}
      min={location && location.state && location.state.noLoad && location.state.noLoad ? 0 : 1500}
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
        <div id='blur'>
          <Card>
            <h1>
              This page is top-secret!
              <span aria-label='Shushing Emoji' role='img'>
                🤫
              </span>
            </h1>
            <p>
              This page is only available to Triangle users. You can join the
              club by signing up for an dashboard.
            </p>
            <Button link='/' secondary>
              Let's Go!
            </Button>
          </Card>
        </div>
      }
    />
  );
};

export default IndexPage;
