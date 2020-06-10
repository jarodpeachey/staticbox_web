import React from 'react';
import { StylesProvider } from './src/providers/StylesProvider';
import Layout from './src/components/layout/Layout';
// import { DatabaseProvider } from './src/providers/DatabaseProvider';
import { AppProvider } from './src/providers/AppProvider';

export const wrapRootElement = ({ element }) => {
  console.log(element);
  // const [state, dispatch] = React.useReducer(DatabaseReducer, { user: null });

  return (
    <AppProvider>
      <StylesProvider>{element}</StylesProvider>
    </AppProvider>
  );
};

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};
