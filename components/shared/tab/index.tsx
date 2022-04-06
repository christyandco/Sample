import { FC } from 'react';
import styles from './Tab.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface ITabItems {
  name: string;
  shortName: string;
  selected?: boolean;
  link: string;
  keywords: string[];
  isViewOnly?: boolean;
}

const Tab: FC<{ items: ITabItems[] }> = ({ items }) => {
  const router = useRouter();

  const isSelected = (tabItem: ITabItems) => {
    let selected = false;
    selected =
      tabItem.link == router.route ||
      (tabItem.link !== '/' && router.route.indexOf(tabItem.link) !== -1) ||
      (tabItem.link !== '/' &&
        tabItem.keywords.some((item) => router.route.indexOf(item) !== -1));
    return selected;
  };

  return (
    <div
      data-testid='tabContainer'
      id='tabContainer'
      className='w-full mx-auto '
    >
      <ul id='tabs' className={styles.tabHeader}>
        {items?.map((tabItem, index) => {
          tabItem.selected = isSelected(tabItem);
          if (tabItem.isViewOnly && !tabItem.selected) return null;

          return (
            <li
              key={`${index}_tab_item`}
              className={`${styles.tabItem} ${
                tabItem.selected ? 'border-b-4 ' : ''
              }`}
            >
              {tabItem.isViewOnly ? (
                <>
                  <span className='hidden md:block'>{tabItem.name}</span>
                  <span className='md:hidden'>{tabItem.shortName}</span>
                </>
              ) : (
                <Link href={`${tabItem.link}`} passHref>
                  <div>
                    <span className='hidden md:block cursor-pointer'>
                      {tabItem.name}
                    </span>
                    <span className='md:hidden cursor-pointer'>
                      {tabItem.shortName}
                    </span>
                  </div>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export type { ITabItems };
export default Tab;
