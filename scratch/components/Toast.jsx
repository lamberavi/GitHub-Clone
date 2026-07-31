import React from 'react';
import toast from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message, {
    style: {
      border: '1px solid #30363d',
      padding: '12px 16px',
      color: '#e6edf3',
      background: '#0d1117',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: 'bold',
      fontFamily: 'Plus Jakarta Sans, sans-serif'
    },
    iconTheme: {
      primary: '#3FB950',
      secondary: '#0d1117',
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    style: {
      border: '1px solid #30363d',
      padding: '12px 16px',
      color: '#e6edf3',
      background: '#0d1117',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: 'bold',
      fontFamily: 'Plus Jakarta Sans, sans-serif'
    },
    iconTheme: {
      primary: '#F85149',
      secondary: '#0d1117',
    },
  });
};

export default {
  success: showSuccess,
  error: showError
};
