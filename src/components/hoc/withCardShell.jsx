// src/components/hoc/withCardShell.jsx

import React from 'react';
import Card from '../molecules/Card';

const withCardShell = (Component, title) => {
  return function WrappedComponent(props) {
    return (
      <Card title={title}>
        <Component {...props} />
      </Card>
    );
  };
};

export default withCardShell;
