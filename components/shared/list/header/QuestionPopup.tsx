import Popup from 'reactjs-popup';
import styles from './Popup.module.css';
import Link from 'next/link';
import Image from 'next/Image';
import React, { useEffect, useState } from 'react';
import Close from '@components/shared/assets/svg/Close.svg';
import { format } from 'date-fns';

const QuestionPopup = ({ isOpen, onClose, data }) => {
  return (
    <Popup open={isOpen} onClose={onClose}>
      <div className={styles.pop}>
        <Image
          src={Close}
          alt='close'
          className={styles.shared_pop_close}
          onClick={onClose}
        />
        <div className={styles.tab}>
          {data.machineChecklist ? (
            data.machineChecklist?.map((item, index) => {
              return (
                <table key='k1' className={styles.tab4}>
                  <tr className={styles.heading}>
                    <td colSpan='2'>
                      <p>{item.question}</p>
                    </td>
                    {item.choices?.map((k) => {
                      return item.expectedValue != k.value ? (
                        <td key='k2' className={styles.tab4_td}>
                          <p className='text-red-500'>N/A</p>
                        </td>
                      ) : (
                        <td key='k2' className={styles.tab4_td}>
                          <p className=' text-green-500'> {k.label}</p>
                        </td>
                      );
                    })}
                  </tr>
                </table>
              );
            })
          ) : (
            <div>No Data</div>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default QuestionPopup;
