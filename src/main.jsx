import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import GlobalStyles from './styles/GlobalStyles.js';
import ErrorFallback from './ui/ErrorFallback.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace('/')}
      >
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
);
