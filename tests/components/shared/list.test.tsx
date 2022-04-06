import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import TicketList, { ITaskGridData } from '@components/shared/list';

describe('List', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('Should render List', () => {
    const onPaginatePrev = jest.fn();
    const onPaginateNext = jest.fn();
    const onSortClick = jest.fn();
    const gridData: any = [
      {
        applicationName: 'appName',
        category: 'cat1',
        priority: 'priority1',
        status: 'status1',
        createdByUser: 'user name',
        createdDate: 1631634510,
        summary: 'This is summary data',
        ticketId: '123',
      },
    ];
    render(
      <TicketList
        showLeft={false}
        showRight={false}
        gridData={gridData as ITaskGridData[]}
        pageIndex={0}
        onPaginatePrev={onPaginatePrev}
        onPaginateNext={onPaginateNext}
        onSortClick={onSortClick}
      />
    );
    const dataContainer = screen.getByTestId('dataContainer');
    expect(dataContainer).toBeInTheDocument();
  });

  it('Should render List with no data', async () => {
    const onPaginatePrev = jest.fn();
    const onPaginateNext = jest.fn();
    const onSortClick = jest.fn();
    const gridData: any = [];
    render(
      <TicketList
        showLeft={false}
        showRight={false}
        gridData={gridData as ITaskGridData[]}
        pageIndex={0}
        onPaginatePrev={onPaginatePrev}
        onPaginateNext={onPaginateNext}
        onSortClick={onSortClick}
      />
    );
    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });

  it('Should render List with no data and render NO DATA message', async () => {
    const onPaginatePrev = jest.fn();
    const onPaginateNext = jest.fn();
    const onSortClick = jest.fn();
    const gridData: any = [];
    render(
      <TicketList
        showLeft={false}
        showRight={false}
        gridData={gridData as ITaskGridData[]}
        pageIndex={0}
        onPaginatePrev={onPaginatePrev}
        onPaginateNext={onPaginateNext}
        onSortClick={onSortClick}
      />
    );

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      const nodata = screen.getByTestId('nodata');
      expect(nodata).toBeInTheDocument();
    });
  });

  it('Should render List and allow sort click on first column', async () => {
    const onPaginatePrev = jest.fn();
    const onPaginateNext = jest.fn();
    const onSortClick = jest.fn();
    const gridData: any = [
      {
        applicationName: 'appName',
        category: 'cat1',
        priority: 'priority1',
        status: 'status1',
        createdByUser: 'user name',
        createdDate: 1631634510,
        summary: 'This is summary data',
        ticketId: '123',
      },
      {
        applicationName: 'appName',
        category: 'cat1',
        priority: 'priority1',
        status: 'status1',
        createdByUser: 'user name',
        createdDate: 1631634510,
        summary: 'This is summary data',
        ticketId: '124',
      },
    ];
    render(
      <TicketList
        showLeft={false}
        showRight={true}
        gridData={gridData as ITaskGridData[]}
        pageIndex={0}
        onPaginatePrev={onPaginatePrev}
        onPaginateNext={onPaginateNext}
        onSortClick={onSortClick}
      />
    );

    const btnSort = screen.getAllByTestId('btnSort')[0];
    //await waitFor(() => {
    fireEvent.click(btnSort);
    //});

    await waitFor(() => {
      expect(onSortClick).toBeCalled();
    });
  });

  //btnRight

  it('Should render List and allow pagination click', async () => {
    const onPaginatePrev = jest.fn();
    const onPaginateNext = jest.fn();
    const onSortClick = jest.fn();
    const gridData: any = [
      {
        applicationName: 'appName',
        category: 'cat1',
        priority: 'priority1',
        status: 'status1',
        createdByUser: 'user name',
        createdDate: 1631634510,
        summary: 'This is summary data',
        ticketId: '123',
      },
      {
        applicationName: 'appName',
        category: 'cat1',
        priority: 'priority1',
        status: 'status1',
        createdByUser: 'user name',
        createdDate: 1631634510,
        summary: 'This is summary data',
        ticketId: '124',
      },
    ];
    render(
      <TicketList
        showLeft={false}
        showRight={true}
        gridData={gridData as ITaskGridData[]}
        pageIndex={0}
        onPaginatePrev={onPaginatePrev}
        onPaginateNext={onPaginateNext}
        onSortClick={onSortClick}
      />
    );

    const btnRight = screen.getByTestId('btnRight');
    //await waitFor(() => {
    fireEvent.click(btnRight);
    //});

    await waitFor(() => {
      expect(onPaginateNext).toBeCalled();
    });
  });
});
