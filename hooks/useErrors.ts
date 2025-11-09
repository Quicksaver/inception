import { toast } from 'react-toastify';
import { create } from 'zustand';

interface ErrorWithMessage {
  [key: string]: unknown;
  message: string;
}

interface ErrorState {
  errors: ErrorWithMessage[];
}

type NewError = ErrorWithMessage | string;

const DEFAULT_ERROR = 'An unexpected error has occurred. If this persists, please reach out to us.';

const useInternalState = create<ErrorState>(() => ({ errors: [] }));

export const removeError = (error: ErrorWithMessage) => useInternalState.setState(state => ({
  errors: [ ...state.errors ].filter(err => err !== error),
}));

export const addError = (error?: NewError) => {
  if (!error) {
    return;
  }

  // eslint-disable-next-line no-console
  console.error(error);

  if (typeof error === 'object' && 'message' in error) {
    if (error.message) {
      // eslint-disable-next-line no-console
      console.error(new Error(error.message));
    }

    addError(error.message || DEFAULT_ERROR);
    return;
  }

  if (typeof error !== 'string') {
    addError(DEFAULT_ERROR);
    return;
  }

  const errorObj = { message: error };

  useInternalState.setState(state => ({
    errors: [
      ...state.errors,
      errorObj,
    ],
  }));

  toast(error, {
    onClose: () => removeError(errorObj),
    type: 'error',
  });
};

export const clearErrors = () => useInternalState.setState({ errors: [] });

const useErrors = () => {
  return useInternalState(state => state.errors);
};

export default useErrors;
