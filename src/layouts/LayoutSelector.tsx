import { Outlet } from 'react-router-dom';
import { MainLayout, PrivateLayout } from './';

type LayoutSelectorProps = {
  isAuthenticated: boolean | null;
};

const LayoutSelector = ({ isAuthenticated }) => {
  const Layout = isAuthenticated ? PrivateLayout : MainLayout;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export { LayoutSelector };
