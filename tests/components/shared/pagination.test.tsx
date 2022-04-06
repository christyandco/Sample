import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@components/shared/pagination';

describe('Pagination', () => {
  it('Should render Pagination Buttons', () => {
    const onPaginatePrev = jest.fn();
    const onPaginateNext = jest.fn();
    render(
      <Pagination
        showLeft={true}
        onPaginatePrev={onPaginatePrev}
        onPaginateNext={onPaginateNext}
      />
    );
    const paginationBtn = screen.getByTestId('paginationBtn');
    expect(paginationBtn).toBeInTheDocument();
  });

  it('Should render Pagination Buttons - With Left button and Right disabled', () => {
    const onPaginatePrev = jest.fn();
    const onPaginateNext = jest.fn();
    render(
      <Pagination
        showLeft={true}
        showRight={false}
        onPaginatePrev={onPaginatePrev}
        onPaginateNext={onPaginateNext}
      />
    );
    const btnLeft = screen.getByTestId('btnLeft');
    expect(btnLeft.hasAttribute('disabled')).toBeFalsy();
    const btnRight = screen.getByTestId('btnRight');
    expect(btnRight.hasAttribute('disabled')).toBeTruthy();
  });

  it('Should render Pagination Buttons - With Right button and Left disabled', () => {
    const onPaginatePrev = jest.fn();
    const onPaginateNext = jest.fn();
    render(
      <Pagination
        showLeft={false}
        showRight={true}
        onPaginatePrev={onPaginatePrev}
        onPaginateNext={onPaginateNext}
      />
    );
    const btnLeft = screen.getByTestId('btnLeft');
    expect(btnLeft.hasAttribute('disabled')).toBeTruthy();
    const btnRight = screen.getByTestId('btnRight');
    expect(btnRight.hasAttribute('disabled')).toBeFalsy();
  });

  it('Should render Pagination Buttons - With Right button and Left button', () => {
    const onPaginatePrev = jest.fn();
    const onPaginateNext = jest.fn();
    render(
      <Pagination
        showLeft={true}
        showRight={true}
        onPaginatePrev={onPaginatePrev}
        onPaginateNext={onPaginateNext}
      />
    );
    const btnLeft = screen.getByTestId('btnLeft');
    expect(btnLeft.hasAttribute('disabled')).toBeFalsy();
    const btnRight = screen.getByTestId('btnRight');
    expect(btnRight.hasAttribute('disabled')).toBeFalsy();
  });

  it('Should render Pagination Buttons - With Left button click', () => {
    const onPaginatePrev = jest.fn();
    const onPaginateNext = jest.fn();
    render(
      <Pagination
        showLeft={true}
        showRight={true}
        onPaginatePrev={onPaginatePrev}
        onPaginateNext={onPaginateNext}
      />
    );
    const btnLeft = screen.getByTestId('btnLeft');
    fireEvent.click(btnLeft, {});
    expect(onPaginatePrev).toBeCalled();
  });

  it('Should render Pagination Buttons - With Right button click', () => {
    const onPaginatePrev = jest.fn();
    const onPaginateNext = jest.fn();
    render(
      <Pagination
        showLeft={true}
        showRight={true}
        onPaginatePrev={onPaginatePrev}
        onPaginateNext={onPaginateNext}
      />
    );
    const btnRight = screen.getByTestId('btnRight');
    fireEvent.click(btnRight, {});
    expect(onPaginateNext).toBeCalled();
  });
});
