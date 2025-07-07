import type { ErrorInfo } from 'react';
import type { ErrorBoundaryPropsWithFallback } from 'react-error-boundary';

import { DefaultError } from '@/shared/components/molecules';
import { ErrorBoundary as DefaultErrorBoundary } from 'react-error-boundary';

type Optional<T, K extends keyof T> = Omit<T, K> & Pick<Partial<T>, K>;

type Properties = {
  readonly onReset?: () => void;
} & Optional<ErrorBoundaryPropsWithFallback, 'fallback'>;

const ErrorBoundary: React.FC<Properties> = ({
  fallback = undefined,
  onError,
  onReset = () => {},
  ...props
}) => {
  const onErrorReport = (error: Error, info: ErrorInfo) => {
    // use any crash reporting tool here
    return onError?.(error, info);
  };

  return (
    <DefaultErrorBoundary
      {...props}
      fallback={fallback ?? <DefaultError onReset={onReset} />}
      onError={onErrorReport}
    />
  );
};

export default ErrorBoundary;
