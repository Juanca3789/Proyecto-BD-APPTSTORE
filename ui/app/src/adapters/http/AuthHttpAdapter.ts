import type { IAuthRepository } from '../../ports/repositories';
import { config } from '../../infrastructure/config';

export class AuthHttpAdapter implements IAuthRepository {
  private readonly baseUrl: string;

  constructor(baseUrl: string = config.apiBaseUrl) {
    this.baseUrl = baseUrl;
  }

  async login(nombre: string) {
    const form = new FormData();
    form.append('Nombre', nombre);

    const response = await fetch(`${this.baseUrl}/api/auth/login`, {
      method: 'POST',
      body: form,
    });

    const data = await response.json();

    if (data?.Id && data?.Nombre) {
      return { user: { id: Number(data.Id), nombre: String(data.Nombre) } };
    }

    return null;
  }

  async register(nombre: string) {
    const form = new FormData();
    form.append('Nombre', nombre);

    const response = await fetch(`${this.baseUrl}/api/auth/register`, {
      method: 'POST',
      body: form,
    });

    const data = await response.json();
    const message = String(data?.result ?? data?.message ?? 'Error desconocido');
    const success = message.toLowerCase().includes('correctamente');

    return { message, success };
  }
}
