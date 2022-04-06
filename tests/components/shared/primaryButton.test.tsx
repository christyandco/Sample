import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import PrimaryButton from '@components/shared/primaryButton';

describe('Primary Button', () => {
  afterAll(cleanup);

  it('Should render Primary Button', () => {
    render(<PrimaryButton text='Apply' className='bg-gray-50' />);
    const button = screen.getByText('Apply');
    expect(button).toBeInTheDocument();
    expect(button.classList.contains('bg-gray-50')).toBeTruthy();
  });

  it('Should render Primary Button and fire click event', () => {
    const onClick = jest.fn();
    render(
      <PrimaryButton text='Apply' className='bg-gray-50' onClick={onClick} />
    );
    const button = screen.getByText('Apply');
    fireEvent.click(button, {});
    expect(onClick).toBeCalledTimes(1);
  });
});
