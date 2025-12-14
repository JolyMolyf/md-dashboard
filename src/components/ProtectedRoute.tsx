import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  // TODO: Replace with actual authentication logic (e.g., check context or token)
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
