import type { Game, GameCategory } from '../../domain/Game';
import type { IGameRepository } from '../../ports/repositories';
import { config } from '../../infrastructure/config';

interface GameApiResponse {
  Nombre: string;
  Categoria: GameCategory;
  PrecioLicencia: number;
  Tamanio: number;
  cantVendida: number;
  cantDisponible: number;
  Imagen?: string;
}

function mapResponse(data: GameApiResponse): Game {
  return {
    nombre: data.Nombre,
    categoria: data.Categoria,
    precioLicencia: Number(data.PrecioLicencia),
    tamanio: Number(data.Tamanio),
    cantVendida: Number(data.cantVendida),
    cantDisponible: Number(data.cantDisponible),
    imagenBase64: data.Imagen,
  };
}

export class GameHttpAdapter implements IGameRepository {
  private readonly baseUrl: string;

  constructor(baseUrl: string = config.apiBaseUrl) {
    this.baseUrl = baseUrl;
  }

  listFeatured(): Promise<string[]> {
    return Promise.resolve([...config.featuredGames]);
  }

  async getByName(nombre: string): Promise<Game | null> {
    const form = new FormData();
    form.append('nombreJuego', nombre);

    const response = await fetch(`${this.baseUrl}/api/games/info`, {
      method: 'POST',
      body: form,
    });

    if (!response.ok) return null;

    const data = (await response.json()) as GameApiResponse | null;
    if (!data?.Nombre) return null;

    return mapResponse(data);
  }
}
