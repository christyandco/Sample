import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '@pages/list';
import Wrapper from '../mock-api/wrapper';
import mockApi from '../mock-api';
import { issueList, issueListNext, issueListLess } from '../mock-api/mockdata';

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

describe('List Page', () => {
  beforeEach(() => {
    mockApi.init();
  });
  afterEach(() => {
    mockApi.reset();
  });

  it('Should render List Page - Initial Load without data', async () => {
    const url = new RegExp(`/tickets*`);
    mockApi.getMock().onGet(url).reply(200, []);
    await waitFor(() => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );
    });
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('Should render List Page - with data', async () => {
    const url = new RegExp(`/tickets*`);
    mockApi.getMock().onGet(url).reply(200, issueList);
    await waitFor(() => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );
    });
    await waitFor(() => {
      const issueContainer = screen.getAllByTestId('dataContainer');
      expect(issueContainer.length).toBeGreaterThan(0);
    });
  });

  it('Should render List Page - with data and disabled Left Pagination', async () => {
    const url = new RegExp(`/tickets*`);
    mockApi.getMock().onGet(url).reply(200, issueList);
    await waitFor(() => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );
    });
    await waitFor(async () => {
      const issueContainer = screen.getAllByTestId('dataContainer');
      expect(issueContainer.length).toBeGreaterThan(0);
      const btnLeft = await screen.findByTestId('btnLeft');
      expect(btnLeft).toBeDisabled();
    });
  });

  it('Should render List Page - with data and issue less than page number', async () => {
    const url = new RegExp(`/tickets*`);
    mockApi
      .getMock()
      .onGet(url)
      .replyOnce(200, issueListLess)
      .onGet(url)
      .replyOnce(200, []);
    await waitFor(() => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );
    });
    await waitFor(async () => {
      const issueContainer = screen.getAllByTestId('dataContainer');
      expect(issueContainer.length).toBeGreaterThan(0);
      const btnLeft = await screen.findByTestId('btnLeft');
      expect(btnLeft).toBeDisabled();

      const btnRight = await screen.findByTestId('btnRight');
      expect(btnRight).toBeDisabled();
    });
  });

  it('Right Pagination button disabled', async () => {
    const url = new RegExp(`/tickets*`);
    mockApi
      .getMock()
      .onGet(url)
      .replyOnce(200, issueList)
      .onGet(url)
      .replyOnce(200, []);
    await waitFor(() => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );
    });

    await waitFor(async () => {
      const btnRight = await screen.findByTestId('btnRight');
      expect(btnRight).toBeDisabled();
    });
  });

  it('Right Pagination button click', async () => {
    const url = new RegExp(`/tickets*`);
    mockApi
      .getMock()
      .onGet(url)
      .replyOnce(200, issueList)
      .onGet(url)
      .replyOnce(200, issueListNext)
      .onGet(url)
      .replyOnce(200, issueListNext)
      .onGet(url)
      .replyOnce(200, []);

    await waitFor(() => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );
    });

    await waitFor(async () => {
      let btnRight = await screen.findByTestId('btnRight');
      fireEvent.click(btnRight, {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });

      await waitFor(async () => {
        const issueContainer = screen.getAllByTestId('dataContainer');
        expect(issueContainer.length).toBeGreaterThan(0);
        btnRight = await screen.findByTestId('btnRight');
        expect(btnRight).toBeDisabled();
      });
    });
  });

  it('Disabled Pagination buttons in case of pagesize is 8', async () => {
    const url = new RegExp(`/tickets*`);
    mockApi
      .getMock()
      .onGet(url)
      .replyOnce(200, issueList)
      .onGet(url)
      .replyOnce(200, []);

    await waitFor(() => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );
    });

    await waitFor(async () => {
      const issueContainer = screen.getAllByTestId('dataContainer');
      expect(issueContainer.length).toBeGreaterThan(0);
      const btnRight = await screen.findByTestId('btnRight');
      expect(btnRight).toBeDisabled();
      const btnLeft = await screen.findByTestId('btnLeft');
      expect(btnLeft).toBeDisabled();
    });
  });

  it('Left Pagination button click', async () => {
    const url = new RegExp(`/tickets*`);
    mockApi
      .getMock()
      .onGet(url)
      .replyOnce(200, issueList)
      .onGet(url)
      .replyOnce(200, issueList)
      .onGet(url)
      .replyOnce(200, issueList)
      .onGet(url)
      .replyOnce(200, issueList);

    await waitFor(() => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );
    });

    await waitFor(async () => {
      let btnRight = await screen.findByTestId('btnRight');
      fireEvent.click(btnRight, {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });

      await waitFor(async () => {
        let btnLeft = await screen.findByTestId('btnLeft');
        fireEvent.click(btnLeft, {
          stopPropagation: jest.fn(),
          preventDefault: jest.fn(),
        });
      });

      await waitFor(async () => {
        let btnLeft = await screen.findByTestId('btnLeft');
        expect(btnLeft).toBeDisabled();
      });
    });
  });

  //btnSort
  it('Check Sort header click', async () => {
    const url = new RegExp(`/tickets*`);
    mockApi.getMock().onGet(url).reply(200, issueList);

    await waitFor(() => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );
    });

    await waitFor(async () => {
      let btnSort = screen.getAllByTestId('btnSort');
      fireEvent.click(btnSort[0], {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });
    });

    await waitFor(async () => {
      const issueContainer = screen.getAllByTestId('dataContainer');
      expect(issueContainer.length).toBeGreaterThan(0);
    });
  });

  it('Check Search click', async () => {
    const url = new RegExp(`/tickets*`);
    mockApi.getMock().onGet(url).reply(200, issueList);

    await waitFor(() => {
      render(
        <Wrapper>
          <Home />
        </Wrapper>
      );
    });

    await waitFor(async () => {
      let btnSearch = screen.getByText('common:search');
      fireEvent.click(btnSearch, {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });
    });

    await waitFor(async () => {
      const issueContainer = screen.getAllByTestId('dataContainer');
      expect(issueContainer.length).toBeGreaterThan(0);
    });
  });
});
