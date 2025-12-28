'use client';

import Button from '@/components/ui/Button';
import { sellerApi } from '@/data/seller/seller.api';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import { getErrorMessage } from '@/lib/utils';
import { Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface SellerInitFormValues {
  phoneNumber: string;
}

const SellerLoginPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const [form] = Form.useForm<SellerInitFormValues>();
  const [loading, setLoading] = useState(false);

  const initMutation = useCustomMutation({
    mutationKey: ['seller-init'],
    mutationFn: async (values: SellerInitFormValues) => {
      return await sellerApi.init({
        phoneNumber: values.phoneNumber,
      });
    },
    onSuccess: (data) => {
      console.log(data);

      toast.success(data.message || t('Код отправлен на ваш номер'));
      sessionStorage.setItem('seller_phone', form.getFieldValue('phoneNumber'));
      router.push('/auth/seller/confirm');
      setLoading(false);
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error));
      setLoading(false);
    },
  });

  const onFinish = (values: SellerInitFormValues) => {
    setLoading(true);
    initMutation.mutate(values);
  };

  return (
    <Form<SellerInitFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="w-full max-w-[420px]"
      requiredMark={false}
    >
      <h2 className="text-slate-900 text-2xl font-bold leading-10 text-center mb-3">
        {t('Аккаунт яратиш')}
      </h2>

      <p className="text-center text-sm text-slate-900/70 mb-8">
        {t('Бизнесшахсга ва тасдиқлаш кодлари телефон ва электрон почтанизга юборилади')}
      </p>

      <Form.Item
        name="phoneNumber"
        rules={[
          { required: true, message: t('Телефон номери керак') },
          {
            pattern: /^\+?[0-9]{9,}$/,
            message: t('Телефон номери нотўғри'),
          },
        ]}
      >
        <Input placeholder={t('Телефон')} type="tel" maxLength={20} />
      </Form.Item>

      <Button
        variant="secondary"
        type="submit"
        className="w-full h-[48px] font-semibold text-base rounded-xl mb-4"
        isLoading={loading}
      >
        {t('Давом этиш')}
      </Button>

      <p className="text-center text-xs text-slate-900/60">
        {t('Тугмани босиш орқали сиз шартномага розилик билдирасиз')}
      </p>
    </Form>
  );
};

export default SellerLoginPage;
