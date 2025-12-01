import React from 'react';

const Hide = ({ when, children }: { when: boolean; children: React.ReactNode }) => {
  return <>{!when && children}</>;
};

export default Hide;
