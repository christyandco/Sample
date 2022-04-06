import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const Pagination: FC<{
  showLeft?: boolean;
  showRight?: boolean;
  onPaginatePrev: Function;
  onPaginateNext: Function;
}> = ({
  showLeft = true,
  showRight = true,
  onPaginatePrev,
  onPaginateNext,
}) => {
  return (
    <div
      data-testid='paginationBtn'
      className='py-2 w-full flex justify-center items-center'
    >
      <nav className='block'>
        <ul className='flex pl-0  list-none flex-wrap gap-x-5'>
          <li>
            <button
              data-testid='btnLeft'
              disabled={!showLeft}
              onClick={() => {
                onPaginatePrev();
              }}
              className={`first:ml-0 text-xs font-semibold flex w-8 h-8 rounded-full  p-0  items-center justify-center leading-tight relative border border-solid ${
                !showLeft
                  ? 'border-gray-400 cursor-default'
                  : 'border-csa-primary cursor-pointer'
              } bg-white text-csa-primary`}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={`-mr-px ${
                  !showLeft ? 'text-gray-500' : 'text-csa-primary'
                }`}
              />
            </button>
          </li>

          <li>
            <button
              data-testid='btnRight'
              disabled={!showRight}
              onClick={() => {
                onPaginateNext();
              }}
              className={`first:ml-0 text-xs font-semibold flex w-8 h-8 rounded-full p-0  items-center justify-center leading-tight relative border border-solid  ${
                !showRight
                  ? 'border-gray-400 cursor-default'
                  : 'border-csa-primary cursor-pointer'
              } bg-white text-csa-primary`}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`-mr-px ${
                  !showRight ? 'text-gray-500' : 'text-csa-primary'
                }`}
              />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
