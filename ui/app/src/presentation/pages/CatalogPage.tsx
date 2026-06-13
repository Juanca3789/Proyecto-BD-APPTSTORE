import { RefreshCw } from 'lucide-react';
import { useCatalogController, useCartController } from '../../application/controllers';
import { GameCard, GameCardSkeleton } from '../components/GameCard';
import { SectionTitle } from '../components/Layout';
import { SceneBackground } from '../components/SceneBackground';
import type { Game } from '../../domain/Game';

export function CatalogPage() {
  const { games, loading, error, reload } = useCatalogController();
  const { agregar } = useCartController();

  const handleQuickAdd = async (game: Game) => {
    await agregar(game.nombre, 1, game.precioLicencia);
  };

  return (
    <main>
      <section className="hero-x17 pt-24 pb-16 px-gutter">
        <SceneBackground variant="hero" watermark="17" />
        <div className="hero-orb hero-orb-1" aria-hidden />
        <div className="hero-orb hero-orb-2" aria-hidden />
        <div className="max-w-container mx-auto relative z-10">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-[0.35em] uppercase text-alien-glow mb-4 flex items-center gap-3">
              <span className="inline-block w-10 h-px bg-gradient-to-r from-alien to-transparent" />
              Sistema de licencias
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-ink mb-6 tracking-tight leading-[1.02] uppercase">
              Licencias
              <span className="hero-title-accent block mt-1">digitales</span>
            </h1>
            <p className="text-ink-muted text-base md:text-lg max-w-xl mb-10 leading-relaxed pl-5 border-l-[3px] border-alien shadow-[inset_3px_0_12px_rgba(0,200,255,0.08)]">
              Compra y vende licencias de juegos móviles. Infraestructura segura,
              catálogo en tiempo real.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#catalogo" className="btn-alien">
                Explorar catálogo
              </a>
              <button type="button" className="btn-secondary">
                Vender licencia
              </button>
            </div>
            <div className="hero-stat-strip">
              <div className="hero-stat">
                Catálogo
                <strong>En vivo</strong>
              </div>
              <div className="hero-stat">
                Licencias
                <strong>Instantáneas</strong>
              </div>
              <div className="hero-stat">
                Plataforma
                <strong>Segura</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalogo" className="py-12 px-gutter max-w-container mx-auto bg-white">
        <SectionTitle title="Destacados" />

        {error && (
          <div className="mb-8 p-5 panel-spec flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm font-mono text-ink-muted">{error}</p>
            <button
              type="button"
              onClick={() => void reload()}
              className="btn-secondary text-xs py-2 px-5 flex items-center gap-2 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reintentar
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <GameCardSkeleton key={i} />)
            : games.map((game) => (
                <GameCard key={game.nombre} game={game} onAddToCart={handleQuickAdd} />
              ))}
        </div>

        {!loading && games.length === 0 && !error && (
          <p className="text-center font-mono text-sm text-ink-faint py-12 uppercase tracking-widest">
            Sin juegos en catálogo
          </p>
        )}
      </section>
    </main>
  );
}
