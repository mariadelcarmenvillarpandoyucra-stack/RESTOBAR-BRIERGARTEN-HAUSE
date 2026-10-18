import type { Role, Session } from "../types";

/* ==========================================================================
   Manejo de sesión — migrado de js/core/session.js.
   Sigue sin backend real: guarda el usuario/rol en session/localStorage.
   ========================================================================== */
const SESSION_KEY = "biergarten_session";

export const SessionLib = {
  save(data: Omit<Session, "ts">, remember: boolean) {
    const payload = JSON.stringify({ ...data, ts: Date.now() });
    if (remember) {
      localStorage.setItem(SESSION_KEY, payload);
      sessionStorage.removeItem(SESSION_KEY);
    } else {
      sessionStorage.setItem(SESSION_KEY, payload);
      localStorage.removeItem(SESSION_KEY);
    }
  },

  get(): Session | null {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Session;
    } catch {
      return null;
    }
  },

  clear() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  },

  hasRole(role: Role): boolean {
    const s = this.get();
    return !!s && s.role === role;
  },
};

export interface DemoUser {
  username: string;
  password: string;
  role: Role;
  displayName: string;
  roleLabel: string;
}

export const DEMO_USERS: DemoUser[] = [
  { username: "admin", password: "dueno123", role: "dueno", displayName: "Administrador", roleLabel: "Dueño" },
  { username: "carlos", password: "mesero123", role: "mesero", displayName: "Carlos", roleLabel: "Mesero" },
  { username: "luis", password: "mesero123", role: "mesero", displayName: "Luis", roleLabel: "Mesero" },
  { username: "ana", password: "mesero123", role: "mesero", displayName: "Ana", roleLabel: "Mesero" },
];
