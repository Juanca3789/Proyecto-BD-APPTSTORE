import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Loader2,
  LogIn,
  Search,
  ShoppingCart,
  UserCircle,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthController } from '../../application/controllers';

interface HeaderProps {
  cartCount: number;
}

export function Header({ cartCount }: HeaderProps) {
  const { user, login, register, logout, message, loading } = useAuthController();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [nombre, setNombre] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    if (!menuOpen || menuClosing) return;
    setMenuClosing(true);
  }, [menuOpen, menuClosing]);

  const openMenu = () => {
    setMenuClosing(false);
    setMenuOpen(true);
  };

  const toggleMenu = () => {
    if (menuOpen) closeMenu();
    else openMenu();
  };

  const handleMenuAnimationEnd = () => {
    if (menuClosing) {
      setMenuClosing(false);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (!menuOpen || menuClosing) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, menuClosing, closeMenu]);

  useEffect(() => {
    if (!menuOpen || menuClosing) return;

    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      closeMenu();
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [menuOpen, menuClosing, closeMenu]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(nombre);
    if (ok) {
      closeMenu();
      setNombre('');
    }
  };

  const handleRegister = async () => {
    await register(nombre);
  };

  const showMenu = menuOpen || menuClosing;

  return (
    <header className="nav-chassis fixed top-0 w-full z-50">
      <div className="nav-divider" aria-hidden />
      <div className="flex justify-between items-center px-gutter py-3 max-w-container mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <span className="logo-mark" aria-hidden />
          <span className="text-lg md:text-xl font-bold text-ink uppercase tracking-[0.15em] group-hover:text-alien-glow transition-colors duration-300">
            APPTSTORE
          </span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint pointer-events-none" strokeWidth={2.5} />
            <input
              className="input-search"
              placeholder="Buscar licencias..."
              type="search"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link
            to="/carrito"
            className="relative btn-icon"
            aria-label="Carrito"
          >
            <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="badge-count">{cartCount}</span>
            )}
          </Link>

          <div className="relative ml-1" ref={menuRef}>
            <button
              type="button"
              onClick={toggleMenu}
              className={`btn-icon ${menuOpen && !menuClosing ? 'btn-icon--active' : ''}`}
              aria-label="Cuenta"
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
            >
              <UserCircle className="w-4 h-4" strokeWidth={2.5} />
            </button>

            {showMenu && (
              <>
                <button
                  type="button"
                  className={`dropdown-backdrop sm:hidden ${menuClosing ? 'dropdown-backdrop--closing' : ''}`}
                  onClick={closeMenu}
                  aria-label="Cerrar menú"
                  tabIndex={-1}
                />
                <div
                  role="dialog"
                  aria-label={user ? 'Sesión activa' : 'Iniciar sesión'}
                  className={`panel-dropdown ${menuClosing ? 'panel-dropdown--closing' : ''}`}
                  onAnimationEnd={handleMenuAnimationEnd}
                >
                  <div className="dropdown-stagger">
                    <div className="accent-bar mb-4" />
                    {user ? (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-ink">
                          Operador:{' '}
                          <span className="font-mono text-alien-glow">{user.nombre}</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => void logout()}
                          className="btn-secondary w-full text-xs py-2"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleLogin} className="space-y-3">
                        <p className="text-xs font-mono uppercase tracking-widest text-ink-faint flex items-center gap-2">
                          <LogIn className="w-3.5 h-3.5" /> Acceso
                        </p>
                        <input
                          className="input-field text-sm"
                          placeholder="Usuario"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          required
                          autoFocus
                        />
                        {message && (
                          <p className="dropdown-message text-xs text-red-600 font-mono">{message}</p>
                        )}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex-1 text-xs py-2 flex items-center justify-center gap-2"
                          >
                            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Entrar'}
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleRegister()}
                            disabled={loading || !nombre}
                            className="btn-secondary flex-1 text-xs py-2 disabled:opacity-50"
                          >
                            Registro
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer-x17">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-gutter pb-8 max-w-container mx-auto gap-4">
        <div>
          <span className="text-sm font-bold uppercase tracking-[0.2em]">APPTSTORE</span>
          <p className="text-white/50 mt-1 text-xs font-mono">
            Tienda de Juegos — Grupo #6 · {new Date().getFullYear()}
          </p>
        </div>
        <nav>
          <ul className="flex flex-wrap justify-center gap-6 text-xs font-mono uppercase tracking-wider text-white/60">
            <li><a href="#" className="hover:text-alien transition-colors">Términos</a></li>
            <li><a href="#" className="hover:text-alien transition-colors">Privacidad</a></li>
            <li><a href="#" className="hover:text-alien transition-colors">Soporte</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export function SectionTitle({
  title,
  actionLabel,
  actionTo,
}: {
  title: string;
  actionLabel?: string;
  actionTo?: string;
}) {
  return (
    <div className="section-rule">
      <h2 className="text-xl md:text-2xl font-bold text-ink uppercase tracking-tight shrink-0">
        {title}
      </h2>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="ml-auto text-ink-faint hover:text-alien font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-1 shrink-0"
        >
          {actionLabel} <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </Link>
      )}
    </div>
  );
}
