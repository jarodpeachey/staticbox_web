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

  const urlParams = new URLSearchParams(location.search);

  if (urlParams.get('plan')) {
    setCookie('selectedPlan', urlParams.get('plan'));
  }

  console.log(urlParams.get('plan'));

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
