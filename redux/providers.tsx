'use client';

import { NextPage } from 'next';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from './store';

interface Props {
  children: ReactNode;
}

const Providers: NextPage<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
