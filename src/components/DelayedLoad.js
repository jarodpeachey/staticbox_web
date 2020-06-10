/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-fragments */
// src/pages/DelayedLoad.js
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Loader from './Loader';
import { DatabaseContext } from '../providers/DatabaseProvider';

const DelayedLoad = ({
  fullHeight,
  condition,
  loading,
  min,
  render,
  fail,
  infinite,
  isFunction,
}) => {
  const [loadState, setLoadState] = useState(
    !condition && loading ? 'load' : 'success'
  );
  const [passedMin, setPassedMin] = useState(false);
  const [globalState, setGlobalState] = useState('');

  // const callback = () => {};

  setTimeout(() => {
    setPassedMin(true);
  }, min);

  // const timeout = (function (condition) {
  //   return setTimeout(function () {
  //     if (!condition && globalState !== 'success') {
  //       setLoadState('fail');
  //     } else {
  //       setLoadState('success');
  //     }
  //   }, delay);
  // })(condition);
  // window.setTimeout(callback, delay);

  useEffect(() => {
    if (condition) {
      setLoadState('success');
      setGlobalState('success');
      isFunction && render();
      // clearTimeout(timeout);

      // return () => clearTimeout(timeout);
    } else if (!condition && !loading) {
      setLoadState('fail');
    }
  }, [condition, loading]);

  // useEffect(() => {
  //   if (state === 'success') {
  //     setGlobalState('success');
  //     clearTimeout(timeout);
  //   }
  // }, [loadState]);

  return (
    <span>
      {infinite ? (
        <Wrapper>
          <Loader color='#ffffff' size={75} text='Loading...' />
        </Wrapper>
      ) : (
        <>
          {loadState === 'load' || !passedMin ? (
            <span>
              {fullHeight ? (
                <Wrapper>
                  <Loader color='#ffffff' size={75} text='Loading...' />
                </Wrapper>
              ) : (
                <Loader size={75} text='Loading...' />
              )}
            </span>
          ) : loadState === 'success' ? (
            <span>{isFunction ? null : render}</span>
          ) : (
            <span>{fail}</span>
          )}
        </>
      )}
    </span>
  );
};

const Wrapper = styled.div`
  top: 0;
  position: absolute;
  height: 100vh !important;
  min-height: 100% !important;
  width: 100vw;
  background: ${(props) => props.theme.color.primary.backgroundDark};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999999;
`;

export default DelayedLoad;
