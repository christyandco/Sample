import { FC, useState } from 'react';
import PrimaryButton from '../primaryButton';
import useTranslation from 'next-translate/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import Editor from '@components/shared/ckeditor5';

interface IComment {
  id?: string;
  ticketId: string;
  createdBy: string;
  createdDate: Date;
  comment: string;
}

const Comment: FC<{
  type: 'add' | 'view';
  ticketId: string;
  comments?: IComment[];
  addComment?: Function;
  onEditClick?: Function;
  onCancel: Function;
}> = ({ type, ticketId, comments, addComment, onEditClick, onCancel }) => {
  const [comment, setComment] = useState('');
  const { t } = useTranslation('create');

  const clean = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setComment('');
    onCancel();
  };

  const onCommentChange = (value: string) => {
    setComment(value);
  };

  const saveComment = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (addComment && comment.trim() !== '') {
      const commentData = { ticketId, comment: comment.trim() };
      addComment(commentData);
      setComment('');
    }
  };

  return (
    <div className='mt-4'>
      <div className='flex flex-row items-center justify-between'>
        <label htmlFor='description'>{t('common:comments')}</label>
        {type == 'view' ? (
          <button
            data-testid='btnEdit'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onEditClick) {
                onEditClick(e);
              }
            }}
          >
            <FontAwesomeIcon
              icon={faEdit}
              className='cursor-pointer text-csa-primary'
            />
          </button>
        ) : null}
      </div>

      {!(comments && comments.length) && (
        <div data-testid='noComment' className='text-xs mt-4'>
          {t('common:no-comments')}
        </div>
      )}
      <div
        id='comments'
        className='border-t-2 border-solid border-gray-400 pl-5 pt-3 mt-1'
      >
        {type == 'add' ? (
          <div id='addComment' data-testid='addComment'>
            <Editor
              data-testid='editor'
              id='comment'
              value={comment}
              onChange={onCommentChange}
            />
            <div className='w-full md:w-80 flex flex-row justify-center md:justify-items-start items-center my-5'>
              <PrimaryButton
                data-testid='btnAdd'
                text={t('common:add-comment')}
                className='h-8 text-xs text-white bg-csa-primary'
                onClick={saveComment}
              />
              <PrimaryButton
                data-testid='btnCancel'
                text={t('common:cancel')}
                className='h-8 text-xs text-black bg-gray-400 ml-5'
                onClick={clean}
              />
            </div>
          </div>
        ) : null}

        {comments?.map((item: IComment, index: number) => {
          return (
            <div
              id='comment'
              key={`${index}_comment`}
              className='flex flex-col w-full justify-items-start text-xs md:text-sm mb-5'
            >
              <p className='text-csa-primary'>
                {item.createdBy}&nbsp;
                <span className='text-black'>
                  {new Intl.DateTimeFormat('default', {
                    dateStyle: 'medium',
                    //timeStyle: 'medium',
                  }).format(new Date(item?.createdDate))}
                </span>
              </p>
              <div data-testid='comment'>
                <ReactMarkdown>{item.comment}</ReactMarkdown>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export type { IComment };

export default Comment;
