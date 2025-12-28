'use client';

import EyeCloseIcon from '@/components/icons/EyeCloseIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import Button from '@/components/ui/Button';
import { useCustomMutation } from '@/hooks/useMutation';
import { Link, useRouter } from '@/i18n/navigation';
import { LoginFormValues } from '@/types/user';
import { Form, Input } from 'antd';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const [form] = Form.useForm<LoginFormValues>();
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginMutation = useCustomMutation({
    mutationKey: ['login'],
    mutationFn: async (values: LoginFormValues) => {
      const response = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (!response?.ok) throw new Error('Login failed');
      return response;
    },
    onSuccess: () => {
      toast.success(t('Вход выполнен успешно!'));
      router.push('/dashboard');
      setLoading(false);
    },
    onError: () => {
      toast.error(t('Логин или пароль неверны!'));
      setLoading(false);
    },
  });

  const onFinish = (values: LoginFormValues) => {
    console.log(values);

    setLoading(true);
    loginMutation.mutate(values);
  };

  return (
    <Form<LoginFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="w-full max-w-[420px]"
      requiredMark={false}
    >
      <h2 className="text-slate-900 text-2xl font-bold leading-10 text-center mb-10">
        {t('Вход в систему')}
      </h2>

      <Form.Item
        name="username"
        rules={[{ required: true, message: t('Логин не может быть пустым') }]}
      >
        <Input placeholder={t('Логин')} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: t('Пароль не может быть пустым') }]}
        extra={
          <div className="flex justify-end">
            <Link href="/auth/reset-password">
              <span className="cursor-pointer text-xs text-text-1 hover:underline">
                {t('Забыли пароль?')}
              </span>
            </Link>
          </div>
        }
      >
        <Input
          type={passwordShow ? 'text' : 'password'}
          placeholder={t('Пароль')}
          suffix={
            <span
              className="cursor-pointer text-text-1"
              onClick={() => setPasswordShow(!passwordShow)}
            >
              {passwordShow ? <EyeCloseIcon /> : <EyeIcon />}
            </span>
          }
        />
      </Form.Item>

      <Button
        variant="secondary"
        type="submit"
        className="w-full h-[48px] font-semibold text-base rounded-xl mb-4"
        isLoading={loading}
      >
        {t('Войти')}
      </Button>

      <p className="text-center text-sm leading-6 text-slate-900/70">
        Тугмани босиш орқали сиз{' '}
        <Link href="/offer" className="text-primary underline hover:text-primary/80">
          Оферта шартномаси
        </Link>{' '}
        ва{' '}
        <Link href="/privacy-policy" className="text-primary underline hover:text-primary/80">
          Махфийлик сиёсати
        </Link>{' '}
        га розилик билдирасиз
      </p>
    </Form>
  );
};

export default LoginPage;
