export interface CartItem {
  nombreJuego: string;
  cantidad: number;
  precioUnitario: number;
}

export class Cart {
  private readonly items: CartItem[];

  constructor(items: CartItem[] = []) {
    this.items = items;
  }

  getItems(): readonly CartItem[] {
    return this.items;
  }

  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.cantidad, 0);
  }

  calcularTotal(): number {
    return this.items.reduce(
      (sum, item) => sum + item.precioUnitario * item.cantidad,
      0,
    );
  }

  agregar(nombreJuego: string, cantidad: number, precioUnitario: number): Cart {
    const existing = this.items.find((i) => i.nombreJuego === nombreJuego);
    if (existing) {
      return new Cart(
        this.items.map((i) =>
          i.nombreJuego === nombreJuego
            ? { ...i, cantidad: i.cantidad + cantidad }
            : i,
        ),
      );
    }
    return new Cart([...this.items, { nombreJuego, cantidad, precioUnitario }]);
  }

  actualizarCantidad(nombreJuego: string, cantidad: number): Cart {
    if (cantidad <= 0) return this.eliminar(nombreJuego);
    return new Cart(
      this.items.map((i) =>
        i.nombreJuego === nombreJuego ? { ...i, cantidad } : i,
      ),
    );
  }

  eliminar(nombreJuego: string): Cart {
    return new Cart(this.items.filter((i) => i.nombreJuego !== nombreJuego));
  }

  vaciar(): Cart {
    return new Cart();
  }
}
