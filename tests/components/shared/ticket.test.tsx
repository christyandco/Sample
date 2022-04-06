import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Ticket, { ITicket } from '@components/shared/ticket';

jest.mock('@components/shared/ckeditor5', () => {
  return {
    __esModule: true,
    default: ({
      name,
      value,
      disabled = false,
      onChange,
    }: {
      name: string;
      value: string;
      disabled: boolean;
      onChange: Function;
    }) => {
      return (
        <input
          data-testid='ckeditor5'
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      );
    },
  };
});

jest.mock('react-alert', () => {
  return {
    __esModule: true,
    useAlert: () => {
      return {
        error: jest.fn(),
        success: jest.fn(),
        info: jest.fn(),
      };
    },
  };
});
describe('Ticket', () => {
  it('Should render Create Ticket', async () => {
    const onSave = jest.fn();
    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const applicationList = [
      { appCode: 'AP1', applicationName: 'App Name' },
      { appCode: 'AP2', applicationName: 'App2 Name' },
    ];

    render(
      <Ticket
        type='create'
        onSave={onSave}
        applicationList={applicationList}
        categoryList={category}
        priorityList={priority}
        statusList={status}
      />
    );

    await waitFor(() => {
      const ticketId = screen.queryByTestId('ticketId');
      expect(ticketId).toBe(null);
    });

    const summary = screen.getByTestId('summary');
    expect(summary.getAttribute('disabled')).toBe(null);
  });

  it('Should render Create Ticket with single item in status', async () => {
    const onSave = jest.fn();
    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const applicationList = [
      { appCode: 'AP1', applicationName: 'App Name' },
      { appCode: 'AP2', applicationName: 'App2 Name' },
    ];

    render(
      <Ticket
        type='create'
        onSave={onSave}
        applicationList={applicationList}
        categoryList={category}
        priorityList={priority}
        statusList={status}
      />
    );

    await waitFor(() => {
      const ticketId = screen.queryByTestId('ticketId');
      expect(ticketId).toBe(null);
    });

    const summary = screen.getByTestId('summary');
    expect(summary.getAttribute('disabled')).toBe(null);
  });

  it('Should render Create Ticket with validations on create click', async () => {
    const onSave = jest.fn();
    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const applicationList = [
      { appCode: 'AP1', applicationName: 'App Name' },
      { appCode: 'AP2', applicationName: 'App2 Name' },
    ];

    render(
      <Ticket
        type='create'
        onSave={onSave}
        applicationList={applicationList}
        categoryList={category}
        priorityList={priority}
        statusList={status}
      />
    );

    const btnCreate = screen.getByText('common:create');

    fireEvent.click(btnCreate);
    await waitFor(() => {
      const errDropdown = screen.getAllByTestId('errDropdown');
      const errSummary = screen.getByTestId('errSummary');

      expect(errDropdown.length).toBe(4);
      expect(errSummary).toBeInTheDocument();
    });
  });

  it('Should render Create Ticket with create click', async () => {
    const onSave = jest.fn();
    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const applicationList = [
      { appCode: 'AP1', applicationName: 'App Name' },
      { appCode: 'AP2', applicationName: 'App2 Name' },
    ];

    render(
      <Ticket
        type='create'
        onSave={onSave}
        applicationList={applicationList}
        categoryList={category}
        priorityList={priority}
        statusList={status}
      />
    );

    const summary = screen.getByTestId('summary');
    await waitFor(() => {
      fireEvent.change(summary, { target: { value: 'Summary Text' } });
    });
    const filters = screen.getAllByTestId('drpFilters');
    await waitFor(() => {
      fireEvent.change(filters[0], { target: { value: 'AP1' } });
    });

    await waitFor(() => {
      fireEvent.change(filters[1], { target: { value: 'cat1' } });
    });

    await waitFor(() => {
      fireEvent.change(filters[3], { target: { value: 'stat1' } });
    });

    await waitFor(() => {
      fireEvent.change(filters[2], { target: { value: 'priority1' } });
    });

    // get the upload button
    //const uploader = screen.getByTestId('upload');
    // simulate ulpoad event and wait until finish
    /*await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file] },
      })
    );*/

    const btnCreate = screen.getByText('common:create');
    fireEvent.click(btnCreate);
    await waitFor(() => {
      expect(onSave).toBeCalledWith({
        ticketId: '',
        appCode: 'AP1',
        createdByUser: '',
        category: 'cat1',
        priority: 'priority1',
        status: 'stat1',
        summary: 'Summary Text',
        description: '',
        files: [],
      });
    });
  });

  it('Should render Create Ticket with create click and File attachment', async () => {
    const onSave = jest.fn();
    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const applicationList = [
      { appCode: 'AP1', applicationName: 'App Name' },
      { appCode: 'AP2', applicationName: 'App2 Name' },
    ];

    render(
      <Ticket
        type='create'
        onSave={onSave}
        applicationList={applicationList}
        categoryList={category}
        priorityList={priority}
        statusList={status}
      />
    );

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const summary = screen.getByTestId('summary');
    await waitFor(() => {
      fireEvent.change(summary, { target: { value: 'Summary Text' } });
    });
    const filters = screen.getAllByTestId('drpFilters');

    fireEvent.change(filters[0], { target: { value: 'AP1' } });

    fireEvent.change(filters[1], { target: { value: 'cat1' } });

    fireEvent.change(filters[3], { target: { value: 'stat1' } });

    fireEvent.change(filters[2], { target: { value: 'priority1' } });

    const upload = screen.getByTestId('upload');

    fireEvent.change(upload, {
      target: { files: [file] },
    });
    fireEvent.input(upload);
    const btnCreate = screen.getByText('common:create');
    fireEvent.click(btnCreate);
    await waitFor(() => {
      expect(onSave).toBeCalledWith({
        ticketId: '',
        appCode: 'AP1',
        createdByUser: '',
        category: 'cat1',
        priority: 'priority1',
        status: 'stat1',
        summary: 'Summary Text',
        description: '',
        files: [file],
      });
    });
  });

  it('Should render Create Ticket and implement cancel click', async () => {
    const onSave = jest.fn();
    const onCancel = jest.fn();
    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const applicationList = [
      { appCode: 'AP1', applicationName: 'App Name' },
      { appCode: 'AP2', applicationName: 'App2 Name' },
    ];

    render(
      <Ticket
        type='create'
        onSave={onSave}
        applicationList={applicationList}
        categoryList={category}
        priorityList={priority}
        statusList={status}
        onCancel={onCancel}
      />
    );

    const summary = screen.getByTestId('summary');
    await waitFor(() => {
      fireEvent.change(summary, { target: { value: 'Summary Text' } });
    });
    const filters = screen.getAllByTestId('drpFilters');
    await waitFor(() => {
      fireEvent.change(filters[0], { target: { value: 'AP1' } });
    });

    await waitFor(() => {
      fireEvent.change(filters[1], { target: { value: 'cat1' } });
    });

    await waitFor(() => {
      fireEvent.change(filters[3], { target: { value: 'stat1' } });
    });

    await waitFor(() => {
      fireEvent.change(filters[2], { target: { value: 'priority1' } });
    });

    const btnCancel = screen.getByText('common:cancel');

    fireEvent.click(btnCancel, {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });

    await waitFor(() => {
      expect(onCancel).toBeCalledTimes(1);
    });
  });

  it('Should render Create Ticket and implement cancel click without onCancel', async () => {
    const onSave = jest.fn();

    const category = ['cat1', 'cat2', 'cat3'];
    const status = ['stat1', 'stat2', 'stat3'];
    const priority = ['priority1', 'priority2', 'priority3'];
    const applicationList = [
      { appCode: 'AP1', applicationName: 'App Name' },
      { appCode: 'AP2', applicationName: 'App2 Name' },
    ];

    render(
      <Ticket
        type='create'
        onSave={onSave}
        applicationList={applicationList}
        categoryList={category}
        priorityList={priority}
        statusList={status}
      />
    );

    const summary = screen.getByTestId('summary');
    await waitFor(() => {
      fireEvent.change(summary, { target: { value: 'Summary Text' } });
    });
    const filters = screen.getAllByTestId('drpFilters');
    await waitFor(() => {
      fireEvent.change(filters[0], { target: { value: 'AP1' } });
    });

    await waitFor(() => {
      fireEvent.change(filters[1], { target: { value: 'cat1' } });
    });

    await waitFor(() => {
      fireEvent.change(filters[3], { target: { value: 'stat1' } });
    });

    await waitFor(() => {
      fireEvent.change(filters[2], { target: { value: 'priority1' } });
    });

    const btnCancel = screen.getByText('common:cancel');

    fireEvent.click(btnCancel, {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });

    await waitFor(() => {
      expect(summary.getAttribute('value')).toBe('');
    });
  });
  //Edit Ticket

  it('Should render Edit Ticket without comments', async () => {
    const onSave = jest.fn();
    const categoryList = ['cat1', 'cat2', 'cat3'];
    const statusList = ['stat1', 'stat2', 'stat3'];
    const priorityList = ['priority1', 'priority2', 'priority3'];
    const applicationList = [
      { appCode: 'AP1', applicationName: 'App Name' },
      { appCode: 'AP2', applicationName: 'App2 Name' },
    ];
    const tickedId = '123';
    const current: ITicket = {
      appCode: 'AP1',
      priority: 'priority1',
      status: 'status1',
      category: 'cat1',
      description: 'Test description',
      summary: 'test summary',
      files: [],
      plantId: 'plantId',
      plantName: 'plantName',
      ticketId: tickedId,
    };
    render(
      <Ticket
        type='edit'
        onSave={onSave}
        applicationList={applicationList}
        categoryList={categoryList}
        priorityList={priorityList}
        statusList={statusList}
        issueEdit={true}
        current={current}
      />
    );

    await waitFor(() => {
      const ticketId = screen.getByText(tickedId);
      expect(ticketId).toBeInTheDocument();
    });

    const btnUpdate = screen.getByText('common:update');
    fireEvent.click(btnUpdate, {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });
    await waitFor(() => {
      expect(onSave).toBeCalled();
    });
  });

  it('Should render Edit Ticket with edit button disabled and toggle on click;', async () => {
    const onSave = jest.fn();
    const categoryList = ['cat1', 'cat2', 'cat3'];
    const statusList = ['stat1', 'stat2', 'stat3'];
    const priorityList = ['priority1', 'priority2', 'priority3'];
    const applicationList = [
      { appCode: 'AP1', applicationName: 'App Name' },
      { appCode: 'AP2', applicationName: 'App2 Name' },
    ];
    const tickedId = '123';
    const current: ITicket = {
      appCode: 'AP1',
      priority: 'priority1',
      status: 'status1',
      category: 'cat1',
      description: 'Test description',
      summary: 'test summary',
      files: [],
      plantId: 'plantId',
      plantName: 'plantName',
      ticketId: tickedId,
    };
    render(
      <Ticket
        type='edit'
        onSave={onSave}
        applicationList={applicationList}
        categoryList={categoryList}
        priorityList={priorityList}
        statusList={statusList}
        issueEdit={false}
        current={current}
      />
    );

    await waitFor(() => {
      const ticketId = screen.getByText(tickedId);
      expect(ticketId).toBeInTheDocument();
    });

    const btnEditIssue = screen.getByTestId('btnEditIssue');

    fireEvent.click(btnEditIssue, {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });

    await waitFor(async () => {
      const formWrapper = screen.getByTestId('formWrapper');
      expect(formWrapper.className).toBe('');
    });
  });
});
