/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-fragments */
// src/pages/dashboard.js
import React, { useContext, useState, useEffect } from 'react';
import { Router, Link } from '@reach/router';
// import { Link } from 'gatsby';
import styled from 'styled-components';
import DelayedLoad from '../components/DelayedLoad';
import Card from '../components/Card';
import Button from '../components/Button';
import { isBrowser } from '../utils/isBrowser';
import { DatabaseContext } from '../providers/DatabaseProvider';
import Site from '../components/dashboard/Site';
import Sites from '../components/dashboard/Sites';

const IndexPage = () => {
  const [activeTab, setActiveTab] = useState(
    isBrowser() && window.location.pathname.includes('billing')
      ? 'billing'
      : isBrowser() && window.location.pathname.includes('new')
      ? 'new'
      : isBrowser() && window.location.pathname.includes('settings')
      ? 'settings'
      : 'sites'
  );
  const { state, dispatch } = useContext(DatabaseContext);
  const { user, site } = state;
  const [loadedSites, setLoadedSites] = useState([]);
  const [loadedKeys, setLoadedKeys] = useState([]);

  return (
    <DelayedLoad
      fullHeight
      condition={user}
      delay={3000}
      render={
        <Router>
          <Site path='site' />
          <Sites path='/' />
        </Router>
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

const Tab = styled.div`
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

export default IndexPage;
