import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { useCartController } from '../../application/controllers';

export function MainLayout() {
  const { itemCount, ready } = useCartController();

  return (
    <div className="app-shell min-h-screen pt-[52px]">
      <Header cartCount={ready ? itemCount : 0} />
      <Outlet />
      <Footer />
    </div>
  );
}
