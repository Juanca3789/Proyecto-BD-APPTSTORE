import { createContext, useContext, type ReactNode } from 'react';
import { AuthHttpAdapter } from '../adapters/http/AuthHttpAdapter';
import { GameHttpAdapter } from '../adapters/http/GameHttpAdapter';
import { PurchaseHttpAdapter } from '../adapters/http/PurchaseHttpAdapter';
import { SessionAuthStorage } from '../adapters/storage/SessionAuthStorage';
import { SessionCartStorage } from '../adapters/storage/SessionCartStorage';
import type {
  IAuthRepository,
  IAuthStorage,
  ICartStorage,
  IGameRepository,
  IPurchaseRepository,
} from '../ports/repositories';

export interface AppDependencies {
  gameRepository: IGameRepository;
  authRepository: IAuthRepository;
  purchaseRepository: IPurchaseRepository;
  cartStorage: ICartStorage;
  authStorage: IAuthStorage;
}

const defaultDependencies: AppDependencies = {
  gameRepository: new GameHttpAdapter(),
  authRepository: new AuthHttpAdapter(),
  purchaseRepository: new PurchaseHttpAdapter(),
  cartStorage: new SessionCartStorage(),
  authStorage: new SessionAuthStorage(),
};

const AppContext = createContext<AppDependencies>(defaultDependencies);

export function AppProvider({
  children,
  dependencies = defaultDependencies,
}: {
  children: ReactNode;
  dependencies?: AppDependencies;
}) {
  return (
    <AppContext.Provider value={dependencies}>{children}</AppContext.Provider>
  );
}

export function useDependencies(): AppDependencies {
  return useContext(AppContext);
}
