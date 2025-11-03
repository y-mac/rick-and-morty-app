import { StateStorage } from 'zustand/middleware';
import { encryptData, decryptData } from '../../utils/crypto';

const STORAGE_KEY = 'encrypted_auth_store'; // Clave para localStorage

export const encryptedStorage: StateStorage = {
  getItem: (name: string): string | null => {
    try {
      const encryptedState = localStorage.getItem(STORAGE_KEY);
      if (!encryptedState) return null;

      const decryptedState = decryptData(encryptedState);
      if (decryptedState === undefined) {
        console.error('Fallo al descifrar datos del storage, devolviendo null.');
        return null;
      }
      // decryptData devuelve string | undefined, que es lo que StateStorage espera.
      return decryptedState;
    } catch (error) {
      console.error('Error al obtener el estado cifrado:', error);
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      const encryptedValue = encryptData(value);
      localStorage.setItem(STORAGE_KEY, encryptedValue);
    } catch (error) {
      console.error('Error al guardar el estado cifrado:', error);
    }
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
