/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-fragments */
// src/pages/dashboard.js
import React, { useContext, useState, useEffect } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Section from '../components/layout/Section';
import Sites from '../components/dashboard/Sites';
import Settings from '../components/dashboard/Settings';
import Billing from '../components/dashboard/Billing';
import DelayedLoad from '../components/DelayedLoad';
import Row from '../components/grid/Row';
import Card from '../components/Card';
import Button from '../components/Button';
import { isBrowser } from '../utils/isBrowser';
import { DatabaseContext } from '../providers/DatabaseProvider';
import Spacer from '../components/Spacer';
import Site from '../components/dashboard/Site';
import NewSite from '../components/dashboard/NewSite';

const Setup = () => {
  const { state, dispatch } = useContext(DatabaseContext);
  const { user, site } = state;

  return (
    <DelayedLoad
      fullHeight
      condition={user}
      delay={3000}
      render={
        <div id='blur'>
          <Section
            thin
            customStyles={`
          position: absolute;
          top: 0;
          padding: 96px 0 24px;
          display: block;
          width: 100%;
        `}
            dark
          >
            <Row
              customStyles={`
              align-items: flex-end !important;
            `}
              spacing={[12]}
              breakpoints={[769]}
            >
              <div widths={['auto']}>
                {' '}
                <Title className='mb-none'>{user && user.data.name}</Title>
                {/* <SiteLink href='https://google.com'>
                  https://google.com
                </SiteLink> */}
              </div>
            </Row>
          </Section>
          <Section
            customStyles={`
        padding-top: 80px;
                  @media(min-width: 769px) {
            padding-top: 48px;
          }
      `}
          >
            <span>
              <Spacer height={36} />
              <h1>Set up your account</h1>
            </span>
          </Section>
        </div>
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

const SiteLink = styled.a`
  margin: 0;
  text-decoration: none;
  color: #ffffffcc !important;
  :hover {
    color: ${(props) => props.theme.color.primary.light};
  }
`;

const Tabs = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  @media(min-width: 480px) {
    flex-direction: row;
    margin-bottom -12px;
    margin-left: -16px;
  }
  @media(min-width: 769px) {
    justify-content: flex-end;
    margin-left: 0;
    margin-right: -20px;
  }
`;

const Tab = styled.div`
  width: fit-content;
  display: block;
  text-align: center;
  padding: 8px 16px;
  border-radius: 50px;
  margin-right: 8px;
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
  @media (min-width: 900px) {
    // padding: 8px 0;
    margin: 4px 0;
    // background: transparent;
    // border: none;
    // border-radius: none;
  }
`;

export default Setup;
