import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Tab, { ITabItems } from '@components/shared/tab/index';

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

describe('Tab', () => {
  let tabItems: ITabItems[] = [];
  beforeAll(() => {
    tabItems = [
      {
        name: 'List Ticket',
        shortName: 'List',
        selected: false,
        keywords: ['/'],
        link: '/',
      },
    ];
  });

  afterAll(cleanup);

  it('Should render Tab', () => {
    render(<Tab items={tabItems} />);

    const tabItem1 = screen.getByText('List Ticket');
    expect(tabItem1).toBeInTheDocument();

    const tabItem2 = screen.getByText('Create/Edit Ticket');
    expect(tabItem2).toBeInTheDocument();

    expect(screen.queryByText('View Ticket')).not.toBeInTheDocument();
  });

  it('Should render Tab and select Create Ticket', () => {
    render(<Tab items={tabItems} />);
    const tabItem1 =
      screen.getByText('Create/Edit Ticket').parentElement?.parentElement;
    expect(
      tabItem1?.className.indexOf('border-b-4 border-csa-primary') !== -1
    ).toBeTruthy();
  });
});
