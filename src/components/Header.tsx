import React, { Suspense } from 'react';

const AzureHeader = React.lazy(async () => ({
  default: (await import('@ctt-library/header')).Header,
}));

export const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Suspense fallback={<h1 className="text-lg font-semibold">{title}</h1>}>
          <AzureHeader title={title} />
        </Suspense>
      </div>
    </header>
  );
};
