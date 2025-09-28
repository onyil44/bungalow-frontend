import { Navigate, useLocation } from 'react-router';
import SpinnerFull from './SpinnerFull';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../features/authentication/authSlice';

function ProtectedRoute({ children }) {
  const status = useSelector(selectAuthStatus);
  const location = useLocation();

  if (status === 'unknown' || status === 'refreshing') return <SpinnerFull />;

  if (status === 'guest') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
