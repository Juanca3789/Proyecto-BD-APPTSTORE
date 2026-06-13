export type GameCategory = 'Rompecabezas' | 'Acción' | 'Deporte';

export interface Game {
  nombre: string;
  categoria: GameCategory;
  precioLicencia: number;
  tamanio: number;
  cantVendida: number;
  cantDisponible: number;
  imagenBase64?: string;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatSize(bytes: number): string {
  if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(1)} GB`;
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(0)} MB`;
  return `${bytes} B`;
}
