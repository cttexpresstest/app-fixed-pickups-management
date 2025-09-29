import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@store/index';
import { useDebounce } from '@hooks/useDebounce';

export const ClientsList: React.FC = () => {
  const clients = useStore((s) => s.clients);
  const [q, setQ] = useState('');
  const debounced = useDebounce(q, 200);

  const filtered = useMemo(() => {
    const term = debounced.trim().toLowerCase();
    if (!term) return clients;
    return clients.filter(
      (c) => c.name.toLowerCase().includes(term) || c.code.toLowerCase().includes(term)
    );
  }, [clients, debounced]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Clientes</h1>
      <input
        aria-label="Buscar clientes"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar por nombre o código..."
        className="w-full md:w-1/2 rounded border px-3 py-2"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Código</th>
              <th className="py-2 pr-4">Nombre</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="py-2 pr-4 font-mono">{c.code}</td>
                <td className="py-2 pr-4">{c.name}</td>
                <td className="py-2">
                  <Link className="text-blue-600 hover:underline" to={`/clients/${c.id}`}>
                    Ver recogidas
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
