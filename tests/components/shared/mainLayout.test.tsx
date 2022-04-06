import React from 'react';
import { render, screen } from '@testing-library/react';
import MainLayout from '@components/shared/layout/mainLayout';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/create',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('Main Layout', () => {
  it('Should render content', () => {
    render(
      <MainLayout>
        <div data-testid='content'>Content</div>
      </MainLayout>
    );

    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();
  });

  it('Should render tab with link List Ticket,Create/Edit Ticket,View Ticket', () => {
    render(
      <MainLayout>
        <div data-testid='content'>Content</div>
      </MainLayout>
    );
    const tabItem1 = screen.getByText('common:menu-list-ticket');
    expect(tabItem1).toBeInTheDocument();

    const tabItem2 = screen.getByText('common:menu-create-ticket');
    expect(tabItem2).toBeInTheDocument();

    expect(
      screen.queryByText('common:menu-edit-view-ticket')
    ).not.toBeInTheDocument();
  });
});
