import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Header } from '@components/Header';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header title="Gestor de Recogidas" />
      <main className="container mx-auto max-w-6xl px-4 py-6 flex-1">
        <nav className="mb-4 text-sm">
          <Link to="/" className="text-blue-600 hover:underline">
            Inicio
          </Link>
        </nav>
        <Outlet />
      </main>
      <footer className="border-t bg-white">
        <div className="container mx-auto max-w-6xl px-4 py-4 text-xs text-gray-500">
          © {new Date().getFullYear()} CTT - Recogidas Fijas
        </div>
      </footer>
    </div>
  );
};
