import React from 'react';
import { render, screen } from '@testing-library/react';
import AlertTemplate from '@components/shared/alert-template';

describe('Alert Template', () => {
  it('Should render Alert Template - info', () => {
    const message = 'This is info message';
    render(<AlertTemplate options={{ type: 'info' }} message={message} />);
    const icon = screen.getByTestId('infoIcon');
    const span = screen.getByText(message);
    expect(span).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('Should render Alert Template - success', () => {
    const message = 'This is info message';
    render(<AlertTemplate options={{ type: 'success' }} message={message} />);
    const icon = screen.getByTestId('successIcon');
    const span = screen.getByText(message);
    expect(span).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('Should render Alert Template - error', () => {
    const message = 'This is info message';
    render(<AlertTemplate options={{ type: 'error' }} message={message} />);
    const icon = screen.getByTestId('errorIcon');
    const span = screen.getByText(message);
    expect(span).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
