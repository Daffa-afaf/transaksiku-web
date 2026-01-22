// src/components/molecules/Table.jsx

import React from 'react';

const Root = ({ children }) => (
  <table className="min-w-full divide-y divide-gray-200">{children}</table>
);

const Head = ({ children }) => (
  <thead className="bg-gray-50 text-sm text-gray-600">{children}</thead>
);

const Body = ({ children }) => <tbody className="divide-y divide-gray-100 text-sm text-gray-800">{children}</tbody>;

const Row = ({ children }) => <tr>{children}</tr>;

const Cell = ({ children, align = 'left', header = false, className = '', ...rest }) => {
  const Tag = header ? 'th' : 'td';
  const base = 'px-3 py-2';
  return (
    <Tag className={`${base} ${align === 'right' ? 'text-right' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

export const Table = { Root, Head, Body, Row, Cell };
