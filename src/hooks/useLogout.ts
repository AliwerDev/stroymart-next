'use client';

import { signOut } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useConfirm } from './useConfirm';

export function useLogout() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const { confirm } = useConfirm();

  const logout = async () => {
    await confirm({
      title: t('Выход'),
      message: t('Вы уверены, что хотите выйти?'),
      confirmText: t('Выход'),
      cancelText: t('Отмена'),
      variant: 'warning',
      onConfirm: async () => {
        setLoading(true);
        try {
          await signOut({ redirect: false });
          window.location.href = `/${locale}/auth/login`;
        } catch {
          window.location.href = `/${locale}/auth/login`;
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return { logout, loading };
}
