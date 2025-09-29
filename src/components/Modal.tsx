import React, { Suspense } from 'react';

const LazyAzureModal = React.lazy(async () => ({
  default: (await import('@ctt-library/modal')).Modal,
}));

export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <Suspense fallback={
      <div className="fixed inset-0 bg-black/40 grid place-items-center p-4">
        <div className="bg-white rounded shadow p-4 w-full max-w-lg">
          <div className="font-medium mb-2">{title}</div>
          {children}
        </div>
      </div>
    }>
      {/* @ts-expect-error dynamic import */}
      <LazyAzureModal open={open} onClose={onClose} title={title}>
        {children}
      </LazyAzureModal>
    </Suspense>
  );
};
