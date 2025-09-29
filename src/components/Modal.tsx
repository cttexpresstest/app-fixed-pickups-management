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
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </div>
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