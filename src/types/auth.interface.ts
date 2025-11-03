// src/types/auth.interface.ts
export interface IAuthStore {
  user: string | null;
  token: string | null;
  lastActiveTime: number;
  login: (email: string, token: string) => void;
  logout: () => void;
  updateActivity: () => void;
}
