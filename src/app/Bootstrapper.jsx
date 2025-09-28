import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthStatus,
  setAuthenticated,
  setGuest,
  setRefreshing,
} from '../features/authentication/authSlice';
import { useEffect } from 'react';
import { refreshTokenOnce } from '../services/refreshTokenOnce';

function Bootstrapper() {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);

  useEffect(() => {
    if (status !== 'unknown') return;

    (async () => {
      dispatch(setRefreshing());
      try {
        const token = await refreshTokenOnce();
        if (token) dispatch(setAuthenticated({ accessToken: token }));
        else dispatch(setGuest());
      } catch {
        dispatch(setGuest());
      }
    })();
  }, [status, dispatch]);

  return null;
}

export default Bootstrapper;
