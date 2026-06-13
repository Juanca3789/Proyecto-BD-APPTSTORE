import type { IPurchaseRepository } from '../../ports/repositories';
import { config } from '../../infrastructure/config';

export class PurchaseHttpAdapter implements IPurchaseRepository {
  private readonly baseUrl: string;

  constructor(baseUrl: string = config.apiBaseUrl) {
    this.baseUrl = baseUrl;
  }

  async comprar(
    userId: number,
    nombreJuego: string,
    cantidad: number,
    descuento: number,
  ) {
    const form = new FormData();
    form.append('Id', String(userId));
    form.append('NJuego', nombreJuego);
    form.append('Cantidad', String(cantidad));
    form.append('Descuento', String(descuento));

    const response = await fetch(`${this.baseUrl}/api/purchases`, {
      method: 'POST',
      body: form,
    });

    return (await response.json()) as { result: string };
  }
}
