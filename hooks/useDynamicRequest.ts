import useSwr from 'swr';

export const useDynamicRequest = (path: string | null) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
  const url = path !== null ? baseUrl + path : null;
  const { data, error, isValidating, mutate } = useSwr(() => url);
  return { data, error, isValidating, mutate };
};
