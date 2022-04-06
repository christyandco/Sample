import MainLayout from '@components/shared/layout/mainLayout';
import Ticket, { ITicket } from '@components/shared/ticket';
import { IComment } from '@components/shared/comment';
import { useRequest } from '@hooks/useRequest';
import ticketService from '@services/ticketService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useDynamicRequest } from '@hooks/useDynamicRequest';
import Loading from '@components/shared/loading';
import { useAlert } from 'react-alert';

const Edit = () => {
  const router = useRouter();
  const { id, key } = router.query;
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(true);
  const { t } = useTranslation('create');

  const alert = useAlert();

  const { data: applicationList } = useRequest('/config/application');
  const { data: categoryList } = useRequest('/config/category');
  const { data: priorityList } = useRequest('/config/priority');
  const {
    data: ticketData,
    error: ticketError,
    mutate: reloadTicket,
  } = useRequest(`/tickets/${id}`);
  const { data: statusList } = useDynamicRequest(
    ticketData ? `/config/status/${ticketData?.status}` : null
  );

  const { data: commentData, mutate: reloadComments } = useRequest(
    `/tickets/${id}/comments`
  );

  // Used to set the source of navigation to page
  useEffect(() => {
    if (key == 'view') {
      setEditable(false);
    }
  }, [key]);

  const addComment = (value: IComment) => {
    // Save it to db calling api
    //reloadComments([...commentData, value], false);
    setLoading(true);
    ticketService
      .addComment(value)
      .then((result) => {
        setLoading(false);
        reloadComments();
        alert.success(t('comment-created'));
      })
      .catch((err) => {
        setLoading(false);
        alert.error(t('common:an-error-occurred'));
      });
  };

  const relaod = (e: any) => {
    setLoading(true);
    e.stopPropagation();
    e.preventDefault();
    reloadTicket();
  };

  const onEdit = (value: ITicket) => {
    // Save it to db calling api
    reloadTicket({ ...value }, false);
    setLoading(true);
    ticketService
      .editTicket(value)
      .then((result: any) => {
        reloadTicket();
        alert.success(
          t('create:ticket-edited', {
            ticketId: value?.ticketId as string,
          })
        );
        setLoading(false);
      })
      .catch((err: any) => {
        alert.error(t('common:an-error-occurred'));
        setLoading(false);
      });
  };

  return (
    <MainLayout>
      {ticketData || ticketError || !loading ? null : <Loading />}
      <Ticket
        comments={commentData}
        current={ticketData}
        onCancel={relaod}
        onSave={onEdit}
        addComment={addComment}
        type='edit'
        issueEdit={editable}
        statusList={
          statusList && typeof statusList[Symbol.iterator] === 'function'
            ? ([ticketData?.status, ...statusList] as any)
            : ([ticketData?.status] as any)
        }
        priorityList={priorityList?.priority}
        categoryList={categoryList?.category}
        applicationList={applicationList?.application}
      />
    </MainLayout>
  );
};

export default Edit;
