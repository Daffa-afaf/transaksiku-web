// src/components/atoms/PrimaryButton.jsx

import React from 'react';

const PrimaryButton = ({ children, onClick, type = 'button', disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
  >
    {children}
  </button>
);

export default PrimaryButton;
