// src/components/atoms/AvatarUploader.jsx

import React from 'react';

const AvatarUploader = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={value || 'https://via.placeholder.com/64'}
        alt="Avatar"
        className="w-14 h-14 rounded-full object-cover border"
      />
      <div className="space-y-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Link foto profil"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500">Gunakan URL gambar publik.</p>
      </div>
    </div>
  );
};

export default AvatarUploader;
