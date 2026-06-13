import type { Game } from '../domain/Game';

export interface IGameRepository {
  listFeatured(): Promise<string[]>;
  getByName(nombre: string): Promise<Game | null>;
}

export interface IAuthRepository {
  login(nombre: string): Promise<{ user: { id: number; nombre: string } } | null>;
  register(nombre: string): Promise<{ message: string; success: boolean }>;
}

export interface IPurchaseRepository {
  comprar(
    userId: number,
    nombreJuego: string,
    cantidad: number,
    descuento: number,
  ): Promise<{ result: string }>;
}

export interface ICartStorage {
  load(): Promise<import('../domain/Cart').CartItem[]>;
  save(items: import('../domain/Cart').CartItem[]): Promise<void>;
  clear(): Promise<void>;
}

export interface IAuthStorage {
  load(): Promise<{ id: number; nombre: string } | null>;
  save(user: { id: number; nombre: string }): Promise<void>;
  clear(): Promise<void>;
}
