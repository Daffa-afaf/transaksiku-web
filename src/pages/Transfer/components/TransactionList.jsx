// src/pages/Transfer/components/TransactionList.jsx

import React, { useEffect, useMemo, useState } from 'react';
import { Loader, CreditCard } from 'lucide-react';
import TransactionCard from './TransactionCard';

const TransactionList = ({ transactions, pageSize = 6 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [transactions, pageSize]);

  const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize));
  const paged = useMemo(
    () => transactions.slice((page - 1) * pageSize, page * pageSize),
    [transactions, page, pageSize],
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <CreditCard size={48} className="mx-auto mb-3 text-gray-300" />
        <p className="font-medium">Belum ada transaksi</p>
        <p className="text-sm mt-1">Transfer pertama Anda akan muncul di sini</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Menampilkan {paged.length} dari {transactions.length} transaksi
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {paged.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;