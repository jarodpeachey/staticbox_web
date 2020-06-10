import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Button from '../Button';
import { isBrowser } from '../../utils/isBrowser';
import { AppContext } from '../../providers/AppProvider';

const Menu = ({ scrolled }) => {
  const { setNotificationMessage, setNotificationType } = useContext(
    AppContext
  );

  const loggedIn = false;

  return (
    <MenuWrapper scrolled={scrolled}>
      {/* <MenuItem scrolled={scrolled}>
        <Link to='/'>Home</Link>
      </MenuItem> */}
      {loggedIn ? (
        <>
          <MenuItem>
            <a href='https://app.staticbox.io'>Dashboard</a>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem>
            <Link to='/'>Home</Link>
          </MenuItem>
          <MenuItem button>
            <Button
              link='https://app.staticbox.io/signup'
              external
              size='small'
              variant='outlined'
              className='mr-3'
            >
              Sign Up
            </Button>
          </MenuItem>
          <MenuItem button>
            <Button
              link='https://app.staticbox.io/login'
              external
              color='primary'
              size='small'
            >
              Log In
            </Button>
          </MenuItem>
        </>
      )}
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  @media (min-width: 769px) {
    display: flex;
  }
  margin-left: auto;
  display: none;
  align-items: center;
  height: 100%;
  transition-duration: 0.25s;
`;

const MenuItem = styled.div`
  height: 100%;
  transition-duration: 0.25s;
  a {
    height: 100%;
    text-decoration: none;
    display: block;
    padding: ${(props) => (props.button ? '0' : '8px 24px')};
    font-weight: 500;
    transition-duration: 0.25s;
    color: ${(props) =>
      props.light ? 'white' : props.theme.color.text.heading};
  }
  :hover a {
    transition-duration: 0.25s;
    color: ${(props) =>
      props.button
        ? ''
        : props.scrolled
        ? 'rgba(81, 160, 249, 1)'
        : 'rgba(81, 160, 249, 1)'} !important;
  }
`;

export default Menu;
