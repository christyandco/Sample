import React from 'react';

import { render, screen } from '@testing-library/react';
import Loading from '@components/shared/loading';

describe('Loading', () => {
  it('Should render Loader', () => {
    render(<Loading />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(loader.className.indexOf('animate-spin') !== -1).toBeTruthy();
  });
});
