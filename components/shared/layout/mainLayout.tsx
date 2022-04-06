import { FC } from 'react';
import Tab, { ITabItems } from '../tab';
import styles from './MainLayout.module.css';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';

const MainLayout: FC = ({ children }) => {
  const { t } = useTranslation('common');

  const tabItems: ITabItems[] = [
    {
      name: t('  TPM Check list'),
      shortName: t(' TPM Check list'),
      selected: false,
      keywords: ['/list'],
      link: '/list',
    },
  ];

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <div className='min-h-screen'>
        <Tab data-testid='tab' items={tabItems} />
        <div id='content' className={styles.container}>
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
