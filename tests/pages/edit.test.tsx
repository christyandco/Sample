import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Wrapper from '../mock-api/wrapper';
import mockApi from '../mock-api';
import Edit from '@pages/edit/[id]';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/create',
      pathname: '',
      query: {
        id: 'PTF-64',
        key: 'edit',
      },
      asPath: '',
      push: jest.fn(),
    };
  },
}));

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

describe('Render Edit Ticket', () => {
  beforeAll(() => {
    mockApi.init();
  });

  afterAll(() => {
    mockApi.reset();
  });

  afterEach(() => {
    cleanup();
  });

  it('Should render Edit Ticket and Update on click', async () => {
    mockApi
      .getMock()
      .onGet(`/tickets/PTF-64`)
      .replyOnce(200, {
        ticketId: 'PTF-64',
        id: '2-399',
        summary: 'NEW PROJECT',
        description: 'SHABEEB',
        appCode: 'PTF',
        applicationName: 'IndustryApps Platform',
        category: 'Bug',
        priority: 'Normal',
        status: 'Submitted',
        createdByUser: 'Libin Babu',
        createdDate: 1632118692324,
        updatedDate: 1632118813509,
        plantId: 'Rio',
        plantName: 'RIO',
        files: [],
        comments: [],
      })
      .onGet(`/tickets/PTF-64`)
      .replyOnce(200, {
        ticketId: 'PTF-64',
        id: '2-399',
        summary: 'NEW PROJECT',
        description: 'SHABEEB',
        appCode: 'PTF',
        applicationName: 'IndustryApps Platform',
        category: 'Bug',
        priority: 'Major',
        status: 'Submitted',
        createdByUser: 'Libin Babu',
        createdDate: 1632118692324,
        updatedDate: 1632118813509,
        plantId: 'Rio',
        plantName: 'RIO',
        files: [],
        comments: [],
      });

    mockApi.getMock().onPut(`/tickets/PTF-64`).reply(200, {
      ticketId: 'PTF-64',
      id: '2-399',
      summary: 'NEW PROJECT',
      description: null,
      appCode: '',
      applicationName: null,
      category: null,
      priority: null,
      status: null,
      createdByUser: null,
      createdDate: null,
      updatedDate: null,
      plantId: null,
      plantName: null,
      files: [],
      comments: [],
    });

    render(
      <Wrapper>
        <Edit />
      </Wrapper>
    );

    const priority = screen.getAllByTestId('drpFilters');
    await waitFor(() => {
      fireEvent.change(priority[2], {
        target: {
          value: 'Major',
        },
      });
    });

    const btnCreate = screen.getByText('common:update');
    fireEvent.click(btnCreate);
    await waitFor(async () => {
      const tickedId = await screen.findByTestId('ticketId');
      expect(tickedId).toBeInTheDocument();
    });
  });

  it('Should render Edit Ticket and have error in Update click', async () => {
    mockApi
      .getMock()
      .onGet(`/tickets/PTF-64`)
      .replyOnce(200, {
        ticketId: 'PTF-64',
        id: '2-399',
        summary: 'NEW PROJECT',
        description: 'SHABEEB',
        appCode: 'PTF',
        applicationName: 'IndustryApps Platform',
        category: 'Bug',
        priority: 'Normal',
        status: 'Submitted',
        createdByUser: 'Libin Babu',
        createdDate: 1632118692324,
        updatedDate: 1632118813509,
        plantId: 'Rio',
        plantName: 'RIO',
        files: [],
        comments: [],
      })
      .onGet(`/tickets/PTF-64`)
      .replyOnce(200, {
        ticketId: 'PTF-64',
        id: '2-399',
        summary: 'NEW PROJECT',
        description: 'SHABEEB',
        appCode: 'PTF',
        applicationName: 'IndustryApps Platform',
        category: 'Bug',
        priority: 'Major',
        status: 'Submitted',
        createdByUser: 'Libin Babu',
        createdDate: 1632118692324,
        updatedDate: 1632118813509,
        plantId: 'Rio',
        plantName: 'RIO',
        files: [],
        comments: [],
      });

    mockApi.getMock().onPut(`/tickets/PTF-64`).networkError();

    render(
      <Wrapper>
        <Edit />
      </Wrapper>
    );

    const priority = screen.getAllByTestId('drpFilters');
    await waitFor(() => {
      fireEvent.change(priority[2], {
        target: {
          value: 'Major',
        },
      });
    });

    const btnCreate = screen.getByText('common:update');
    fireEvent.click(btnCreate);
    await waitFor(async () => {
      const alert = await screen.findByTestId('alert');
      expect(alert).toBeInTheDocument();
    });
  });

  it('Should render Edit Ticket and click cancel', async () => {
    mockApi.getMock().onGet(`/tickets/PTF-64`).reply(200, {
      ticketId: 'PTF-64',
      id: '2-399',
      summary: 'NEW PROJECT',
      description: 'SHABEEB',
      appCode: 'PTF',
      applicationName: 'IndustryApps Platform',
      category: 'Bug',
      priority: 'Normal',
      status: 'Submitted',
      createdByUser: 'Libin Babu',
      createdDate: 1632118692324,
      updatedDate: 1632118813509,
      plantId: 'Rio',
      plantName: 'RIO',
      files: [],
      comments: [],
    });

    mockApi.getMock().onPut(`/tickets/PTF-64`).networkErrorOnce();

    render(
      <Wrapper>
        <Edit />
      </Wrapper>
    );

    await waitFor(() => {
      const btnCancel = screen.getByText('common:cancel');
      fireEvent.click(btnCancel, {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });
    });

    await waitFor(async () => {
      const tickedId = await screen.findByTestId('ticketId');
      expect(tickedId).toBeInTheDocument();
    });
  });

  it('Should render and Add comments', async () => {
    mockApi.getMock().onGet(`/tickets/PTF-64`).reply(200, {
      ticketId: 'PTF-64',
      id: '2-399',
      summary: 'NEW PROJECT',
      description: 'SHABEEB',
      appCode: 'PTF',
      applicationName: 'IndustryApps Platform',
      category: 'Bug',
      priority: 'Normal',
      status: 'Submitted',
      createdByUser: 'Libin Babu',
      createdDate: 1632118692324,
      updatedDate: 1632118813509,
      plantId: 'Rio',
      plantName: 'RIO',
      files: [],
      comments: [],
    });

    mockApi
      .getMock()
      .onGet(`/tickets/PTF-64/comments`)
      .reply(200, [
        {
          id: '4-313',
          comment: '@Libin Babu: SHABEEB',
          ticketId: '2-399',
          createdBy: 'user_slowimo_customer',
          createdDate: 1632144953005,
        },
      ]);

    mockApi.getMock().onPost(`/tickets/PTF-64/comments`).reply(200, {
      commentId: '4-313',
      comments: '@Libin Babu: SHABEEB',
      ticketId: '2-399',
      author: 'user_slowimo_customer',
    });

    render(
      <Wrapper>
        <Edit />
      </Wrapper>
    );

    const btnEdit = screen.getByTestId('btnEdit');
    fireEvent.click(btnEdit, {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });

    await waitFor(async () => {
      const btnEditIssue = screen.getByTestId('btnEditIssue');
      expect(btnEditIssue).toBeInTheDocument();
    });

    await waitFor(() => {
      const ckEditor = screen.getByTestId('ckeditor5');
      fireEvent.change(ckEditor, {
        target: {
          value: 'New Comment added',
        },
      });
    });

    const btnAdd = screen.getByText('common:add-comment');
    await waitFor(() => {
      fireEvent.click(btnAdd, {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });
    });

    await waitFor(() => {
      const commentContainer = screen.getByTestId('comment');
      expect(commentContainer).toBeInTheDocument();
    });
  });

  it('Should render and Add comments with error', async () => {
    mockApi.getMock().onGet(`/tickets/PTF-64`).reply(200, {
      ticketId: 'PTF-64',
      id: '2-399',
      summary: 'NEW PROJECT',
      description: 'SHABEEB',
      appCode: 'PTF',
      applicationName: 'IndustryApps Platform',
      category: 'Bug',
      priority: 'Normal',
      status: 'Submitted',
      createdByUser: 'Libin Babu',
      createdDate: 1632118692324,
      updatedDate: 1632118813509,
      plantId: 'Rio',
      plantName: 'RIO',
      files: [],
      comments: [],
    });

    mockApi
      .getMock()
      .onGet(`/config/status/Submitted`)
      .reply(200, ['Open', 'In Progress']);

    mockApi
      .getMock()
      .onGet(`/tickets/PTF-64/comments`)
      .reply(200, [
        {
          id: '4-313',
          comment: '@Libin Babu: SHABEEB',
          ticketId: '2-399',
          createdBy: 'user_slowimo_customer',
          createdDate: 1632144953005,
        },
      ]);

    mockApi.getMock().onPost(`/tickets/PTF-64/comments`).reply(400, {
      commentId: '4-313',
      comments: '@Libin Babu: SHABEEB',
      ticketId: '2-399',
      author: 'user_slowimo_customer',
    });

    render(
      <Wrapper>
        <Edit />
      </Wrapper>
    );

    const btnEdit = screen.getByTestId('btnEdit');
    fireEvent.click(btnEdit, {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });

    await waitFor(async () => {
      const btnEditIssue = screen.getByTestId('btnEditIssue');
      expect(btnEditIssue).toBeInTheDocument();
    });

    await waitFor(() => {
      const ckEditor = screen.getByTestId('ckeditor5');
      fireEvent.change(ckEditor, {
        target: {
          value: 'New Comment added',
        },
      });
    });

    const btnAdd = screen.getByText('common:add-comment');
    await waitFor(() => {
      fireEvent.click(btnAdd, {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });
    });

    await waitFor(() => {
      const alert = screen.getByText('common:an-error-occurred');
      expect(alert).toBeInTheDocument();
    });
  });
});
