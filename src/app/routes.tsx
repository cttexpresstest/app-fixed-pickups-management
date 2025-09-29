import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './ui/MainLayout';
import { ClientsList } from '@features/clients/ClientsList';
import { PickupsPage } from '@features/pickups/PickupsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <ClientsList /> },
      { path: 'clients/:id', element: <PickupsPage /> }
    ]
  }
]);
