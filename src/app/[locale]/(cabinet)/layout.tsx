import MainProvider from '@/providers/MainProvider';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return <MainProvider>{children}</MainProvider>;
};

export default layout;
