import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Client = {
  id: string; // same as code
  code: string;
  name: string;
};

export type Pickup = {
  id: string;
  clientId: string;
  day: string; // e.g., 'monday'
  time: string; // 'HH:MM'
  address: string;
};

type State = {
  clients: Client[];
  pickups: Pickup[];
  addClient: (client: Client) => void;
  updateClient: (id: string, patch: Partial<Client>) => void;
  removeClient: (id: string) => void;
  addPickup: (p: Omit<Pickup, 'id'>) => void;
  updatePickup: (id: string, patch: Partial<Pickup>) => void;
  removePickup: (id: string) => void;
};

const initialClients: Client[] = [
  { id: 'C001', code: 'C001', name: 'Acme Corp' },
  { id: 'C002', code: 'C002', name: 'Globex' },
  { id: 'C003', code: 'C003', name: 'Initech' }
];

const initialPickups: Pickup[] = [
  { id: crypto.randomUUID(), clientId: 'C001', day: 'monday', time: '09:00', address: 'Calle Mayor 1' },
  { id: crypto.randomUUID(), clientId: 'C001', day: 'wednesday', time: '14:30', address: 'Av. Central 20' },
  { id: crypto.randomUUID(), clientId: 'C002', day: 'friday', time: '11:15', address: 'Plaza Norte 5' }
];

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      clients: initialClients,
      pickups: initialPickups,
      addClient: (client) => set((s) => ({ clients: [...s.clients, client] })),
      updateClient: (id, patch) =>
        set((s) => ({ clients: s.clients.map((c) => (c.id === id ? { ...c, ...patch } : c)) })),
      removeClient: (id) =>
        set((s) => ({
          clients: s.clients.filter((c) => c.id !== id),
          pickups: s.pickups.filter((p) => p.clientId !== id)
        })),
      addPickup: (p) =>
        set((s) => ({ pickups: [...s.pickups, { ...p, id: crypto.randomUUID() }] })),
      updatePickup: (id, patch) =>
        set((s) => ({ pickups: s.pickups.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
      removePickup: (id) => set((s) => ({ pickups: s.pickups.filter((p) => p.id !== id) }))
    }),
    { name: 'fixed-pickups-store' }
  )
);
