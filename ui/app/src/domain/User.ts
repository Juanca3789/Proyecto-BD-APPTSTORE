export interface User {
  id: number;
  nombre: string;
}

export interface AuthSession {
  user: User;
}
