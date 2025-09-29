import React, { Suspense } from 'react';

const LazyAzureAlert = React.lazy(async () => ({
  default: (await import('@ctt-library/alert')).Alert,
}));

export const Alert: React.FC<{ type?: 'success' | 'error' | 'info'; message: string }> = ({
  type = 'info',
  message,
}) => {
  return (
    <Suspense fallback={<div className="rounded border px-3 py-2 text-sm">{message}</div>}>
      {/* @ts-expect-error dynamic import */}
      <LazyAzureAlert type={type} message={message} />
    </Suspense>
  );
};
