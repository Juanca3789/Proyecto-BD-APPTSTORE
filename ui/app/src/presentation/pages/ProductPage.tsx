import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCartController, useProductController } from '../../application/controllers';
import { formatPrice, formatSize } from '../../domain/Game';
import { SceneBackground } from '../components/SceneBackground';

export function ProductPage() {
  const { nombre } = useParams<{ nombre: string }>();
  const navigate = useNavigate();
  const { game, loading, error } = useProductController(nombre);
  const { agregar } = useCartController();
  const [cantidad, setCantidad] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!game) return;
    setAdding(true);
    await agregar(game.nombre, cantidad, game.precioLicencia);
    setAdding(false);
    navigate('/carrito');
  };

  if (loading) {
    return (
      <main className="max-w-container mx-auto px-gutter py-12 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-alien" />
      </main>
    );
  }

  if (error || !game) {
    return (
      <main className="max-w-container mx-auto px-gutter py-12 text-center">
        <p className="font-mono text-sm text-ink-muted mb-6">{error ?? 'Producto no encontrado'}</p>
        <Link to="/" className="btn-secondary inline-block text-xs">
          ← Catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="page-with-scene max-w-container mx-auto px-gutter py-8 md:py-12">
      <SceneBackground variant="page" />
      <Link to="/" className="link-back mb-10">
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} /> Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="card-x17 aspect-square flex items-center justify-center overflow-hidden">
          {game.imagenBase64 ? (
            <img
              src={`data:image/png;base64,${game.imagenBase64}`}
              alt={game.nombre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-alien-dim flex items-center justify-center">
              <span className="font-mono text-6xl font-bold text-ink/15 tracking-[0.4em] uppercase">
                {game.nombre.slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="chip self-start mb-4">{game.categoria}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-2 tracking-tight uppercase">
            {game.nombre}
          </h1>
          <p className="price-display mb-8">
            {formatPrice(game.precioLicencia)}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <label htmlFor="quantity" className="font-mono text-xs uppercase tracking-widest text-ink-faint">
              Cantidad
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={game.cantDisponible}
              value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
              className="input-field w-24 text-center font-mono"
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              type="button"
              onClick={() => void handleAdd()}
              disabled={adding || game.cantDisponible < 1}
              className="btn-alien flex items-center gap-2"
            >
              {adding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
              )}
              Agregar al carrito
            </button>
            <Link to="/" className="btn-secondary">
              Seguir comprando
            </Link>
          </div>

          <div className="panel-spec">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-ink-faint mb-4">
              Especificaciones
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-alien-glow mb-1">Tamaño</dt>
                <dd className="text-ink font-bold">{formatSize(game.tamanio)}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-alien-glow mb-1">Disponibles</dt>
                <dd className="text-ink font-bold">{game.cantDisponible}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-alien-glow mb-1">Vendidas</dt>
                <dd className="text-ink font-bold">{game.cantVendida}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
