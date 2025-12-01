import { cn } from '@/lib/utils';
import React from 'react';

const Paper = ({ style, className, children, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn('rounded-2xl w-full bg-white', className)}
      style={{
        ...style,
        boxShadow: '0px 12px 24px -4px #919EAB1F',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Paper;
