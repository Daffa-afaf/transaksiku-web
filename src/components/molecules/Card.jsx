// src/components/molecules/Card.jsx

import React from 'react';

const Card = ({ title, action, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
    {(title || action) && (
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {action}
      </div>
    )}
    {children}
  </div>
);

export default Card;
