import axios from 'axios';
import tokenService from './tokenService';
class HttpRequestService {
  //Add header to the token.
  public initializeRequestInterceptor(): void {
    axios.interceptors.request.use(
      (request) => {
        request.headers['Authorization'] = `Bearer ${
          tokenService.getTokenDataFromCokiee().token
        }`;
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public initializeResponseInterceptor() {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response) {
          const originalConfig = error.config;
          // Use custom status to identify refresh token
          if (error.response.status == 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            const tokenData = await tokenService.refresh();
            console.log(tokenData);
            originalConfig.headers = {
              Authorization: `Bearer ${
                tokenService.getTokenDataFromCokiee().token
              }`,
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            };

            return axios(originalConfig);
          } else {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
  }
}

export default new HttpRequestService();
