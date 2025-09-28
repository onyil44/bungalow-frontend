import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../features/authentication/authSlice';
import SpinnerFull from './SpinnerFull';
import { Navigate, useLocation } from 'react-router';

function PublicOnlyRoute({ children }) {
  const status = useSelector(selectAuthStatus);
  const location = useLocation();

  const to = location.state?.from?.pathname ?? '/admin/dashboard';

  if (status === 'unknown' || status === 'refreshing') return <SpinnerFull />;

  if (status === 'authenticated') {
    return <Navigate to={to} replace />;
  }

  return children;
}

export default PublicOnlyRoute;
