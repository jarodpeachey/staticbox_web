/* eslint-disable react/jsx-fragments */
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import Section from '../layout/Section';
import Row from '../grid/Row';
import Spacer from '../Spacer';
import { Link } from 'gatsby';
import SiteSettings from './SiteSettings';
import SiteDashboard from './SiteDashboard';
import { isBrowser } from '../../utils/isBrowser';
import DelayedLoad from '../DelayedLoad';
import Card from '../Card';
import Button from '../Button';
import { AppContext } from '../../providers/AppProvider';
import SiteComments from './SiteComments';
import { formatSiteId } from '../../utils/formatSiteId';
import Loader from '../Loader';
import Header from '../layout/Header';

const Site = ({ children }) => {
  const { setNotificationMessage, setNotificationType } = useContext(
    AppContext
  );
  const { state, q, dispatch } = useContext(DatabaseContext);
  const { user, site, userClient } = state;

  const [activeTab, setActiveTab] = useState(
    isBrowser() && window.location.pathname.includes('comments')
      ? 'comments'
      : isBrowser() && window.location.pathname.includes('settings')
      ? 'settings'
      : 'home'
  );
  const [loading, setLoading] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [loadedKeys, setLoadedKeys] = useState([]);
  const [loadedComments, setLoadedComments] = useState([]);

  useEffect(() => {
    let siteIdIndex = 2;
    const pathnames = window.location.pathname.split('/');
    console.log(pathnames);

    pathnames.forEach((item, index) => {
      if (item === 'sites') {
        siteIdIndex = index + 1;
      }
    });

    userClient
      .query(
        q.Get(
          q.Match(
            q.Index('site_by_id'),
            isBrowser() && q.Select(siteIdIndex, pathnames)
          )
        )
      )
      .then((response) => {
        console.log(response);

        userClient
          .query(
            q.Login(q.Select('ref', response), {
              password: q.Select(['data', 'id'], response),
            })
          )
          .then((responseTwo) => {
            dispatch({
              type: 'loginSite',
              data: {
                secret: responseTwo.secret,
                site: response,
              },
            });
            setLoading(false);
          })
          .catch((errorTwo) => {
            setNotificationType('error');
            setNotificationMessage(
              'There was an error accessing your site data.'
            );
            // window.location.href = '/sites';
            console.log('Error getting and logging in site: ', errorTwo);
          });
      })
      .catch((errorTwo) => {
        setNotificationType('error');
        setNotificationMessage('There was an error accessing your site data.');
        // window.location.href = '/sites';
        console.log('Error getting site data: ', errorTwo);
      });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
  }, []);

  const onResize = () => {
    console.log('Resize!');
    setHeaderHeight(document.getElementById('background').clientHeight);
  };

  console.log(site);
  return (
    <div id='blur'>
      <Header>
        <Title className='mb-3'>{site && site.data.name}</Title>
        {/* <SiteLink href='https://google.com'>
                  https://google.com
                </SiteLink> */}
        <Tabs>
          <Tab
            active={
              isBrowser() &&
              window.location.pathname ===
                `/sites/${formatSiteId(site.data.name)}`
            }
            to={`/sites/${formatSiteId(site.data.name)}`}
          >
            <FontAwesomeIcon icon='home' />
            Dashboard
          </Tab>
          <Tab
            active={
              isBrowser() &&
              window.location.pathname ===
                `/sites/${formatSiteId(site.data.name)}/comments`
            }
            to={`/sites/${formatSiteId(site.data.name)}/comments`}
          >
            <FontAwesomeIcon icon='comment' />
            Comments
          </Tab>
          <Tab
            active={
              isBrowser() &&
              window.location.pathname ===
                `/sites/${formatSiteId(site.data.name)}/settings`
            }
            to={`/sites/${formatSiteId(site.data.name)}/settings`}
          >
            <FontAwesomeIcon icon='cog' />
            <span className='tablet inline'>Site</span> Settings
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
        {loading && <Loader size={75} />}
        {!loading && children}
      </Section>
      {/* <Router>
                      <DelayedLoad> */}
      {/* {activeTab === 'billing' && <Billing />} */}
      {/* </DelayedLoad>
                    </Router> */}
    </div>
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

export default Site;
