import MainLayout from '@components/shared/layout/mainLayout';
import useTranslation from 'next-translate/useTranslation';

export default function Custom404() {
  const { t } = useTranslation('common');
  return (
    <MainLayout>
      <div className='flex w-full items-center justify-center flex-col m-auto gap-y-8 my-10'>
        <div className='text-csa-primary text-9xl font-bold'>404</div>
        <div
          data-testid='pageNotFound'
          className='text-4xl font-bold text-center'
        >
          {t('page-not-found')}
        </div>
      </div>
    </MainLayout>
  );
}
