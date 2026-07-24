import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from '../lib/redux/store';
import { AuthProvider } from '../lib/context/AuthContext';
import { AppearanceProvider } from '../lib/context/AppearanceContext';
import AppRoutes from '../lib/routes/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <AppearanceProvider>
            <AppRoutes />
            <Toaster 
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#161b22',
                  color: '#e6edf3',
                  border: '1px solid #30363d',
                  fontSize: '13px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif'
                }
              }}
            />
          </AppearanceProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
