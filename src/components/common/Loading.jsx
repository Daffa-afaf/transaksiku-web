// src/components/common/Loading.jsx

import React from 'react';
import { Loader } from 'lucide-react';

const Loading = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 flex flex-col items-center">
      <Loader className="animate-spin text-blue-500 mb-4" size={48} />
      <p className="text-gray-700 font-medium">Memproses Transfer...</p>
    </div>
  </div>
);

export default Loading;