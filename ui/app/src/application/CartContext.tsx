import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Cart, type CartItem } from '../domain/Cart';
import { useDependencies } from './AppContext';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  ready: boolean;
  agregar: (nombreJuego: string, cantidad: number, precioUnitario: number) => Promise<void>;
  actualizarCantidad: (nombreJuego: string, cantidad: number) => Promise<void>;
  eliminar: (nombreJuego: string) => Promise<void>;
  finalizarCompra: () => Promise<boolean>;
  checkoutMessage: string | null;
  checkingOut: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { cartStorage, purchaseRepository, authStorage } = useDependencies();
  const [cart, setCart] = useState<Cart>(new Cart());
  const [ready, setReady] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  const persist = useCallback(
    async (next: Cart) => {
      setCart(next);
      await cartStorage.save([...next.getItems()]);
    },
    [cartStorage],
  );

  useEffect(() => {
    (async () => {
      const items = await cartStorage.load();
      setCart(new Cart(items));
      setReady(true);
    })();
  }, [cartStorage]);

  const agregar = useCallback(
    async (nombreJuego: string, cantidad: number, precioUnitario: number) => {
      await persist(cart.agregar(nombreJuego, cantidad, precioUnitario));
    },
    [cart, persist],
  );

  const actualizarCantidad = useCallback(
    async (nombreJuego: string, cantidad: number) => {
      await persist(cart.actualizarCantidad(nombreJuego, cantidad));
    },
    [cart, persist],
  );

  const eliminar = useCallback(
    async (nombreJuego: string) => {
      await persist(cart.eliminar(nombreJuego));
    },
    [cart, persist],
  );

  const finalizarCompra = useCallback(async () => {
    setCheckingOut(true);
    setCheckoutMessage(null);
    try {
      const user = await authStorage.load();
      if (!user) {
        setCheckoutMessage('Debes iniciar sesión para finalizar la compra.');
        return false;
      }

      for (const item of cart.getItems()) {
        const result = await purchaseRepository.comprar(
          user.id,
          item.nombreJuego,
          item.cantidad,
          0,
        );
        if (!String(result.result).toLowerCase().includes('correctamente')) {
          setCheckoutMessage(result.result);
          return false;
        }
      }

      await cartStorage.clear();
      setCart(new Cart());
      setCheckoutMessage('Compra finalizada correctamente.');
      return true;
    } catch {
      setCheckoutMessage('Error al procesar la compra.');
      return false;
    } finally {
      setCheckingOut(false);
    }
  }, [authStorage, cart, cartStorage, purchaseRepository]);

  const value = useMemo<CartContextValue>(
    () => ({
      items: [...cart.getItems()],
      itemCount: cart.getItemCount(),
      total: cart.calcularTotal(),
      ready,
      agregar,
      actualizarCantidad,
      eliminar,
      finalizarCompra,
      checkoutMessage,
      checkingOut,
    }),
    [
      agregar,
      actualizarCantidad,
      cart,
      checkoutMessage,
      checkingOut,
      eliminar,
      finalizarCompra,
      ready,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartController(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartController debe usarse dentro de CartProvider');
  return ctx;
}
