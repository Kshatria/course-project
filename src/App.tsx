import { type ReactNode, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Dashboard, Login, Profile, Registration } from '@/pages';
import { useAuth } from '@/stores/useAuth';
import { LayoutSelector } from './layouts';

type PrivateRouteProps = {
  children: ReactNode;
  isAuth: boolean;
};

const PrivateRoute = ({ children, isAuth }: PrivateRouteProps) => {
  const location = useLocation();

  if (!isAuth) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return children;
};

const PublicRoute = ({ children, isAuth }: PrivateRouteProps) => {
  const location = useLocation();

  if (isAuth) {
    return <Navigate replace state={{ from: location }} to="/dashboard" />;
  }

  return children;
};

const App = () => {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<LayoutSelector isAuthenticated={isAuth} />}>
            <Route
              element={
                <PublicRoute isAuth={isAuth}>
                  <Login />
                </PublicRoute>
              }
              path="/login"
            />
            <Route
              element={
                <PublicRoute isAuth={isAuth}>
                  <Registration />
                </PublicRoute>
              }
              path="/registration"
            />
            <Route
              element={
                <PrivateRoute isAuth={isAuth}>
                  <Dashboard />
                </PrivateRoute>
              }
              path="/dashboard"
            />
            <Route
              element={
                <PrivateRoute isAuth={isAuth}>
                  <Profile />
                </PrivateRoute>
              }
              path="/profile"
            />
            <Route element={<Navigate replace to={isAuth ? '/dashboard' : '/login'} />} path="*" />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export { App };
