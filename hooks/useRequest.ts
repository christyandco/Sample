import useSwr from 'swr';

export const useRequest = (path: string, name?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
  if (!path) {
    throw new Error('Path is required');
  }
  const url = name ? baseUrl + path + '/' + name : baseUrl + path;

  const { data, error, isValidating, mutate } = useSwr(url);
  return { data, error, isValidating, mutate };
};
