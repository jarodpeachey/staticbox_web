/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-fragments */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Menu from './Menu';
// import MobileMenu from './MobileMenu';
import { AppContext } from '../../providers/AppProvider';
import Button from '../Button';
import Row from '../grid/Row';
import { FirebaseContext } from '../../providers/FirebaseProvider';
import { DatabaseContext } from '../../providers/DatabaseProvider';
import { isBrowser } from '../../utils/isBrowser';
import Spacer from '../Spacer';

const Header = ({ siteTitle, children }) => {
  const {
    scrolled,
    setScrolled,
    setNotificationMessage,
    setNotificationType,
  } = useContext(AppContext);
  const { firebase } = useContext(FirebaseContext);
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const { dispatch, state } = useContext(DatabaseContext);
  const { user } = state;

  console.log('Header', user);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    const inner = document.getElementById('blur')
      ? document.getElementById('blur').offsetWidth
      : 0;
    const outer = document.getElementById('mobile-menu')
      ? document.getElementById('mobile-menu').offsetWidth
      : 0;

    setWidth(outer - inner);

    return () => {
      setWidth();
      window.removeEventListener('scroll', onScroll);
    };
  });

  const toggleFunction = () => {
    if (open) {
      document.getElementById('blur').classList.remove('blur');
    } else {
      document.getElementById('blur').classList.add('blur');
    }

    setOpen(!open);
  };

  const accountToggleFunction = () => {
    setAccountOpen(!accountOpen);
  };

  const onScroll = () => {
    if (
      window.scrollY > 40 &&
      isBrowser() &&
      !window.location.pathname.includes('dashboard')
    ) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <div>
      {typeof window !== 'undefined' &&
      !window.location.pathname.includes('/signup') &&
      !window.location.pathname.includes('/login') ? (
        <>
          <Wrapper id='header'>
            <div className='container'>
              <Flex className={user ? 'mb-6' : ''}>
                <SiteTitle className='logo'>
                  <FontAwesomeIcon icon='comment-alt' />
                  Staticbox
                  {user && user.data.status === 'trialing' && (
                    <div
                      style={{
                        background: 'white',
                        padding: '1px 8px',
                        borderRadius: 999,
                        display: 'inline',
                        color: 'black',
                        fontSize: 14,
                        position: 'relative',
                        top: '-2px',
                        left: 4,
                      }}
                    >
                      Trial
                    </div>
                  )}
                </SiteTitle>
                {user && (
                  <AccountMenuToggle
                    onClick={accountToggleFunction}
                    open={accountOpen}
                  >
                    <FontAwesomeIcon icon='user' />
                    <AccountMenu open={accountOpen} scolled={scrolled}>
                      <MobileMenuItems open={accountOpen}>
                        <AccountMenuItem to='/'>Home</AccountMenuItem>
                        <AccountMenuItem to='/profile'>Profile</AccountMenuItem>
                        <AccountMenuItem
                          onClick={() => {
                            firebase
                              .auth()
                              .signOut()
                              .then(function () {
                                console.log('Signed out!');
                                setNotificationType('success');
                                setNotificationMessage(
                                  'You are now signed out.'
                                );
                                // window.location.href = '/';
                                dispatch({ type: 'logout', data: {} });
                                dispatch({ type: 'logoutSite', data: {} });
                              })
                              .catch(function (error) {
                                console.log(error);
                                setNotificationType('error');
                                setNotificationMessage(
                                  'There was an error signing you out.'
                                );
                              });
                          }}
                          to=''
                        >
                          Log Out
                        </AccountMenuItem>
                      </MobileMenuItems>
                    </AccountMenu>
                  </AccountMenuToggle>
                )}
              </Flex>
              {children}
            </div>
            {/* <MobileMenuOverlay open={open}> */}
            {/* </MobileMenuOverlay> */}
          </Wrapper>
        </>
      ) : null}
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

const Wrapper = styled.header`
  .container {
    padding-top: 36px;
    padding-bottom: 36px;
  }
  z-index: 999999999999999;
  background: ${(props) => props.theme.color.primary.backgroundDark};
  color: white !important;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const SiteTitle = styled.h1`
  margin: 0;
  margin-bottom: -1px !important;
  transition: all 0.25s ease-in;
  // letter-spacing: 5px;
  text-transform: uppercase;
  font-size: 22px;
  margin-left: -8px;
  color: white !important;
  @media (min-width: 769px) {
    font-size: 26px;
  }
  z-index: 999;
  position: relative;
  ::after {
    content: 'S';
    display: block;
    position: absolute;
    height: 100%;
    color: ${(props) => props.theme.color.primary.backgroundDark} !important;
    font-size: 31px;
    top: -2px;
    left: 16px;
    font-weight: 900 !important;
    @media (min-width: 769px) {
      font-size: 41px;
      left: 17px;
      top: -4px;
    }
    z-index: -1;

    transform: rotate(-10deg);
    font-family: Exo, Segoe UI;
  }
  svg {
    color: white !important;

    margin-right: 16px;
    position: relative;
    top: 6px;
    left: 12px;
    z-index: -1;
    font-size: 28px;
    @media (min-width: 769px) {
      font-size: 36px;
    }
  }
`;

const AccountMenu = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  height: fit-content;
  width: fit-content;
  top: 45px;
  line-height: 1;
  background: white;
  position: absolute;
  z-index: 99999999999999999;
  transition: ${(props) =>
    props.open ? 'all 0.25s ease-out' : 'all 0.6s ease-out'};
  border-radius: 5px;
  box-shadow: 2px 2px 20px -5px #00000050;
  right: 0;
  min-width: 150px;
`;

const AccountMenuItem = styled(Link)`
  text-decoration: none;
  transition-duration: 0.2s;
  color: ${(props) => props.theme.color.text.heading} !important;
  font-weight: 700;
  text-align: center;
  font-size: 16px;
  border-bottom: 1px solid #e8e8e8;
  display: block;
  padding: 16px 24px;
  border-radius: 5px;
  width: 100%;
  :last-child {
    border: none;
  }
  transition-duration: 0.2s;
  :hover {
    background: #f7f7f7;
    transition-duration: 0.2s;
  }
`;

const AccountMenuToggle = styled.div`
  z-index: 9999;
  width: 40px;
  height: 40px;
  transform: rotate(0deg);
  transition: all 0.25s ease-in;
  cursor: pointer;
  margin-left: auto;
  border-radius: 50px;
  padding: 6px;
  background: ${(props) => (props.open ? '#ffffff60' : 'transparent')};
  border: 1px solid #fff;
  :hover {
    background: ${(props) => (props.open ? '#ffffff60' : '#ffffff30')};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: white;
    font-size: 20px;
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MobileMenuItems = styled.div`
  display: block;
`;

const MobileMenuItem = styled(Link)`
  text-decoration: none;
  transition-duration: 0.2s;
  color: ${(props) => props.theme.color.text.heading} !important;
  font-weight: 700;
  text-align: center;
  font-size: 16px;
  border-bottom: 1px solid #e8e8e8;
  display: block;
  padding: 16px 0;
  width: 100%;
  :last-child {
    border: none;
  }
  transition-duration: 0.2s;
  :hover {
    background: #f7f7f7;
    transition-duration: 0.2s;
  }
`;

export default Header;
