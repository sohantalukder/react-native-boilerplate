import { useState, useEffect } from 'react';

/**
 * A hook that returns a boolean indicating whether the component is mounted.
 * @returns {boolean} True if the component is mounted, false otherwise
 */
const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
};

export default useIsMounted;
