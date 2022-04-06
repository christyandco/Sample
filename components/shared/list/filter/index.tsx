import { FC, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import PrimaryButton from '@components/shared/primaryButton';
import styles from './Filter.module.css';
import * as Yup from 'yup';
import useTranslation from 'next-translate/useTranslation';
import DatePicker, { registerLocale } from 'react-datepicker';
import en from 'date-fns/locale/en-US';
import zh from 'date-fns/locale/zh-CN';
import de from 'date-fns/locale/de';
import TextInput from 'react-autocomplete-input';

import myData from './../../../../data/db.json';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslateObject } from '@hooks/useTranslateObject';
import { check } from 'prettier';

registerLocale('en', en);
registerLocale('zh', zh);
registerLocale('de', de);

interface IFilterData {
  from_date: string;
  to_date: string;
  asset: string;
}

const Filter: FC<{
  asset: [];
  fromDate: Date;
  toDate: Date;
  onFilter: Function;
}> = ({ asset, onFilter, fromDate, toDate }) => {
  const { t, lang } = useTranslation('home');
  //const localizedCatrgoryList = useTranslateObject('common:category-list');
  const localizedStatusList = useTranslateObject('common:status-list');
  //const localizedPriorityList = useTranslateObject('common:priority-list');
  const array = [];
  const formik = useFormik<IFilterData>({
    initialValues: {
      from_date: getDateString(fromDate),
      to_date: getDateString(toDate),
      asset: '',
    },
    validationSchema: Yup.object().shape({
      from_date: Yup.date()
        .required(t('filter-from-date-required'))
        .max(new Date(), t('filter-from-date-greater')),
      to_date: Yup.date()
        .required(t('filter-to-date-required'))
        .max(new Date(), t('filter-to-date-greater'))
        .when('from_date', {
          is: (from_date: Date) => {
            return from_date;
          },
          then: Yup.date().min(
            Yup.ref('from_date'),
            t('filter-to-date-should-be-greater')
          ),
        }),
    }),
    onSubmit: (value) => {
      if (value.asset != '') {
        onFilter(value);
      }
    },
  });

  const clear = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    formik.resetForm();
    formik.submitForm();
  };

  return (
    <div className={styles.container}>
      <div className='bg-gray-100 px-5 py-5 rounded-lg border mb-5'>
        <fieldset className='flex flex:wrap gap-x-4 '>
          <legend className='font-bold text-lg'>Check List Type</legend>
          <FilterSelectItem htmlFor='ques'>
            <select
              id='ques'
              data-testid='ques'
              value={formik.values.ques}
              onChange={formik.handleChange}
              key='k'
            >
              <option placeholder='Type'></option>
              {myData.data?.map((obj) => {
                return (
                  <option key={obj.id} value={obj.id}>
                    {obj.machineChecklist.map((check) => {
                      if (check.CheckListItemID in array) {
                        return;
                      } else {
                        array.push(check.CheckListItemID);
                        return check.CheckListItemID;
                      }

                      /*array.length > 0
                        ? array.filter((a, b, c) => c.indexOf(a) === b)
                        : '';*/
                    })}
                  </option>
                );
              })}
            </select>
          </FilterSelectItem>
          <FilterSelectItem htmlFor='select'>
            <PrimaryButton
              text={t(' SELECT DEFAULT ')}
              className='bg-orange text-white'
            />
          </FilterSelectItem>
        </fieldset>
      </div>
      <form className={styles.filter} onSubmit={formik.handleSubmit}>
        <FilterSelectItem title={t('filter-from')} htmlFor='from_date'>
          <DatePicker
            locale={lang}
            data-testid='from_date'
            id='from_date'
            selected={new Date(formik.values.from_date)}
            onChange={(date) => {
              formik.setFieldValue('from_date', getDateString(date as Date));
            }}
            onSelect={(date) => {
              formik.setFieldValue('from_date', getDateString(date));
            }}
          />
          {formik.errors.from_date && formik.touched.from_date ? (
            <div data-testid='errFrom_date' className='text-xs text-red-700'>
              {formik.errors.from_date}
            </div>
          ) : null}
        </FilterSelectItem>
        <FilterSelectItem title={t('filter-to')} htmlFor='to_date'>
          <DatePicker
            locale={lang}
            id='to_date'
            data-testid='to_date'
            selected={new Date(formik.values.to_date)}
            onChange={(date) => {
              formik.setFieldValue('to_date', getDateString(date as Date));
            }}
            onSelect={(date) => {
              formik.setFieldValue('to_date', getDateString(date));
            }}
          />
          {formik.errors.to_date && formik.touched.to_date ? (
            <div data-testid='errTo_date' className='text-xs text-red-700'>
              {formik.errors.to_date}
            </div>
          ) : null}
        </FilterSelectItem>

        <FilterSelectItem key='k6' title={t('Asset')} htmlFor='asset'>
          <input
            id='asset'
            data-testid='asset'
            type='text'
            value={formik.values.asset}
            /*    autoSave={checkList.map((item, index) => {
              return item.machineName;
            })}*/
            onChange={formik.handleChange}
          />
        </FilterSelectItem>

        <div className='flex flex-row space-x-2 w-52 self-end'>
          <PrimaryButton
            text={t('common:search')}
            className='bg-orange text-white'
            type='submit'
          />
          <PrimaryButton
            text={t('common:clear')}
            className='bg-gray-400 text-black'
            onClick={clear}
          />
        </div>
      </form>
    </div>
  );
};

const FilterSelectItem: FC<{ title: string; htmlFor: string }> = ({
  title,
  htmlFor,
  children,
}) => {
  return (
    <div className={styles.filterSelect}>
      <label htmlFor={htmlFor}>{title}</label>
      {children}
    </div>
  );
};

export const getDateString = (selectedDate: Date) => {
  let date = new Date(selectedDate);
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
};

export type { IFilterData };
export default Filter;
