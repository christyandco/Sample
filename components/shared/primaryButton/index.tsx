import styles from './PrimaryButton.module.css';

import { FC } from 'react';
const PrimaryButton: FC<{
  text: string;
  onClick?: Function;
  className?: string;
}> = ({ text, onClick, className }) => {
  return (
    <button
      data-testid='btnPrimary'
      type='submit'
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      className={`${styles.primary} ${className}`}
    >
      {text}
    </button>
  );
};
export default PrimaryButton;
