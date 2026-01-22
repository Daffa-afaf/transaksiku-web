// src/components/atoms/ToggleSwitch.jsx

import React from 'react';

const ToggleSwitch = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <span className="text-sm text-gray-700">{label}</span>
    <div className={`w-11 h-6 flex items-center rounded-full p-1 transition ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}>
      <div
        className={`bg-white w-4 h-4 rounded-full shadow transform transition ${checked ? 'translate-x-5' : ''}`}
      />
    </div>
    <input
      type="checkbox"
      className="hidden"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  </label>
);

export default ToggleSwitch;
