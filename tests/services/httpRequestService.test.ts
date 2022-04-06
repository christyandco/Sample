import httpService from '@services/httpRequestService';
import mockApi from '../mock-api';
import axios from 'axios';

jest.mock('../../services/tokenService', () => {
  return {
    __esModule: true,
    default: {
      getTokenDataFromCokiee: jest.fn(() => {
        return {
          token:'token'
        }
      }),
      refresh: jest.fn(),
    },
  };
});

describe('HttpRequest Service', () => {
  afterAll(() => {
    mockApi.reset();
  });
  it('Initialize Request Interceptor and check for 200', async () => {
    mockApi.init();
    httpService.initializeRequestInterceptor();
    const data = await axios.get('/config/priority');
    expect(data.status).toBe(200);
  });

/*it('Initialize Request Interceptor and check for error in getting token', async () => {
    mockApi.init();
    httpService.initializeRequestInterceptor();
    try {
      const data = await axios.get('/config/priority');
    }
    catch{
      expect(true).toBeTruthy();
    }
  });*/

  it('Initialize Response Interceptors and check for 401 error', async () => {
    mockApi.getMock().onGet('/auth').reply(401, {});
    httpService.initializeResponseInterceptor();
    try {
      await axios.get('/auth');
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });

  it('Initialize Response Interceptors and check for 404 error', async () => {
    mockApi.getMock().onGet('/auth').networkError();
    httpService.initializeResponseInterceptor();
    try {
      await axios.get('/auth');
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

  it('Initialize Response Interceptors with success', async () => {
    mockApi.getMock().onGet('/auth').reply(200);
    httpService.initializeResponseInterceptor();
    const data = await axios.get('/auth');
    expect(data.status).toBe(200);
  });
});
