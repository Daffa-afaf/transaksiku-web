// src/pages/Transfer/components/TransactionCard.jsx

import React from 'react';
import { Clock, CreditCard, MessageSquare, CheckCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '../../../utils/dummyData';

const TransactionCard = ({ transaction }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      {/* Header: ID & Status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">{transaction.id}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            transaction.status === 'Berhasil' 
              ? 'bg-green-100 text-green-600' 
              : 'bg-yellow-100 text-yellow-600'
          }`}>
            {transaction.status}
          </span>
        </div>
        <CheckCircle size={18} className="text-green-500" />
      </div>

      {/* Tanggal */}
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <Clock size={16} />
        <span>{formatDate(transaction.date || transaction.tanggal)}</span>
      </div>
      
      {/* Rekening Tujuan & Nominal */}
      <div className="flex items-start justify-between mb-3 pb-3 border-b">
        <div className="flex items-center gap-2">
          <CreditCard size={18} className="text-blue-500" />
          <div>
            <p className="text-xs text-gray-500">Tujuan</p>
            <p className="font-medium text-gray-800">
              {transaction.accountName || transaction.tujuan}
            </p>
            {transaction.accountNumber && (
              <p className="text-xs text-gray-500">{transaction.accountNumber}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Nominal</p>
          <p className="font-bold text-green-600">
            {formatCurrency(transaction.amount || transaction.nominal)}
          </p>
        </div>
      </div>
      
      {/* Catatan */}
      {(transaction.message || transaction.catatan) && (
        <div className="flex items-start gap-2">
          <MessageSquare size={16} className="text-gray-400 mt-1" />
          <div>
            <p className="text-xs text-gray-500">Catatan</p>
            <p className="text-sm text-gray-700">
              {transaction.message || transaction.catatan}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;