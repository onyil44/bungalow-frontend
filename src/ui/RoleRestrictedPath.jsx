import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../features/authentication/authSlice';
import { useCurrentUser } from '../features/authentication/useCurrentUser';
import SpinnerFull from './SpinnerFull';
import { Navigate, useLocation } from 'react-router';

function RoleRestrictedPath({ roles, children }) {
  const status = useSelector(selectAuthStatus);
  const location = useLocation();
  const { user: currentUser, isLoading: isCurrentUserLoading } =
    useCurrentUser();

  if (status === 'refreshing' || isCurrentUserLoading) return <SpinnerFull />;

  if (status !== 'authenticated')
    return <Navigate to="/login" replace state={{ from: location }} />;

  if (status === 'authenticated' && !roles.includes(currentUser.role))
    return <Navigate to="/admin/dashboard" replace />;

  return children;
}

export default RoleRestrictedPath;
