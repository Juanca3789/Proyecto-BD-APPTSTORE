import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartController } from '../../application/controllers';
import { formatPrice } from '../../domain/Game';
import { SceneBackground } from '../components/SceneBackground';

export function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    total,
    ready,
    actualizarCantidad,
    eliminar,
    finalizarCompra,
    checkoutMessage,
    checkingOut,
  } = useCartController();

  const handleCheckout = async () => {
    const ok = await finalizarCompra();
    if (ok) navigate('/');
  };

  if (!ready) {
    return (
      <main className="max-w-container mx-auto px-gutter py-12 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-alien" />
      </main>
    );
  }

  return (
    <main className="page-with-scene max-w-container mx-auto px-gutter py-8 md:py-12">
      <SceneBackground variant="page" />
      <div className="page-header">
        <ShoppingBag className="w-7 h-7 text-alien" strokeWidth={2.5} />
        <h1 className="text-2xl md:text-3xl font-bold text-ink uppercase tracking-tight">Mi carrito</h1>
        <span className="ml-auto accent-bar" />
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p className="font-mono text-sm uppercase tracking-[0.25em] text-ink-faint mb-8">
            Carrito vacío
          </p>
          <Link to="/" className="btn-alien inline-flex">
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <article
                key={item.nombreJuego}
                className="card-x17 p-4 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-ink uppercase tracking-tight truncate">
                    {item.nombreJuego}
                  </h3>
                  <p className="font-mono text-xs text-ink-faint mt-1">
                    {formatPrice(item.precioUnitario)} / licencia
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.cantidad}
                    onChange={(e) =>
                      void actualizarCantidad(item.nombreJuego, Number(e.target.value))
                    }
                    className="input-field w-20 text-center font-mono text-sm"
                    aria-label={`Cantidad de ${item.nombreJuego}`}
                  />
                  <p className="font-mono text-sm font-bold text-ink min-w-[80px] text-right">
                    {formatPrice(item.precioUnitario * item.cantidad)}
                  </p>
                  <button
                    type="button"
                    onClick={() => void eliminar(item.nombreJuego)}
                    className="btn-danger"
                    aria-label={`Eliminar ${item.nombreJuego}`}
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="panel-spec h-fit sticky top-24 lg:top-28">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint mb-4">
              Resumen de compra
            </h2>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-ink">
              <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">Subtotal</span>
              <span className="font-mono text-xl font-bold text-ink">{formatPrice(total)}</span>
            </div>

            {checkoutMessage && (
              <p
                className={`font-mono text-xs mb-4 ${
                  checkoutMessage.includes('correctamente') ? 'text-alien-glow' : 'text-red-600'
                }`}
              >
                {checkoutMessage}
              </p>
            )}

            <button
              type="button"
              onClick={() => void handleCheckout()}
              disabled={checkingOut}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {checkingOut && <Loader2 className="w-4 h-4 animate-spin" />}
              Finalizar compra
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
