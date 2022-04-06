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

describe('Create Ticket', () => {
  beforeAll(() => {
    mockApi.init();
  });

  afterAll(() => {
    mockApi.reset();
  });

  it('Should render Create Ticket and Check cancel click', async () => {
    render(
      <Wrapper>
        <Create />
      </Wrapper>
    );

    const summary = screen.getByTestId('summary');
    await waitFor(() => {
      fireEvent.change(summary, {
        target: {
          value: 'summary',
        },
      });
    });

    const btnCancel = screen.getByText('common:cancel');
    fireEvent.click(btnCancel);
    await waitFor(() => {
      const summaryAfter = screen.getByTestId('summary');
      expect(summaryAfter.getAttribute('value')).toBe('');
    });
  });
});
