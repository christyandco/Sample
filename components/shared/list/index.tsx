/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import styles from './TicketList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Pagination from '@components/shared/pagination';
import Header from './header';
import useTranslation from 'next-translate/useTranslation';
import Loading from '@components/shared/loading';
import { useTranslateObject } from '@hooks/useTranslateObject';
import PrimaryButton from '@components/shared/primaryButton';
import Popup from 'reactjs-popup';
import QuestionPopup from './header/QuestionPopup';
import Update from './header/Update';
import myData from './../../../data/db.json';
import dataServices from '@services/dataServices';

interface ITaskGridData {
  date: string;
  user: string;
  asset: string;
  last: string;
  current: string;
  checklist: string;
  confirm: string;
}

const TicketList: FC<{
  gridData: [];
  onPaginatePrev: Function;
  onPaginateNext: Function;
  onSortClick: Function;
  showLeft?: boolean;
  showRight?: boolean;
  pageIndex: number;
}> = ({
  gridData,
  min,
  prehour,
  dated,
  myJson,
  res,
  showLeft,
  showRight,
  onPaginatePrev,
  onPaginateNext,
  pageIndex,
  onSortClick,
  onKeyPressHandler,
  onClickHandler,
}) => {
  const { t } = useTranslation('home');
  const [curCol, setCurCol] = useState('');
  const [gridPopupData, setgridPopupData] = useState('');
  const [popVisible, setPopVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [updatedValue, setUpdateValue] = useState({
    machineLogStatus: '',
  });
  const onSortItemClick = (col: string, direction: string) => {
    onSortClick(col, direction);
    setCurCol(col);
  };

  const getDataItem = (item) => {
    setgridPopupData(item);
  };

  const ChangeStatus = (data1) => {
    //alert(JSON.stringify(data1, null, 2));
    // const [isEditing, setIsEditing] = useState(false);

    return (
      <>
        /{' '}
        {myData.data.length > 0
          ? myData.data.map((change, index) => {
              return change.machineLogId === data1
                ? setUpdateValue((change) => ({
                    ...change,
                    machineLogStatus: 'Approved',
                  }))
                : '';
            })
          : ''}
      </>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div id='header' className={styles.header}>
          <Header
            title={t('Date')}
            width='w-44'
            col='date'
            curCol={curCol}
            onClick={onSortItemClick}
          />
          <Header
            title={t('User')}
            width='w-44'
            col='user'
            curCol={curCol}
            onClick={onSortItemClick}
          />
          <Header
            title={t('Asset Code')}
            width='w-44'
            col='asset'
            curCol={curCol}
            onClick={onSortItemClick}
          />
          <Header
            title={t('Last Recording')}
            width='w-44'
            col='last'
            curCol={curCol}
            onClick={onSortItemClick}
          />
          <Header
            title={t('Current Recording')}
            width='w-44'
            col='current'
            curCol={curCol}
            onClick={onSortItemClick}
          />
          <Header
            title={t('Checklist')}
            width='w-44'
            col='checklist'
            curCol={curCol}
            onClick={onSortItemClick}
          />
          <Header
            title={t('Confirm')}
            width='w-44'
            col='confirm'
            curCol={curCol}
            onClick={onSortItemClick}
          />
        </div>

        {gridData.length > 0 ? (
          gridData?.map((item, index) => {
            return (
              <div
                data-testid='dataContainer'
                key={`issue_${index}`}
                id='data_id'
                className={styles.row}
                onClick={() => getDataItem(item)}
                onKeyPress={onKeyPressHandler}
                role='button'
                tabIndex='0'
              >
                <div className={styles.item_w44}>{item.machineLogDate}</div>

                <div className={styles.item_w44}>
                  {item.machineOperatorName}
                </div>
                <div className={styles.item_w44}>{item.machineLogId}</div>

                <div className={styles.item_w44}>
                  {gridData.length > 0 ? (
                    gridData?.map((item1, index) => {
                      if (
                        min === null ||
                        item.machineLogDate < item1.machineLogDate
                      ) {
                        min = item.machineLogDate;
                        prehour = item.machineHours;
                      } else if (
                        min === null ||
                        item.machineLogDate == item1.machineLogDate
                      ) {
                        if (
                          prehour === null ||
                          item.machineHours <= item1.machineHours
                        ) {
                          prehour = item1.machineHours;
                        } else {
                          prehour = item.machineHours;
                        }
                      } else {
                        prehour = item1.machineHours;
                      }
                    })
                  ) : (
                    <div className={styles.item_display}></div>
                  )}
                  {prehour}
                </div>
                <div className={styles.item_w44}>{item.machineHours} </div>
                <div className={styles.item_w44}>
                  <button onClick={() => setPopVisible(true)}>Link</button>
                </div>
                <QuestionPopup
                  isOpen={popVisible}
                  onClose={() => setPopVisible(false)}
                  data={gridPopupData}
                />

                {item.machineLogStatus === 'Approved' ? (
                  <div className={styles.item_display} key='change'>
                    <PrimaryButton
                      text={t('CONFIRM')}
                      id='id1'
                      className={styles.confirm1}
                    />
                  </div>
                ) : (
                  <div key='check' className={styles.item_w44}>
                    <PrimaryButton
                      text={t('CONFIRM')}
                      className={styles.confirm}
                      onClick={() =>
                        /*ChangeStatus(item.machineLogId)*/
                        dataServices
                          .updateConfirm(item.machineLogId)
                          .then((result: any) => {})
                          .catch((err: any) => {
                            alert('an-error-occurred' + err);
                          })
                      }
                    />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <NoData />
        )}
      </div>

      {pageIndex == 0 && gridData?.length == 0 ? null : (
        <Pagination
          onPaginatePrev={onPaginatePrev}
          onPaginateNext={onPaginateNext}
          showLeft={showLeft}
          showRight={showRight}
        />
      )}
    </>
  );
};

const NoData = () => {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    let timeoutPointer = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 2000);

    return () => {
      clearTimeout(timeoutPointer);
      setIsMounted(false);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          data-testid='nodata'
          className='h-48 justify-center items-center font-bold text-lg text-csa-primary flex '
        >
          {t('no-data')}
        </div>
      )}
    </>
  );
};
export default TicketList;
export type { ITaskGridData };
