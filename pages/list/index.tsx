import TicketList, { ITaskGridData } from '@components/shared/list';
import Filter, {
  IFilterData,
  getDateString,
} from '@components/shared/list/filter';
import MainLayout from '@components/shared/layout/mainLayout';
import { useRequest } from '@hooks/useRequest';
import { useState, useCallback } from 'react';
import { getUnixTime } from 'date-fns';

const pageSize = 6;
const from_to_diff = 7;
const baseUrl = 'http://localhost:8000' || '';

interface IFilterParams {
  pageIndex: number;
  status: string;
  from_date: string;
  to_date: string;
  sortKey: string;
  sortDir: string;
}

const Home = () => {
  const today = new Date();
  let lastWeek = new Date();
  lastWeek.setDate(today.getDate() - from_to_diff);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const getString = (selectedDate: Date) => {
    const d = new Date(selectedDate);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [month, day, year].join('/');
  };

  const getSearchData = (date1, date2, asst) => {
    fetch(
      baseUrl +
        '/data?machineLogDate_gte=' +
        getString(date1 as Date) +
        '&machineLogDate_lte=' +
        getString(date2 as Date) +
        '&machineName_like=' +
        asst,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setFilteredUsers(myJson);
      });
  };

  const onFilter = useCallback((values: IFilterData) => {
    //  alert(JSON.stringify(values.asset, null, 2));
    getSearchData(values.from_date, values.to_date, values.asset as string);
  }, []);

  return (
    <MainLayout>
      <Filter onFilter={onFilter} fromDate={lastWeek} toDate={today} />
      <TicketList gridData={filteredUsers} />
    </MainLayout>
  );
};

export default Home;
