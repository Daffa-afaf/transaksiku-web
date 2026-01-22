// src/components/molecules/FormField.jsx

import React from 'react';

const FormField = ({ label, description, error, children }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <label className="text-sm font-semibold text-gray-800">{label}</label>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default FormField;
