import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './application/AppContext';
import { AuthProvider } from './application/AuthContext';
import { CartProvider } from './application/CartContext';
import { MainLayout } from './presentation/layouts/MainLayout';
import { CatalogPage } from './presentation/pages/CatalogPage';
import { ProductPage } from './presentation/pages/ProductPage';
import { CartPage } from './presentation/pages/CartPage';

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<CatalogPage />} />
                <Route path="producto/:nombre" element={<ProductPage />} />
                <Route path="carrito" element={<CartPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </AppProvider>
  );
}
