// src/components/atoms/InputField.jsx

import React from 'react';

const InputField = ({ id, type = 'text', value, onChange, placeholder, disabled = false }) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
  />
);

export default InputField;
