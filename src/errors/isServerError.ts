import { ServerErrors } from './types';

const isServerErrors = (error: unknown): error is ServerErrors => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray((error as ServerErrors).errors)
  );
};

export { isServerErrors };
