import React from 'react';

const withTitle = (str) => (
  <span title={str}>{str.length > 50 ? str.substr(0, 50) + '...' : str}</span>
);

export default withTitle;
