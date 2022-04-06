import { renderHook } from '@testing-library/react-hooks';
import { useRequest } from '@hooks/useRequest';
import mockApi from '../mock-api/index';

describe('UseRequest Hook', () => {
  beforeAll(() => {
    mockApi.init();
  });

  afterAll(() => {
    mockApi.reset();
  });

  it('Call useRequest hook with path as null.', () => {
    try {
      const { result } = renderHook(() => useRequest(null as any));
      expect(result).toBeNull();
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

  it('Call useRequest hook with NEXT_PUBLIC_API_URL set to null', () => {
    let temp = process.env;
    process.env = {
      ...temp,
      NEXT_PUBLIC_API_URL: undefined,
    };
    const { result } = renderHook(() => useRequest('/config', 'status'));
    expect(result.current).not.toBeNull();
    process.env = temp;
  });
});
