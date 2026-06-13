import { useCallback, useEffect, useState } from 'react';
import type { Game } from '../domain/Game';
import { useDependencies } from './AppContext';

export function useCatalogController() {
  const { gameRepository } = useDependencies();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const names = await gameRepository.listFeatured();
      const results = await Promise.all(
        names.map((name) => gameRepository.getByName(name)),
      );
      setGames(results.filter((g): g is Game => g !== null));
    } catch {
      setError('No se pudo cargar el catálogo. Verifica que la API esté activa.');
    } finally {
      setLoading(false);
    }
  }, [gameRepository]);

  useEffect(() => {
    void load();
  }, [load]);

  return { games, loading, error, reload: load };
}

export function useProductController(nombre: string | undefined) {
  const { gameRepository } = useDependencies();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nombre) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await gameRepository.getByName(decodeURIComponent(nombre));
        if (!cancelled) {
          setGame(result);
          if (!result) setError('Juego no encontrado');
        }
      } catch {
        if (!cancelled) setError('Error al cargar el producto');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [gameRepository, nombre]);

  return { game, loading, error };
}

export { useCartController } from './CartContext';
export { useAuthController } from './AuthContext';
