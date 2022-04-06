import { SWRConfig } from 'swr';
import AlertTemplate from '@components/shared/alert-template';
import axios from 'axios';
import React, { FC } from 'react';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import { AppDataProvider, IAppData } from '@context/appDataContext';

const fetcher = (url: string) => {
  return axios.get(url).then((res) => res.data);
};

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 4000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const data: IAppData = {
  language: 'en',
  clientId: '123',
  customerName: 'name',
  plantId: '123',
  plantName: 'name',
  source: 'industry-app',
};

const Wrapper: FC = ({ children }) => {
  return (
    <AppDataProvider defaultAppData={{ data: data, updateContext: jest.fn() }}>
      <SWRConfig
        value={{ fetcher, revalidateOnFocus: false, dedupingInterval: 0 }}
      >
        <AlertProvider template={AlertTemplate} {...options}>
          ){children}
        </AlertProvider>
      </SWRConfig>
    </AppDataProvider>
  );
};

export default Wrapper;
