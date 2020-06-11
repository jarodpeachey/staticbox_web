/* eslint-disable react/jsx-fragments */
// src/pages/settings.js
import React, { useContext, useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor from 'react-simple-code-editor';
import Card from '../Card';
import Button from '../Button';
import Spacer from '../Spacer';
import { AppContext } from '../../providers/AppProvider';
import { isBrowser } from '../../utils/isBrowser';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import Row from '../grid/Row';
import SiteKeyTable from '../SiteKeyTable';

const SiteSettings = ({ setLoadedKeys, loadedKeys }) => {
  const {
    setNotificationMessage,
    setNotificationType,
    setDeleteSiteModalOpen,
    setEditSiteInfoModalOpen,
    setCustomizeModalOpen,
  } = useContext(AppContext);
  const { state, q, serverClient } = useContext(DatabaseContext);
  const { site, user, siteClient } = state;
  const [activeTab, setActiveTab] = useState(
    isBrowser() && window.location.pathname.includes('api') ? 'api' : 'general'
  );
  const [keys, setKeys] = useState(
    loadedKeys && loadedKeys.length > 0 ? loadedKeys : []
  );
  const [loading, setLoading] = useState(
    !(loadedKeys && loadedKeys.length > 0)
  );
  const [showItems, setShowItems] = useState(
    loadedKeys && loadedKeys.length > 0
  );
  const [animate, setAnimate] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const [reRender, setRender] = useState(true);

  const [defaultInput, setDefaultInput] = useState('');
  const [hoverInput, sethoverInput] = useState('');
  const [focusedInput, setfocusedInput] = useState('');

  useEffect(() => {
    if (loadedKeys && loadedKeys.length > 0) {
      setKeys(loadedKeys);
    } else {
      siteClient
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index('all_keys'))),
            q.Lambda(
              'keysRef',
              q.Let(
                {
                  keys: q.Get(q.Var('keysRef')),
                  userRef: q.Get(q.Select(['data', 'user'], q.Var('keys'))),
                  siteRef: q.Get(q.Select(['data', 'site'], q.Var('keys'))),
                  type: q.Select(['data', 'type'], q.Var('keys')),
                  user: q.Get(q.Match(q.Index('all_users'))),
                  site: q.Get(
                    q.Ref(
                      q.Collection('sites'),
                      // q.Select(
                      q.Select('id', q.Select('ref', q.Var('siteRef')))
                      // )
                    )
                  ),
                },
                {
                  user: q.Var('user'),
                  type: q.Var('type'),
                  site: q.Var('site'),
                  ref: q.Select('ref', q.Var('keys')),
                  key: q.Select(['data', 'key'], q.Var('keys')),
                }
              )
            )
          )
        )
        .then((resTwo) => {
          console.log(resTwo);
          setLoadedKeys(resTwo.data);
          setKeys(resTwo.data);

          console.log(resTwo);
          setLoadedKeys(resTwo.data);
          setKeys(resTwo.data);
          setTimeout(() => {
            setShowItems(true);
            setAnimate(true);
            // setTimeout(() => {
            setAnimateItems(true);
            // }, 200);
            // setTimeout(() => {
            setLoading(false);
            setAnimate(false);
            setAnimateItems(false);
            // }, 200);
          }, 10000000000000000);
        })
        .catch((errTwo) => {
          console.log(errTwo);
          setShowItems(true);
          setAnimate(true);
          setTimeout(() => {
            setAnimateItems(true);
          }, 200);
          setTimeout(() => {
            setLoading(false);
            setAnimate(false);
            setAnimateItems(false);
          }, 200);
        });
    }
  }, []);

  useEffect(() => {
    if (reRender) {
      console.log('Getting keys!');
      siteClient
        .query(
          q.Map(
            q.Paginate(q.Match(q.Index('all_keys'))),
            q.Lambda(
              'keysRef',
              q.Let(
                {
                  keys: q.Get(q.Var('keysRef')),
                  userRef: q.Get(q.Select(['data', 'user'], q.Var('keys'))),
                  siteRef: q.Get(q.Select(['data', 'site'], q.Var('keys'))),
                  type: q.Select(['data', 'type'], q.Var('keys')),
                  user: q.Get(q.Match(q.Index('all_users'))),
                  site: q.Get(
                    q.Ref(
                      q.Collection('sites'),
                      // q.Select(
                      q.Select('id', q.Select('ref', q.Var('siteRef')))
                      // )
                    )
                  ),
                },
                {
                  user: q.Var('user'),
                  type: q.Var('type'),
                  site: q.Var('site'),
                  ref: q.Select('ref', q.Var('keys')),
                  key: q.Select(['data', 'key'], q.Var('keys')),
                }
              )
            )
          )
        )
        .then((resTwo) => {
          console.log(resTwo);
          setLoadedKeys(resTwo.data);
          setKeys(resTwo.data);

          console.log(resTwo);
          setLoadedKeys(resTwo.data);
          setKeys(resTwo.data);
          setTimeout(() => {
            setShowItems(true);
            setAnimate(true);
            // setTimeout(() => {
            setAnimateItems(true);
            // }, 200);
            // setTimeout(() => {
            setLoading(false);
            setAnimate(false);
            setAnimateItems(false);
            // }, 200);
          }, 10000000000000000000);
        })
        .catch((errTwo) => {
          console.log(errTwo);
          setShowItems(true);
          setAnimate(true);
          setTimeout(() => {
            setAnimateItems(true);
          }, 200);
          setTimeout(() => {
            setLoading(false);
            setAnimate(false);
            setAnimateItems(false);
          }, 200);
        });
      setRender(false);
    }
  }, [reRender]);

  const openEditSiteInfoModal = () => {
    setEditSiteInfoModalOpen(true);
  };

  const openDeleteSiteModal = () => {
    setDeleteSiteModalOpen(true);
  };

  const createAPIKey = () => {
    siteClient
      .query(
        q.Login(q.Match(q.Index('site_by_id'), site.data.id), {
          password: site.data.id,
        })
      )
      .then((secretResponse) => {
        console.log('Secret: ', secretResponse);

        setNotificationType('success');
        setNotificationMessage(
          `Successfully created key: ${secretResponse.secret}`
        );

        siteClient
          .query(
            q.Call(
              q.Function('create_key'),
              secretResponse.secret,
              user,
              site,
              'site'
            )
          )
          .then((keysResponseTwo) => {
            console.log(keysResponseTwo);

            const oldKeys = [...keys];

            oldKeys.push(keysResponseTwo.data);

            setKeys(oldKeys);
            // setRender(true);
          })
          .catch((keysErrorTwo) => console.log(keysErrorTwo));
      })
      .catch((secretErr) => console.log(secretErr));
  };

  const formatKeys = () => {
    const newKeys = [];

    keys.forEach((key) => {
      console.log(key);
    });

    return keys;
  };

  return (
    // <DelayedLoad>
    <span>
      <Row spacing={[32]} breakpoints={[769]}>
        <div widths={[3]}>
          <Tabs>
            <Tab
              active={activeTab === 'general'}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.history.pushState(
                    {},
                    '',
                    `/sites/${site.data.id}/settings`
                  );
                }
                setActiveTab('general');
              }}
            >
              <FontAwesomeIcon icon='home' />
              General
            </Tab>
            <Tab
              active={activeTab === 'api'}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.history.pushState(
                    {},
                    '',
                    `/sites/${site.data.id}/settings/api`
                  );
                }
                setActiveTab('api');
              }}
            >
              <FontAwesomeIcon icon='cog' />
              API
            </Tab>
            <Tab
              active={activeTab === 'customize'}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.history.pushState(
                    {},
                    '',
                    `/sites/${site.data.id}/settings/customize`
                  );
                }
                setActiveTab('customize');
              }}
            >
              <FontAwesomeIcon icon='palette' />
              Customize
            </Tab>
          </Tabs>
        </div>
        <div widths={[9]}>
          {activeTab === 'general' && (
            <>
              <Card title='Details'>
                <p className='small m-none'>
                  Site Name: {site.data.name || 'Guest'}
                </p>
                <Spacer />
                <Button
                  onClick={() => openEditSiteInfoModal(true)}
                  size='small'
                >
                  Edit
                </Button>
              </Card>
              <Spacer height={16} />
              <Card title='Delete Site'>
                <p>
                  Deleting your site will remove all your comments from our
                  database. Proceed with caution!
                </p>
                <Button onClick={() => openDeleteSiteModal(true)} size="small" color="error">
                  Delete
                </Button>
              </Card>
            </>
          )}
          {activeTab === 'api' && (
            <Card
              title='API Keys'
              subtitle='Your API keys grant access to all your comments. Keep them safe.'
            >
              {/* {keys.map((key) => {
                return (
                  <APIKey key={`api-key-${key.key}`}>
                    <strong>Key:</strong> {key.key}
                  </APIKey>
                );
              })} */}
              <SiteKeyTable
                user={user}
                animate={animate}
                animateItems={animateItems}
                showItems={showItems}
                loading={loading}
                title='Keys'
                data={formatKeys()}
                setRender={setRender}
              />
              <Spacer height={16} />
              <Button
                onClick={() => createAPIKey()}
                size='small'
                color='primary'
              >
                Create New
              </Button>
            </Card>
          )}
          {activeTab === 'customize' && (
            <>
              <Button
                onClick={() => setCustomizeModalOpen(true)}
                color='primary'
              >
                Edit With Live Preview
              </Button>
              <Spacer height={36} />
              <Card
                title='Form Template'
                subtitle='Updating your form template will NOT override your custom styles.'
              >
                <Row spacing={[12]} breakpoints={[0]}>
                  <div widths={[4]}>
                    <Template current>Clean</Template>
                  </div>
                  <div widths={[4]}>
                    <Template>Material Design</Template>
                  </div>
                  <div widths={[4]}>
                    <Template>Bootstrap</Template>
                  </div>
                </Row>
              </Card>
              <Spacer height={36} />
              <Card
                title='Content'
                subtitle='Edit the form heading and success message.'
              >
                <p className='m-none'>Form Heading: Chat With Us!</p>
                <p className='mb-none mt-3'>Button Text: Comment</p>
                <Spacer height={16} />
                <Button size='small'>Edit</Button>
              </Card>
              <Spacer height={36} />
              <Card title='Colors' subtitle='Edit your brand colors.'>
                <p className='m-none'>Primary</p>
                <input type='color' name='' id='' />
                <p className='mb-none mt-3'>Secondary</p>
                <input type='color' name='' id='' />
                <Spacer height={16} />
                <Button size='small'>Edit</Button>
              </Card>
            </>
          )}
        </div>
      </Row>
    </span>
  );
};

const Tabs = styled.div`
  width: 100%;
  position: relative;
`;

const Tab = styled.div`
  width: fit-content;
  width: 100%;
  display: block;
  padding: 8px 16px;
  border-radius: 5px;
  margin-right: 8px;
  transition-duration: 0.25s;
  background: ${(props) =>
    props.active ? props.theme.color.primary.backgroundDark : 'transparent'};
  color: ${(props) => (props.active ? 'white' : 'initial')};
  :hover {
    cursor: pointer;
    background: ${(props) =>
      props.active
        ? `${props.theme.color.primary.backgroundDark}`
        : props.theme.color.gray.three};
    transition-duration: 0.25s;
  }
  svg {
    margin-right: 8px;
    color: inherit;
  }
  text-decoration: none;
`;

const Template = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.radius.two};
  border: ${(props) =>
    props.current
      ? `1px solid ${props.theme.color.success}`
      : '1px solid #e8e8e8'};
  color: ${(props) => (props.current ? props.theme.color.success : 'initial')};
  cursor: pointer;
`;

export default SiteSettings;
