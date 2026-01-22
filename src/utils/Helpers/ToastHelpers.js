import React from 'react';
import { createRoot } from 'react-dom/client';
import Toast from '../../components/common/Toast';

export const toastSuccess = (message) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(
    <Toast
      message={message}
      type="success"
      onClose={() => {
        root.unmount();
        document.body.removeChild(container);
      }}
    />
  );
};

export const toastError = (message) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(
    <Toast
      message={message}
      type="error"
      onClose={() => {
        root.unmount();
        document.body.removeChild(container);
      }}
    />
  );
};
