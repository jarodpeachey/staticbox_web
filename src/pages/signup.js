/* eslint-disable react/jsx-fragments */
import React, { useContext } from 'react';
import { Redirect, navigate } from '@reach/router';
import AuthForm from '../components/auth/AuthForm';
import DelayedLoad from '../components/DelayedLoad';
import { DatabaseContext } from '../providers/DatabaseProvider';

// Instantiate the GoTrue auth client with an optional configuration

const SignupPage = () => {
  const { state, loadingUser } = useContext(DatabaseContext);
  const { user } = state;

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
        navigate('/', { state: { noLoad: true } })
      }
      isFunction
      fail={<AuthForm />}
    />
  );
};

export default SignupPage;
