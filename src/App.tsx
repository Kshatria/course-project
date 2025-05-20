import { type ReactNode, Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Operation, Categories, Dashboard, Login, Profile, Registration } from '@/pages';
import { Category } from '@/pages/Category';
import { useAuth } from '@/stores/useAuth';
import { LayoutSelector } from './layouts';
import { ToastProvider } from '@/serviсes/ToastContext';

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
    <ToastProvider>
      <HashRouter>
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
                    <Categories />
                  </PrivateRoute>
                }
                path="/categories"
              />
              <Route
                element={
                  <PrivateRoute isAuth={isAuth}>
                    <Operation />
                  </PrivateRoute>
                }
                path="/dashboard/:id"
              />
              <Route
                element={
                  <PrivateRoute isAuth={isAuth}>
                    <Category />
                  </PrivateRoute>
                }
                path="/categories/:id"
              />
              <Route
                element={
                  <PrivateRoute isAuth={isAuth}>
                    <Profile />
                  </PrivateRoute>
                }
                path="/profile"
              />
              <Route
                element={<Navigate replace to={isAuth ? '/dashboard' : '/login'} />}
                path="*"
              />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </ToastProvider>
  );
};

export { App };
