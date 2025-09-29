import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore, type Pickup } from '@store/index';
import { PickupForm } from './PickupForm';
import { Modal } from '@components/Modal';

export const PickupsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clients = useStore((s) => s.clients);
  const pickups = useStore((s) => s.pickups);
  const removePickup = useStore((s) => s.removePickup);

  const client = useMemo(() => clients.find((c) => c.id === id), [clients, id]);
  const clientPickups = useMemo(() => pickups.filter((p) => p.clientId === id), [pickups, id]);

  const [editing, setEditing] = useState<Pickup | null>(null);
  const [creating, setCreating] = useState<boolean>(false);

  if (!client) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">Cliente no encontrado.</p>
        <button className="text-blue-600 underline" onClick={() => navigate('/')}>Volver</button>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Recogidas de {client.name}</h1>
        <button
          className="rounded bg-blue-600 text-white px-3 py-2 hover:bg-blue-700"
          onClick={() => setCreating(true)}
        >
          Nueva recogida
        </button>
      </div>

      <div className="space-y-2">
        {clientPickups.length === 0 && <p className="text-sm text-gray-600">No hay recogidas.</p>}
        {clientPickups.map((p) => (
          <div key={p.id} className="rounded border bg-white p-4 flex items-center justify-between">
            <div>
              <div className="font-medium capitalize">{p.day}</div>
              <div className="text-sm text-gray-600">{p.time} · {p.address}</div>
            </div>
            <div className="flex gap-2">
              <button className="rounded border px-3 py-1" onClick={() => setEditing(p)}>Editar</button>
              <button className="rounded border px-3 py-1 text-red-600" onClick={() => removePickup(p.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={creating} onClose={() => setCreating(false)} title="Nueva recogida">
        <PickupForm clientId={client.id} onDone={() => setCreating(false)} />
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="Editar recogida">
        {editing && <PickupForm clientId={client.id} pickup={editing} onDone={() => setEditing(null)} />}
      </Modal>
    </section>
  );
};
