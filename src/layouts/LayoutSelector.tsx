import { Outlet } from 'react-router-dom';
import { MainLayout, PrivateLayout } from './';

const LayoutSelector = () => {
  const isAuthenticated = true;

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  const Layout = isAuthenticated ? PrivateLayout : MainLayout;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export { LayoutSelector };
