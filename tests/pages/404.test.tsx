import React from 'react';
import { render, screen } from '@testing-library/react';
import Custom404 from '@pages/404';

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

describe('404', () => {
  it('Should render 404', () => {
    render(<Custom404 />);
    const pageNotFound = screen.getByTestId('pageNotFound');
    expect(pageNotFound).toBeInTheDocument();
  });
});
