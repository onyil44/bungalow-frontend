import 'react-datepicker/dist/react-datepicker.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/GlobalStyles';
import DatePickerStyles from './styles/DatePickerStyles';
import ReactBigCalenderStyles from './styles/ReactBigCalendarStyles';
import AppLayout from './ui/AppLayout';
import WebPageLayout from './ui/WebPageLayout';
import SpinnerFull from './ui/SpinnerFull';
import ProtectedRoute from './ui/ProtectedRoute';
import ThemeEffect from './features/themes/themeEffect';
import Cabin from './pages/Cabin';
import Restore from './pages/Restore';
import Bootstrapper from './app/Bootstrapper';
import PublicOnlyRoute from './ui/PublicOnlyRoute';
import { useMobileViewportHeightVar } from './hooks/useMobileViewportHeightVar';
import RoleRestrictedPath from './ui/RoleRestrictedPath';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Cabins = lazy(() => import('./pages/Cabins'));
const Settings = lazy(() => import('./pages/Settings'));
const Users = lazy(() => import('./pages/Users'));
const Login = lazy(() => import('./pages/Login'));
const Account = lazy(() => import('./pages/Account'));
const Booking = lazy(() => import('./pages/Booking'));
const NewBooking = lazy(() => import('./pages/NewBooking'));
const Guests = lazy(() => import('./pages/Guests'));
const Guest = lazy(() => import('./pages/Guest'));
const Checkin = lazy(() => import('./pages/Checkin'));
const ActivateAccount = lazy(() => import('./pages/ActivateAccount'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const WebPageHome = lazy(() => import('./pages/WebPageHome'));
const WebPageBungalows = lazy(() => import('./pages/WebPageBungalows'));
const WebPageBungalow = lazy(() => import('./pages/WebPageBungalow'));
const WebPageNewBooking = lazy(() => import('./pages/WebPageNewBooking'));
const WebPageBooking = lazy(() => import('./pages/WebPageBooking'));
const WebPageSearchBungalow = lazy(
  () => import('./pages/WebPageSearchBungalow'),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  useMobileViewportHeightVar();
  return (
    <>
      <Bootstrapper />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <ThemeEffect />
        <DatePickerStyles />
        <ReactBigCalenderStyles />
        <BrowserRouter>
          <Suspense fallback={<SpinnerFull />}>
            <Routes>
              <Route index element={<Navigate replace to="web" />} />
              <Route path="web" element={<WebPageLayout />}>
                <Route index element={<Navigate replace to="homePage" />} />
                <Route path="homePage" element={<WebPageHome />} />
                <Route path="bungalows" element={<WebPageBungalows />} />
                <Route
                  path="bungalows/:bungalowId"
                  element={<WebPageBungalow />}
                />
                <Route path="newBooking" element={<WebPageNewBooking />} />
                <Route path="booking" element={<WebPageBooking />} />
                <Route path="search" element={<WebPageSearchBungalow />} />
              </Route>
              <Route
                path="admin"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="newBooking" element={<NewBooking />} />
                <Route path="guests" element={<Guests />} />
                <Route path="guests/:guestId" element={<Guest />} />
                <Route path="bookings/:bookingId" element={<Booking />} />
                <Route path="checkin/:bookingId" element={<Checkin />} />
                <Route path="cabins" element={<Cabins />} />
                <Route path="cabins/:cabinId" element={<Cabin />} />
                <Route path="settings" element={<Settings />} />
                <Route
                  path="users"
                  element={
                    <RoleRestrictedPath
                      roles={['manager', 'admin', 'superAdmin']}
                    >
                      <Users />
                    </RoleRestrictedPath>
                  }
                />
                <Route path="account" element={<Account />} />
                <Route
                  path="restore"
                  element={
                    <RoleRestrictedPath roles={['superAdmin']}>
                      <Restore />
                    </RoleRestrictedPath>
                  }
                />
              </Route>

              <Route
                path="login"
                element={
                  <PublicOnlyRoute>
                    <Login />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="activateUser/:token"
                element={
                  <PublicOnlyRoute>
                    <ActivateAccount />
                  </PublicOnlyRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: { duration: 5000 },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
