'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

const AntdProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#389dd1',
            colorInfo: '#389dd1',
            colorSuccess: '#12b76a',
            colorWarning: '#f79009',
            colorError: '#f04438',
            borderRadius: 6,
            fontFamily:
              'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          },
          components: {
            Button: {
              borderRadius: 8,
              controlHeight: 40,
            },
            Input: {
              borderRadius: 8,
              controlHeight: 40,
            },
            Select: {
              borderRadius: 8,
              controlHeight: 40,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
