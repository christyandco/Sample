import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Create from '@pages/create';
import Wrapper from '../mock-api/wrapper';
import mockApi from '../mock-api';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/create',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
    };
  },
}));

jest.mock('@components/shared/ticket', () => {
  return {
    __esModule: true,
    default: ({
      onSave,
      type,
      statusList,
      priorityList,
      categoryList,
      applicationList,
    }: {
      onSave: Function;
      type: string;
      statusList: [];
      priorityList: [];
      categoryList: [];
      applicationList: [];
    }) => {
      return (
        <button
          data-testid={'mockSubmit'}
          onClick={() => {
            onSave({
              ticketId: '',
              id: '',
              summary: 'TEST',
              description: null,
              appCode: '',
              applicationName: 'PTF',
              category: 'Bug',
              priority: 'Normal',
              status: 'Submitted',
              plantId: 'RIO',
              plantName: 'Rio',
              files: [],
              comments: [],
            });
          }}
        />
      );
    },
  };
});

describe('Create Ticket', () => {
  afterAll(() => {
    mockApi.reset();
  });

  it('Should render Create Ticket With Click and throw error', async () => {
    mockApi.init();
    render(
      <Wrapper>
        <Create />
      </Wrapper>
    );

    mockApi.getMock().onPost('/tickets').networkError();

    const btnCreate = screen.getByTestId('mockSubmit');
    fireEvent.click(btnCreate);

    await waitFor(async () => {
      const alert = await screen.findByTestId('alert');
      expect(alert).toBeInTheDocument();
    });
  });

  it('Should render Create Ticket With Click', async () => {
    mockApi.init();
    render(
      <Wrapper>
        <Create />
      </Wrapper>
    );

    mockApi.getMock().onPost('/tickets').reply(200, {
      ticketId: 'PTF-76',
      id: '2-411',
      summary: 'TEST',
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
    const btnCreate = screen.getByTestId('mockSubmit');
    fireEvent.click(btnCreate);

    await waitFor(async () => {
      const alert = await screen.findByTestId('alert');
      expect(alert).toBeInTheDocument();
    });
  });

  it('Should render Create Ticket With Click and statusList as [Submitted]', async () => {
    mockApi
      .getMock()
      .onGet('/config/status')
      .reply(200, { status: ['Submitted'] });
    render(
      <Wrapper>
        <Create />
      </Wrapper>
    );

    mockApi.getMock().onPost('/tickets').reply(200, {
      ticketId: 'PTF-76',
      id: '2-411',
      summary: 'TEST',
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
    const btnCreate = screen.getByTestId('mockSubmit');
    fireEvent.click(btnCreate);

    await waitFor(async () => {
      const alert = await screen.findByTestId('alert');
      expect(alert).toBeInTheDocument();
    });
  });
});
