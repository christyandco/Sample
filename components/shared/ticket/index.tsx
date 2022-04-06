import React, { FC, useRef, useEffect, useState } from 'react';
import styles from './Ticket.module.css';
import PrimaryButton from '@components/shared/primaryButton';
import Comment, { IComment } from '@components/shared/comment';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Attachment from '@components/shared/attachment';
import DropZone from '../dropzone';
import useTranslation from 'next-translate/useTranslation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { AlertManager, useAlert } from 'react-alert';
import { useTranslateObject } from '@hooks/useTranslateObject';
import ReactMarkdown from 'react-markdown';
import Editor from '@components/shared/ckeditor5';
import { Translate } from 'next-translate';

interface ITicket {
  idReadable?: string;
  ticketId?: string;
  createdDate?: Date;
  createdByUser?: string;
  appCode: string;
  applicationName?: string;
  plantId?: string;
  plantName?: string;
  category: string;
  priority: string;
  status: string;
  summary: string;
  description: string;
  files: [];
}

interface ILocalizedMapData {
  localizedCatrgoryList: Map<any, any>;
  localizedPriorityList: Map<any, any>;
  localizedStatusList: Map<any, any>;
}

interface IListData {
  applicationList: any[];
  statusList: string[];
  categoryList: string[];
  priorityList: string[];
}

const renderEditIssueButton = (
  type: string,
  editIssue: boolean,
  setEditIssue: Function
) => {
  let btnEditIssue = null;
  if (type == 'edit' && !editIssue) {
    btnEditIssue = (
      <button
        data-testid='btnEditIssue'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setEditIssue(true);
        }}
      >
        <FontAwesomeIcon icon={faEdit} className='text-csa-primary' />
      </button>
    );
  }
  return btnEditIssue;
};

const renderTicketIdOnEdit = (type: string, ticketId: any) => {
  let ticketIdComponent = null;
  if (type !== 'create') {
    ticketIdComponent = (
      <div
        data-testid='ticketId'
        className={`border-solid border-2 px-1 flex-grow-0 mr-2 h-10 font-bold whitespace-nowrap flex items-center justify-center text-green-700`}
      >
        {ticketId}
      </div>
    );
  }
  return ticketIdComponent;
};

const renderEditor = (
  type: string,
  editIssue: any,
  value: any,
  setValue: Function
) => {
  let toggledView = (
    <Editor
      id='description'
      value={value}
      onChange={(modifiedValue: string) => setValue(modifiedValue)}
    />
  );
  if (type == 'edit' && !editIssue) {
    toggledView = (
      <div className='p-2 flex-grow border-2'>
        <ReactMarkdown>{value}</ReactMarkdown>
      </div>
    );
  }
  return toggledView;
};

const renderComments = (
  type: string,
  editIssue: boolean,
  setValue: Function,
  comments?: IComment[],
  current?: ITicket,
  addComment?: Function
) => {
  let comment = null;
  if (type === 'edit') {
    comment = (
      <div
        className={`w-full mt-3 md:w-3/4  ${
          editIssue ? 'bg-gray-100 p-4 rounded-lg' : ''
        }`}
      >
        <Comment
          comments={comments}
          type={!editIssue ? 'add' : 'view'}
          addComment={addComment}
          ticketId={current?.ticketId || ''}
          onEditClick={() => {
            setValue(false);
          }}
          onCancel={() => {
            setValue(true);
          }}
        />
      </div>
    );
  }
  return comment;
};

const renderAddAttachment = (
  type: string,
  editIssue: boolean,
  formik: any,
  alert: AlertManager,
  attachRef: React.RefObject<HTMLInputElement>,
  t: Translate
) => {
  let attachmentSection = null;
  if (type === 'create' || editIssue) {
    attachmentSection = (
      <div className='flex flex-wrap mb-4'>
        <div className={`${styles.drop}`}>
          <DropZone
            onDrop={(files, event) => {
              onFileSelect(files, formik, alert, event);
            }}
          >
            <button
              className='flex flex-col justify-center items-center cursor-pointer w-full h-full'
              disabled={type == 'edit' && !editIssue}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                attachRef?.current?.click();
              }}
            >
              <div className='flex flex-row justify-around w-28'>
                <FontAwesomeIcon
                  icon={faPaperclip}
                  className='text-csa-primary'
                />
                <label className='text-xs'>{t('drop-files-here')}</label>
              </div>
              <label className='text-xs'>{t('common:or')}</label>
              <label className='text-xs'>{t('click-attach')}</label>
            </button>

            <input
              data-testid='upload'
              type='file'
              accept={process.env.NEXT_PUBLIC_FILE_EXTENSION}
              id='files'
              name='files'
              multiple
              ref={attachRef}
              style={{ display: 'none' }}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFileSelect(e.target.files, formik, alert, e);
              }}
            />
          </DropZone>
        </div>
        {formik.errors.files && (
          <div className='text-xs text-red-700'>{formik.errors.files}</div>
        )}
      </div>
    );
  }
  return attachmentSection;
};

const renderRightSection = (
  type: string,
  editIssue: boolean,
  formik: any,
  t: Translate,
  listData: IListData,
  localizedMapData: ILocalizedMapData
) => {
  return (
    <div className='w-full md:w-1/4 md:pl-4'>
      <div className='bg-gray-200 p-2 rounded-md flex flex-col border-2'>
        <Dropdown
          disabled={type !== 'create'}
          viewOnly={type === 'edit' && !editIssue}
          value={formik.values.appCode}
          valueText={formik.values.applicationName}
          error={formik.errors.appCode}
          touched={formik.touched.appCode}
          title={t('common:application')}
          handleChange={(value: string) => {
            formik.setFieldValue('appCode', value);
          }}
        >
          <option value=''>{t('select-application')}</option>
          {listData.applicationList?.map(
            (item: { appCode: string; applicationName: string }, index) => {
              return (
                <option key={item.appCode} value={item.appCode}>
                  {item.applicationName}
                </option>
              );
            }
          )}
        </Dropdown>

        <Dropdown
          disabled={type !== 'create'}
          viewOnly={type === 'edit' && !editIssue}
          value={formik.values.category}
          valueText={localizedMapData.localizedCatrgoryList?.get(
            formik.values.category
          )}
          error={formik.errors.category}
          touched={formik.touched.category}
          title={t('common:category')}
          handleChange={(value: string) => {
            formik.setFieldValue('category', value);
          }}
        >
          <option value=''>{t('select-category')}</option>
          {listData.categoryList?.map((item: string, index) => {
            return (
              <option key={`${index}_category`} value={item}>
                {localizedMapData.localizedCatrgoryList?.get(item)}
              </option>
            );
          })}
        </Dropdown>

        <Dropdown
          disabled={false}
          viewOnly={type === 'edit' && !editIssue}
          value={formik.values.priority}
          valueText={localizedMapData.localizedPriorityList?.get(
            formik.values.priority
          )}
          error={formik.errors.priority}
          touched={formik.touched.priority}
          title={t('common:priority')}
          handleChange={(value: string) => {
            formik.setFieldValue('priority', value);
          }}
        >
          <option value=''>{t('select-priority')}</option>
          {listData.priorityList?.map((item: string, index) => {
            return (
              <option key={`${index}_priority`} value={item}>
                {localizedMapData.localizedPriorityList?.get(item)}
              </option>
            );
          })}
        </Dropdown>

        <Dropdown
          data-testid='drpStatus'
          disabled={false}
          viewOnly={type === 'edit' && !editIssue}
          value={formik.values.status}
          valueText={localizedMapData.localizedStatusList?.get(
            formik.values.status
          )}
          error={formik.errors.status}
          touched={formik.touched.status}
          title={t('common:status')}
          handleChange={(value: string) => {
            formik.setFieldValue('status', value);
          }}
        >
          {type !== 'create' ? (
            <option value=''>{t('select-status')}</option>
          ) : null}
          {listData.statusList?.map((item: string, index) => {
            return (
              <option key={`${index}status`} value={item}>
                {localizedMapData.localizedStatusList?.get(item)}
              </option>
            );
          })}
        </Dropdown>
      </div>
    </div>
  );
};

const onFileSelect = (
  selectedFiles: FileList | null,
  formik: any,
  alert: AlertManager,
  e: any
) => {
  e.preventDefault();
  e.stopPropagation();
  if (selectedFiles) {
    const length = selectedFiles.length || 0;
    let files = [];
    let size = formik.values.files.reduce((accumalator: number, item: any) => {
      return accumalator + item.size / (1024 * 1024);
    }, 0);

    for (let i = 0; i < length; i++) {
      if (
        process.env.NEXT_PUBLIC_FILE_EXTENSION?.indexOf(
          selectedFiles[i].name.split('.').pop() || ''
        ) !== -1
      ) {
        files.push(selectedFiles[i]);
        size += selectedFiles[i].size / (1024 * 1024);
      }
    }

    if (size <= Number(process.env.NEXT_PUBLIC_FILE_SIZE)) {
      formik.setFieldValue('files', [...formik.values.files, ...files]);
    } else {
      const filesErrorMessage = `Total filesize cannot exceed ${process.env.NEXT_PUBLIC_FILE_SIZE} Mb.`;
      formik.setFieldError('files', filesErrorMessage);
      alert.error(filesErrorMessage);
    }
  }
};

const clear = (formik: any, e: any, onCancel?: Function) => {
  if (onCancel) {
    onCancel(e);
  } else {
    formik.resetForm();
  }
};

const Ticket: FC<{
  type: 'edit' | 'create';
  issueEdit?: boolean;
  statusList: string[];
  applicationList: any[];
  priorityList: string[];
  categoryList: string[];
  current?: ITicket;
  comments?: [];
  addComment?: Function;
  onSave: Function;
  onCancel?: Function;
}> = ({
  type,
  statusList,
  issueEdit = false,
  applicationList,
  priorityList,
  categoryList,
  current,
  comments,
  addComment,
  onSave,
  onCancel,
}) => {
  const attachRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState([]);
  const [editIssue, setEditIssue] = useState(false);

  const { t } = useTranslation('create');
  const localizedCatrgoryList = useTranslateObject('common:category-list');
  const localizedStatusList = useTranslateObject('common:status-list');
  const localizedPriorityList = useTranslateObject('common:priority-list');

  const alert = useAlert();
  const formik = useFormik<ITicket>({
    initialValues: {
      ticketId: '',
      appCode: '',
      //applicationName: '',
      createdByUser: '',
      category: '',
      priority: '',
      status: '',
      summary: '',
      description: '',
      files: [],
    },
    validationSchema: Yup.object().shape({
      appCode: Yup.string().required(t('please-select-application')),
      category: Yup.string().required(t('please-select-category')),
      status: Yup.string().required(t('please-select-status')),
      priority: Yup.string().required(t('please-select-priority')),
      summary: Yup.string().required(t('please-select-summary')),
    }),
    onSubmit: (value) => {
      onSave(value);
    },
  });

  useEffect(() => {
    if (current) {
      setAttachments(current.files);
      // Used resetForm  instead of setValues to makesure that dirty flag is reset.
      formik.resetForm({ values: { ...current, files: [] } });
    }
  }, [current]);

  useEffect(() => {
    if (!current) {
      let status = statusList?.length == 1 ? statusList[0] : '';
      formik.setValues({ ...formik.values, ...{ status: status } });
    }
  }, [statusList]);

  useEffect(() => {
    setEditIssue(issueEdit);
  }, [issueEdit]);

  return (
    <>
      <div
        data-testid='formWrapper'
        // className={`${
        //   type === 'edit' && !editIssue ? 'bg-gray-100 p-2 rounded-lg' : ''
        // }`}
      >
        <form id='container' onSubmit={formik.handleSubmit}>
          {/*Summary normal + Edit Icon*/}
          <div className='w-full md:w-3/4 flex flex-row items-center justify-end md:justify-between'>
            <label
              className={`${styles.required} hidden md:block font-bold`}
              htmlFor='summary'
            >
              {t('common:summary')}
            </label>
            {renderEditIssueButton(type, editIssue, setEditIssue)}
          </div>

          <div className='w-full flex flex-col-reverse md:flex-row flex-grow flex-wrap editor'>
            {/*Left Section*/}
            <div className='flex flex-col w-full md:w-3/4'>
              <div className='mb-2'>
                <div className='flex flex-row'>
                  {renderTicketIdOnEdit(type, current?.ticketId)}
                  <input
                    data-testid='summary'
                    id='summary'
                    disabled={type == 'edit'}
                    className={`${styles.border} h-10`}
                    value={formik.values.summary}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.errors.summary && formik.touched.summary ? (
                  <div
                    data-testid='errSummary'
                    className='text-xs text-red-700'
                  >
                    {formik.errors.summary}
                  </div>
                ) : null}
              </div>
              {renderEditor(
                type,
                editIssue,
                formik.values.description || '',
                (value: string) => formik.setFieldValue('description', value)
              )}
            </div>

            {/*Summary mobile*/}
            <label
              className={`${styles.required} md:hidden md:mt-0 mt-5 font-bold`}
              htmlFor='summary'
            >
              {t('common:summary')}
            </label>
            {/*Right Section*/}
            {renderRightSection(
              type,
              editIssue,
              formik,
              t,
              {
                applicationList: applicationList,
                statusList: statusList,
                categoryList: categoryList,
                priorityList: priorityList,
              },
              {
                localizedCatrgoryList: localizedCatrgoryList,
                localizedPriorityList: localizedPriorityList,
                localizedStatusList: localizedStatusList,
              }
            )}
          </div>

          {/*Bottom Section*/}
          <div className='flex flex-wrap items-end gap-1'>
            <div className='flex flex-col  w-full md:w-80'>
              <label className='my-4' htmlFor='attachment'>
                {t('common:attachments')}
              </label>
              {renderAddAttachment(
                type,
                editIssue,
                formik,
                alert,
                attachRef,
                t
              )}
            </div>
            <div
              id='attachments'
              className='flex flex-wrap gap-1 mb-4 items-center justify-start'
            >
              {formik.values?.files?.map((file: any, index) => {
                return (
                  <Attachment
                    key={`${index}_attachment`}
                    name={file.name}
                    index={index}
                    path={file.url}
                    onDelete={() => {
                      formik.values.files.splice(index, 1);
                      formik.setFieldValue('files', formik.values.files);
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className='flex flex-col'>
            {attachments?.length > 0 ? (
              <>
                {/* <label className='text-xs font-bold'>Existing Attachments</label> */}
                <div
                  id='existing_attachments'
                  className='flex flex-wrap gap-1 items-center justify-start'
                >
                  {/*TO DO*/}
                  {attachments?.map((file: any, index) => {
                    return (
                      <Attachment
                        existing={true}
                        key={`${index}_attachment`}
                        name={file.name}
                        path={file.url}
                        //thumbnailUrl={file.thumbnailURL}
                        index={index}
                      />
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
          <div
            className={`${
              type === 'edit' && !editIssue ? 'hidden' : 'flex'
            } w-full md:w-80  flex-row justify-center md:justify-items-start items-center mt-5 `}
          >
            <PrimaryButton
              text={type == 'create' ? t('common:create') : t('common:update')}
              className={`h-8 text-xs text-white bg-csa-primary }`}
            />
            <PrimaryButton
              text={t('common:cancel')}
              className='h-8 text-xs text-black bg-gray-400 ml-5'
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                setEditIssue(false);
                clear(formik, e, onCancel);
              }}
            />
          </div>
        </form>
      </div>

      {/*Comment Section*/}
      {renderComments(
        type,
        editIssue,
        (value: boolean) => {
          setEditIssue(value);
        },
        comments,
        current,
        addComment
      )}
    </>
  );
};

const Dropdown: FC<{
  title: string;
  value: string;
  valueText?: string;
  handleChange: Function;
  disabled: boolean;
  viewOnly: boolean;
  error: string | undefined;
  touched: boolean | undefined;
}> = ({
  title,
  value,
  valueText,
  handleChange,
  disabled,
  viewOnly,
  children,
  error,
  touched,
}) => {
  return (
    <div className='flex flex-col'>
      {viewOnly ? (
        <label className='font-bold'>{title}</label>
      ) : (
        <label className={`${styles.required} font-bold`}>{title}</label>
      )}

      <div className='mb-3'>
        {viewOnly ? (
          <div className={`${styles.border} bg-gray-100 text-sm`}>
            {valueText}
          </div>
        ) : (
          <div className='select'>
            <select
              data-testid='drpFilters'
              className={`${styles.border}`}
              value={value}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              disabled={disabled}
            >
              {children}
            </select>
          </div>
        )}
      </div>
      {error && touched ? (
        <div data-testid='errDropdown' className='text-xs text-red-700'>
          {error}
        </div>
      ) : null}
    </div>
  );
};

export type { ITicket };
export default Ticket;
