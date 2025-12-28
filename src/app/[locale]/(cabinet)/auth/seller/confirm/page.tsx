'use client';

import Button from '@/components/ui/Button';
import { sellerApi } from '@/data/seller/seller.api';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import { Form, Input } from 'antd';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface SellerConfirmFormValues {
  phoneNumber: string;
  code: string;
}

const SellerConfirmPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const [form] = Form.useForm<SellerConfirmFormValues>();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Get phone number from session storage
    const storedPhone = sessionStorage.getItem('seller_phone');
    if (!storedPhone) {
      router.push('/auth/seller/login');
      return;
    }
    setPhoneNumber(storedPhone);
    form.setFieldValue('phoneNumber', storedPhone);
  }, [form, router]);

  const confirmMutation = useCustomMutation({
    mutationKey: ['seller-confirm'],
    mutationFn: async (values: SellerConfirmFormValues) => {
      return await sellerApi.confirm({
        phoneNumber: values.phoneNumber,
        code: values.code,
      });
    },
    onSuccess: async (data) => {
      toast.success(data.message || t('Аккаунт яратилди'));

      // Sign in with seller credentials
      const result = await signIn('credentials', {
        username: phoneNumber,
        password: form.getFieldValue('code'),
        redirect: false,
        user_type: 'seller',
      });

      if (result?.ok) {
        sessionStorage.removeItem('seller_phone');
        router.push('/dashboard');
      } else {
        toast.error(t('Кириш муаммо'));
      }
      setLoading(false);
    },
    onError: (error: Error) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (error as any)?.response?.data?.message || t('Кодни тасдиқлаш муаммо');
      toast.error(errorMessage);
      setLoading(false);
    },
  });

  const onFinish = (values: SellerConfirmFormValues) => {
    setLoading(true);
    confirmMutation.mutate(values);
  };

  return (
    <Form<SellerConfirmFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="w-full max-w-[420px]"
      requiredMark={false}
    >
      <h2 className="text-slate-900 text-2xl font-bold leading-10 text-center mb-3">
        {t('СМС дари тасдиқлаш кодни киритинг')}
      </h2>

      <p className="text-center text-sm text-slate-900/70 mb-8">
        {t('Тасдиқлаш коди рақамга юборилди.')}
        <br />
        <span className="font-semibold">{phoneNumber}</span>
      </p>

      <Form.Item name="phoneNumber" hidden>
        <Input type="hidden" />
      </Form.Item>

      <Form.Item
        name="code"
        rules={[
          { required: true, message: t('Кодни киритинг') },
          {
            pattern: /^[0-9]{4,6}$/,
            message: t('Код 4-6 та рақамдан иборат бўлиши керак'),
          },
        ]}
      >
        <Input placeholder={t('Тасдиқлаш коди')} type="text" maxLength={6} inputMode="numeric" />
      </Form.Item>

      <Button
        variant="secondary"
        type="submit"
        className="w-full h-[48px] font-semibold text-base rounded-xl mb-4"
        isLoading={loading}
      >
        {t('Тасдиқлаш')}
      </Button>

      <div className="flex justify-between items-center text-xs text-slate-900/60">
        <span>{t('Янги кодни сўраш')}</span>
        <button
          onClick={() => router.push('/auth/seller/login')}
          className="text-primary hover:text-primary/80 bg-transparent border-none cursor-pointer"
        >
          {t('Орқага')}
        </button>
      </div>
    </Form>
  );
};

export default SellerConfirmPage;
