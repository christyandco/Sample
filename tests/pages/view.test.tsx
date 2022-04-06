import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
        key: 'view',
      },
      asPath: '',
      push: jest.fn(),
    };
  },
}));

describe('Create Ticket', () => {
  beforeAll(() => {
    mockApi.init();
  });

  afterAll(() => {
    mockApi.reset();
  });

  it('Should render View Ticket', async () => {
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
    render(
      <Wrapper>
        <Edit />
      </Wrapper>
    );

    await waitFor(() => {
      const summary = screen.getByTestId('summary');
      const ticketid = screen.getByTestId('ticketId');
      expect(summary.getAttribute('value')).toBe('NEW PROJECT');
      expect(ticketid).toBeInTheDocument();
    });
  });
});
