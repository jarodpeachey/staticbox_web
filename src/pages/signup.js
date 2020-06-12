/* eslint-disable react/jsx-fragments */
import React, { useContext } from 'react';
import { Redirect, navigate } from '@reach/router';
import AuthForm from '../components/auth/AuthForm';
import DelayedLoad from '../components/DelayedLoad';
import { DatabaseContext } from '../providers/DatabaseProvider';
import { setCookie } from '../utils/cookies';

// Instantiate the GoTrue auth client with an optional configuration

const SignupPage = ({ location }) => {
  const { state, loadingUser } = useContext(DatabaseContext);
  const { user } = state;

  console.log(user);

  return (
    // <div id='blur'>
    //   <AuthForm />
    // </div>
    <DelayedLoad
      fullHeight
      condition={user}
      loading={loadingUser}
      delay={1000}
      max={10000}
      render={
        // <>
        //   <Redirect from='/signup' to='/?noload' />
        // </>
        () => {
          console.log('Navigating.');
          navigate('/', { state: { noLoad: true } });
        }
      }
      isFunction
      fail={<AuthForm />}
    />
  );
};

export default SignupPage;
