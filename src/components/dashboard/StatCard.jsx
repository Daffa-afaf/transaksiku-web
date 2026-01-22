// src/components/dashboard/StatCard.jsx

import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, bgColor = 'bg-blue-50', iconColor = 'text-blue-600', trend }) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${
              trend.type === 'up' ? 'text-green-600' : trend.type === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trend.type === 'up' && '↑'}
              {trend.type === 'down' && '↓'}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`${bgColor} p-3 rounded-lg`}>
            <Icon className={`${iconColor}`} size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
