import { Suspense, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Login, Registration, Dashboard } from '@/pages';
import { LayoutSelector } from './layouts';

interface PrivateRouteProps {
  children: ReactNode;
  isAuth: boolean;
}

const PrivateRoute = ({ children, isAuth }: PrivateRouteProps) => {
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const PublicRoute = ({ children, isAuth }: PrivateRouteProps) => {
  const location = useLocation();

  if (isAuth) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  const isAuth = false;

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<LayoutSelector isAuthenticated={isAuth} />}>
            <Route
              path="/login"
              element={
                <PublicRoute isAuth={isAuth}>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/registration"
              element={
                <PublicRoute isAuth={isAuth}>
                  <Registration />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isAuth={isAuth}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to={isAuth ? '/dashboard' : '/login'} replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
