import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  queryByAttribute,
} from '@testing-library/react';
import Filter from '@components/shared/list/filter';

const getById = queryByAttribute.bind(null, 'id');
describe('Filter', () => {
  it('Should render Filter section', () => {
    const today = new Date();
    let lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const onFilter = jest.fn();
    render(
      <Filter
        categoryList={category as []}
        statusList={status as []}
        priorityList={priority as []}
        fromDate={lastWeek}
        toDate={today}
        onFilter={onFilter}
      />
    );

    const statusComponent = screen.getByTestId('status');
    expect(statusComponent).toBeInTheDocument();

    const priorityComponent = screen.getByTestId('priority');
    expect(priorityComponent).toBeInTheDocument();

    const categoryComponent = screen.getByTestId('category');
    expect(categoryComponent).toBeInTheDocument();
  });

  it('Should render Filter section and enable the click', async () => {
    const today = new Date('2021-09-14'); //YYYY-MM-DD
    let lastWeek = new Date('2021-09-14');
    lastWeek.setDate(today.getDate() - 7);

    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const onFilterMethod = jest.fn();
    render(
      <Filter
        categoryList={category as []}
        statusList={status as []}
        priorityList={priority as []}
        fromDate={lastWeek}
        toDate={today}
        onFilter={onFilterMethod}
      />
    );

    const statusComponent = screen.getByTestId('status');
    await waitFor(() => {
      fireEvent.change(statusComponent, { target: { value: 'stat1' } });
    });

    const priorityComponent = screen.getByTestId('priority');
    await waitFor(() => {
      fireEvent.change(priorityComponent, { target: { value: 'priority1' } });
    });

    const categoryComponent = screen.getByTestId('category');
    await waitFor(() => {
      fireEvent.change(categoryComponent, { target: { value: 'cat1' } });
    });

    const btnSearch = screen.getByText('common:search');
    await waitFor(() => {
      fireEvent.click(btnSearch, {});
    });

    await waitFor(() => {
      expect(onFilterMethod).toBeCalledWith({
        from_date: '2021-09-07T00:00:00.000Z',
        to_date: '2021-09-14T00:00:00.000Z',
        category: 'cat1',
        status: 'stat1',
        priority: 'priority1',
        summary: '',
      });
    });
  });

  it('Should render Filter section, enable the date selection and click submit.', async () => {
    const today = new Date('2021-09-14'); //YYYY-MM-DD
    let lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const onFilterMethod = jest.fn();
    const { container } = render(
      <Filter
        categoryList={category as []}
        statusList={status as []}
        priorityList={priority as []}
        fromDate={lastWeek}
        toDate={today}
        onFilter={onFilterMethod}
      />
    );

    const from_date = getById(container, 'from_date');
    fireEvent.change(from_date as HTMLElement, {
      target: { value: '09/05/2021' },
    });

    const to_date = getById(container, 'to_date');
    fireEvent.change(to_date as HTMLElement, {
      target: { value: '09/12/2021' },
    });
    const statusComponent = screen.getByTestId('status');
    await waitFor(() => {
      fireEvent.change(statusComponent, { target: { value: 'stat1' } });
    });

    const priorityComponent = screen.getByTestId('priority');
    await waitFor(() => {
      fireEvent.change(priorityComponent, { target: { value: 'priority1' } });
    });

    const categoryComponent = screen.getByTestId('category');
    await waitFor(() => {
      fireEvent.change(categoryComponent, { target: { value: 'cat1' } });
    });

    const btnSearch = screen.getByText('common:search');
    await waitFor(() => {
      fireEvent.click(btnSearch, {});
    });

    await waitFor(() => {
      expect(onFilterMethod).toBeCalledWith({
        from_date: '2021-09-05T00:00:00.000Z',
        to_date: '2021-09-12T00:00:00.000Z',
        category: 'cat1',
        status: 'stat1',
        priority: 'priority1',
        summary: '',
      });
    });
  });

  it('Should validate and show message if from date larger than to date', async () => {
    const today = new Date('2021-09-14');
    let lastWeek = new Date('2021-09-15');

    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const onFilterMethod = jest.fn();
    render(
      <Filter
        categoryList={category as []}
        statusList={status as []}
        priorityList={priority as []}
        fromDate={lastWeek}
        toDate={today}
        onFilter={onFilterMethod}
      />
    );

    const btnSearch = screen.getByText('common:search');
    fireEvent.click(btnSearch);

    await waitFor(() => {
      const errToDate = screen.getByTestId('errTo_date');
      expect(errToDate).toBeInTheDocument();
    });
  });

  it('Should validate and show message if from date larger than to date by changing from date', async () => {
    const today = new Date('2021-09-14');
    let lastWeek = new Date('2021-09-13');

    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const onFilterMethod = jest.fn();
    const { container } = render(
      <Filter
        categoryList={category as []}
        statusList={status as []}
        priorityList={priority as []}
        fromDate={lastWeek}
        toDate={today}
        onFilter={onFilterMethod}
      />
    );

    const from_date = getById(container, 'from_date');
    fireEvent.change(from_date as HTMLElement, {
      target: { value: '09/15/2021' },
    });

    await waitFor(() => {
      const btnSearch = screen.getByText('common:search');
      fireEvent.click(btnSearch);
    });

    await waitFor(() => {
      const errToDate = screen.getByTestId('errTo_date');
      expect(errToDate).toBeInTheDocument();
    });
  });

  it('Should validate and show message if to date greater than today', async () => {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    let lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const onFilterMethod = jest.fn();
    render(
      <Filter
        categoryList={category as []}
        statusList={status as []}
        priorityList={priority as []}
        fromDate={lastWeek}
        toDate={today}
        onFilter={onFilterMethod}
      />
    );

    const btnSearch = screen.getByText('common:search');
    fireEvent.click(btnSearch);

    await waitFor(() => {
      const errTo_date = screen.getByTestId('errTo_date');
      expect(errTo_date).toBeInTheDocument();
    });
  });

  it('Should render Filter section and enable the click of clear button', async () => {
    const today = new Date('2021-09-14');
    let lastWeek = new Date('2021-09-14');
    lastWeek.setDate(today.getDate() - 7);

    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const onFilterMethod = jest.fn();
    render(
      <Filter
        categoryList={category as []}
        statusList={status as []}
        priorityList={priority as []}
        fromDate={lastWeek}
        toDate={today}
        onFilter={onFilterMethod}
      />
    );

    const statusComponent = screen.getByTestId('status');
    await waitFor(() => {
      fireEvent.change(statusComponent, { target: { value: 'stat1' } });
    });

    const priorityComponent = screen.getByTestId('priority');
    await waitFor(() => {
      fireEvent.change(priorityComponent, { target: { value: 'priority1' } });
    });

    const categoryComponent = screen.getByTestId('category');
    await waitFor(() => {
      fireEvent.change(categoryComponent, { target: { value: 'cat1' } });
    });

    const btnClear = screen.getByText('common:clear');
    await waitFor(() => {
      fireEvent.click(btnClear, {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });
    });

    await waitFor(() => {
      expect(onFilterMethod).toBeCalledWith({
        from_date: '2021-09-07T00:00:00.000Z',
        to_date: '2021-09-14T00:00:00.000Z',
        category: '',
        status: '',
        priority: '',
        summary: '',
      });
    });
  });
});
