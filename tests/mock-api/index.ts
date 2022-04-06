import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  priorityList,
  statusList,
  categoryList,
  applicationList,
} from './mockdata';

class MockApi {
  mock: MockAdapter;
  constructor() {
    this.mock = new MockAdapter(axios);
  }
  init() {
    this.mock.onGet('/config/priority').reply(200, priorityList);
    this.mock.onGet('/config/status').reply(200, statusList);
    this.mock.onGet('/config/category').reply(200, categoryList);
    this.mock.onGet('/config/application').reply(200, applicationList);
  }

  getMock() {
    return this.mock;
  }

  reset() {
    this.mock.reset();
  }
}

export default new MockApi();
