import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { AppDataProvider, IAppData } from 'context/appDataContext';
import { useState, useCallback, useEffect } from 'react';
import { SWRConfig } from 'swr';
import axios from 'axios';
import setLanguage from 'next-translate/setLanguage';
import httpRequestService from '@services/httpRequestService';
import tokenService from '@services/tokenService';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from '@components/shared/alert-template';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 4000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function MyApp({ Component, pageProps }: AppProps) {
  //const router = useRouter();
  //load theme from cookie

  const userContext = tokenService.getUserContext();
  httpRequestService.initializeRequestInterceptor();
  httpRequestService.initializeResponseInterceptor();

  const parentApp =
    userContext.parentApp == 'customer' ? 'industry-app' : 'vendor-app';
  const initAppData: IAppData = {
    language: userContext.language,
    clientId: userContext.id,
    customerName: userContext.name,
    plantId: userContext.plantId,
    plantName: userContext.plantName,
    source: parentApp,
  };

  const [appData, setAppData] = useState<IAppData>(initAppData);
  const updateAppData = (data: IAppData) => {
    setAppData(data);
  };

  //Change language
  useEffect(() => {
    setLanguage(initAppData.language);
  }, [initAppData.language]);

  return (
    <AppDataProvider
      defaultAppData={{
        data: appData,
        updateContext: useCallback(updateAppData, []),
      }}
    >
      <ThemeProvider defaultTheme={parentApp}>
        <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
          <AlertProvider template={AlertTemplate} {...options}>
            <Component {...pageProps} />
          </AlertProvider>
        </SWRConfig>
      </ThemeProvider>
    </AppDataProvider>
  );
}

export default MyApp;
