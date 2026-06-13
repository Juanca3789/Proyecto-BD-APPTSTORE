import type { IAuthStorage } from '../../ports/repositories';

const ID_KEY = 'apptstore_user_id';
const NAME_KEY = 'apptstore_user_name';

export class SessionAuthStorage implements IAuthStorage {
  async load() {
    const id = sessionStorage.getItem(ID_KEY);
    const nombre = sessionStorage.getItem(NAME_KEY);
    if (!id || !nombre) return null;
    return { id: Number(id), nombre };
  }

  async save(user: { id: number; nombre: string }): Promise<void> {
    sessionStorage.setItem(ID_KEY, String(user.id));
    sessionStorage.setItem(NAME_KEY, user.nombre);
  }

  async clear(): Promise<void> {
    sessionStorage.removeItem(ID_KEY);
    sessionStorage.removeItem(NAME_KEY);
  }
}
