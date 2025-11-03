// src/store/auth.store.ts
import { create } from 'zustand';
import { persist, createJSONStorage, PersistOptions, StorageValue } from 'zustand/middleware';
// La ruta corregida asume que encryptedStorage.middleware.ts está en la subcarpeta 'middleware'
import { encryptedStorage } from '../../../store/middleware/encryptStorage.middleware'; 

// Opcional: Si tienes este archivo, úsalo. Si no, usa la interfaz definida abajo.
import { IAuthStore } from '../../../types/auth.interface'; 

// 1. Tipado del Estado y Acciones
interface AuthState {
    user: string | null;
    token: string | null;
    lastActiveTime: number; 
}

interface AuthActions {
    login: (email: string, token: string) => void;
    logout: () => void;
    updateActivity: () => void;
}

// Combina el estado y las acciones para el tipo final
type AuthStore = AuthState & AuthActions;

const persistOptions: PersistOptions<IAuthStore> = {
  name: 'auth-storage',
  storage: createJSONStorage(
    () => encryptedStorage
  ),
  version: 1,
};

// 2. Creación del Store usando el middleware `persist`
export const useAuthStore = create<AuthStore>()(
    persist(
        // 'set' infiere el tipo (AuthStore), lo cual es limpio y seguro
        (set) => ({
            // Estado Inicial (AuthState)
            user: null,
            token: null,
            lastActiveTime: Date.now(),

            // Acciones (AuthActions)
            login: (email, token) => set({ 
                user: email, 
                token: token, 
                lastActiveTime: Date.now() 
            }),

            logout: () => set({ 
                user: null, 
                token: null, 
                lastActiveTime: 0 
            }),

            updateActivity: () => set((state) => ({ // Usar la forma con función si dependes del estado anterior
                ...state,
                lastActiveTime: Date.now()
            })),
        }),
        persistOptions
    )
);