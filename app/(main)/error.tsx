'use client';

import { useEffect } from 'react';

import useGlobalException from 'hooks/useGlobalException';

interface ErrorProps {
  error?: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const { setGlobalException } = useGlobalException();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);

    if (error?.digest) {
      // eslint-disable-next-line no-console
      console.log(`An exception has occurred. Digest: ${error.digest}`);
    }

    if (error) {
      reset();
      setGlobalException({
        error: 'An unexpected error occurred. Please try again.',
      });
    }
  }, [ error, reset, setGlobalException ]);

  return null;
}
