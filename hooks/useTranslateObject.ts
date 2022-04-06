import useTranslation from 'next-translate/useTranslation';
import { useEffect, useRef } from 'react';
export const useTranslateObject = (i18nKey: string) => {
  const { t } = useTranslation();
  const currentList = useRef(new Map());
  useEffect(() => {
    currentList.current = new Map(
      Object.entries(
        t(i18nKey, null, {
          returnObjects: true,
          fallback: 'defaultList',
        })
      )
    );
  }, []);
  return currentList.current;
};
