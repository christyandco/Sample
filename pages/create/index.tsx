import MainLayout from '@components/shared/layout/mainLayout';
import Ticket, { ITicket } from '@components/shared/ticket';
import { useRequest } from '@hooks/useRequest';
import ticketService from '@services/ticketService';
import React, { useState, useContext } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { AppDataContext } from '@context/appDataContext';
import { useRouter } from 'next/router';
import Loading from '@components/shared/loading';
import { useAlert } from 'react-alert';
const Create = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('create');
  const alert = useAlert();
  const appContext = useContext(AppDataContext);
  const router = useRouter();
  const { data: applicationList } = useRequest('/config/application');
  const { data: categoryList } = useRequest('/config/category');
  const { data: priorityList } = useRequest('/config/priority');
  const { data: statusList } = useRequest('/config/status');

  const onSave = (value: ITicket) => {
    setLoading(true);
    // Save it to db calling api
    value.plantId = appContext?.data.plantId;
    value.plantName = appContext?.data.plantName;
    ticketService
      .createTicket(value)
      .then((result: ITicket) => {
        alert.success(
          t('ticket-created', {
            ticketId: result.ticketId as string,
          })
        );
        setLoading(false);
        router.push(`/edit/${result.ticketId}?key=view`);
      })
      .catch((err: any) => {
        alert.error(t('common:an-error-occurred'));
        setLoading(false);
      });
  };

  return (
    <MainLayout>
      {loading ? <Loading /> : null}
      <Ticket
        onSave={onSave}
        type='create'
        statusList={statusList?.status ? [statusList.status[0]] : []}
        priorityList={priorityList?.priority}
        categoryList={categoryList?.category}
        applicationList={applicationList?.application}
      />
    </MainLayout>
  );
};

export default Create;
