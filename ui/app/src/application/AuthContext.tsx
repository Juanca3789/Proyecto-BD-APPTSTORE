import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useDependencies } from './AppContext';

interface AuthContextValue {
  user: { id: number; nombre: string } | null;
  ready: boolean;
  login: (nombre: string) => Promise<boolean>;
  register: (nombre: string) => Promise<boolean>;
  logout: () => Promise<void>;
  message: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { authRepository, authStorage } = useDependencies();
  const [user, setUser] = useState<{ id: number; nombre: string } | null>(null);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setUser(await authStorage.load());
      setReady(true);
    })();
  }, [authStorage]);

  const login = useCallback(
    async (nombre: string) => {
      setLoading(true);
      setMessage(null);
      try {
        const result = await authRepository.login(nombre);
        if (result) {
          await authStorage.save(result.user);
          setUser(result.user);
          return true;
        }
        setMessage('Usuario no encontrado');
        return false;
      } catch {
        setMessage('Error al iniciar sesión');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [authRepository, authStorage],
  );

  const register = useCallback(
    async (nombre: string) => {
      setLoading(true);
      setMessage(null);
      try {
        const result = await authRepository.register(nombre);
        setMessage(result.message);
        return result.success;
      } catch {
        setMessage('Error al registrarse');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [authRepository],
  );

  const logout = useCallback(async () => {
    await authStorage.clear();
    setUser(null);
  }, [authStorage]);

  const value = useMemo(
    () => ({ user, ready, login, register, logout, message, loading }),
    [user, ready, login, register, logout, message, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthController(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthController debe usarse dentro de AuthProvider');
  return ctx;
}
