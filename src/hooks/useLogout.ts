'use client';

import { Modal } from 'antd';
import { signOut } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

export function useLogout() {
  const t = useTranslations();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  const logout = () => {
    Modal.confirm({
      title: t('Выход'),
      content: t('Вы уверены, что хотите выйти?'),
      okText: t('Выход'),
      cancelText: t('Отмена'),
      okType: 'danger',
      centered: true,
      okButtonProps: {
        loading,
      },
      onOk: async () => {
        setLoading(true);
        try {
          await signOut({ redirect: false });
        } finally {
          window.location.href = `/${locale}/auth/login`;
          setLoading(false);
        }
      },
    });
  };

  return { logout, loading };
}
