import { faFileAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import styles from './Attachment.module.css';

const Attachment: FC<{
  index: number;
  name: string;
  existing?: boolean;
  path?: string;
  thumbnailUrl?: string;
  onDelete?: Function;
}> = ({ index, name, existing = false, thumbnailUrl, path, onDelete }) => {
  return (
    <div
      data-index={index}
      className={`relative ${
        styles.tooltip
      }  rounded bg-gray-200 h-24  flex flex-col justify-around items-center p-1 ${
        !existing ? 'border-csa-primary border-solid border-2' : ''
      }`}
    >
      <span className={styles.tooltiptext}>{name}</span>
      {!existing ? (
        <button
          data-testid='deleteBtn'
          className='absolute right-1 top-0'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onDelete) {
              onDelete(index);
            }
          }}
        >
          <FontAwesomeIcon icon={faWindowClose} />
        </button>
      ) : null}

      <button
        data-testid='openBtn'
        disabled={!existing}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(path);
        }}
      >
        <FontAwesomeIcon
          className={`text-4xl ${existing ? '' : 'text-white'}`}
          icon={faFileAlt}
        />
      </button>
      <span
        style={{
          overflowX: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '120px',
        }}
        className={`text-xs text-center ${
          !existing ? 'text-csa-primary' : 'text-black'
        }`}
      >
        {name}
      </span>
    </div>
  );
};
export default Attachment;
