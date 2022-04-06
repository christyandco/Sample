import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@components/shared/list/header';

describe('Header', () => {
  it('Should render Header', () => {
    const title = 'head1';
    const onClick = jest.fn();
    render(
      <Header
        title={title}
        width='w-12'
        col='testCol'
        curCol='testCol'
        isSortable={true}
        onClick={onClick}
      />
    );
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('Should render Header with click', () => {
    const title = 'head1';
    const onClick = jest.fn();
    render(
      <Header
        title={title}
        width='w-12'
        col='testCol'
        curCol='testCol'
        isSortable={true}
        onClick={onClick}
      />
    );
    const btnSort = screen.getByTestId('btnSort');
    fireEvent.click(btnSort);
    expect(onClick).toBeCalledWith('testCol', 'asc');
  });

  it('Should render Header without sort', () => {
    const title = 'head1';
    render(
      <Header
        title={title}
        width='w-12'
        col='testCol'
        curCol='testCol1'
        isSortable={false}
      />
    );
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('Should render Header with sort asc and desc', () => {
    const title = 'head1';
    const onClick = jest.fn();
    render(
      <Header
        title={title}
        width='w-12'
        col='testCol'
        curCol='testCol'
        isSortable={true}
        onClick={onClick}
        justify='center'
        grow={true}
      />
    );
    const btnSort = screen.getByTestId('btnSort');
    fireEvent.click(btnSort);
    expect(onClick).toBeCalled();
    fireEvent.click(btnSort);
    expect(onClick).toBeCalledWith('testCol', 'desc');
  });
});
