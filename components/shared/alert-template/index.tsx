import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faInfoCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
const AlertTemplate = ({ options, message, close }: any) => {
  return (
    <div
      data-testid='alert'
      className='text-white px-6 py-4 border-0 rounded relative mb-4 bg-csa-primary shadow-2xl'
    >
      <span className='text-xl inline-block mr-5 align-middle'>
        {options.type === 'info' && (
          <FontAwesomeIcon
            data-testid='infoIcon'
            icon={faInfoCircle}
            className='text-white text-2xl'
          />
        )}
        {options.type === 'success' && (
          <FontAwesomeIcon
            data-testid='successIcon'
            icon={faCheckCircle}
            className='text-white text-2xl'
          />
        )}
        {options.type === 'error' && (
          <FontAwesomeIcon
            data-testid='errorIcon'
            icon={faTimesCircle}
            className='text-white text-2xl'
          />
        )}
      </span>
      <span
        data-testid='alert-mesage'
        className='inline-block align-middle mr-8'
      >
        {message}
      </span>
      <button
        onClick={close}
        className='absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none'
      >
        <span>×</span>
      </button>
    </div>
  );
};

export default AlertTemplate;
