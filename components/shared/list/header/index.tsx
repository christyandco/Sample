import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, FC } from 'react';

const Header: FC<{
  title: string;
  width: string;
  isSortable?: boolean;
  col?: string;
  onClick?: Function;
  curCol?: string;
  justify?: string;
  grow?: boolean;
}> = ({ title, width, isSortable, col, curCol, onClick, justify, grow }) => {
  const [dir, setDir] = useState<string>();
  const onSortClick = () => {
    const direction = dir === 'asc' ? 'desc' : 'asc';
    setDir(direction);
    if (onClick) {
      onClick(col, direction);
    }
  };

  useEffect(() => {
    if (curCol !== col) {
      setDir(undefined);
    }
  }, [curCol, col]);

  return (
    <div
      className={
        'inline-flex flex-row font-bold ' +
        width +
        (justify === 'center' ? ' items-center justify-around' : '') +
        (grow ? ' flex-grow' : '')
      }
    >
      {title}
      {isSortable && (
        <button
          data-testid='btnSort'
          className='flex flex-col ml-2'
          onClick={onSortClick}
        >
          {dir === 'asc' || !dir ? (
            <FontAwesomeIcon
              data-testid='up'
              style={{ fontSize: '.6rem' }}
              icon={faChevronUp}
            />
          ) : null}
          {dir === 'desc' || !dir ? (
            <FontAwesomeIcon
              data-testid='down'
              style={{ fontSize: '.6rem' }}
              className='text-xs'
              icon={faChevronDown}
            />
          ) : null}
        </button>
      )}
    </div>
  );
};

export default Header;
