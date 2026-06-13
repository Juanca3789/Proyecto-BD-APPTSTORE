import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Game } from '../../domain/Game';
import { formatPrice } from '../../domain/Game';

interface GameCardProps {
  game: Game;
  onAddToCart?: (game: Game) => void;
}

export function GameCard({ game, onAddToCart }: GameCardProps) {
  return (
    <article className="card-x17 flex flex-col group">
      <Link to={`/producto/${encodeURIComponent(game.nombre)}`} className="block">
        <div className="card-media aspect-[4/3] w-full bg-chassis">
          {game.imagenBase64 ? (
            <img
              src={`data:image/png;base64,${game.imagenBase64}`}
              alt={game.nombre}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-alien-dim">
              <span className="font-mono text-2xl font-bold text-ink/20 tracking-[0.3em] uppercase">
                {game.nombre.slice(0, 2)}
              </span>
            </div>
          )}
          <div className="card-media-scan" aria-hidden />
          <span className="chip absolute top-3 left-3 z-10">{game.categoria}</span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/producto/${encodeURIComponent(game.nombre)}`}>
          <h3 className="text-base font-bold text-ink mb-1 uppercase tracking-tight group-hover:text-alien-glow transition-colors">
            {game.nombre}
          </h3>
        </Link>
        <p className="text-ink-faint text-xs font-mono mb-4 flex-grow">
          {game.cantDisponible} licencias · stock activo
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-ink/10">
          <span className="price-tag">
            {formatPrice(game.precioLicencia)}
          </span>
          <button
            type="button"
            aria-label={`Comprar ${game.nombre}`}
            onClick={() => onAddToCart?.(game)}
            className="btn-icon"
          >
            <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function GameCardSkeleton() {
  return (
    <div className="card-x17 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-chassis border-b border-ink" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-chassis border border-line w-3/4" />
        <div className="h-3 bg-chassis border border-line w-full" />
        <div className="h-8 bg-chassis border border-line w-1/2 mt-4" />
      </div>
    </div>
  );
}
