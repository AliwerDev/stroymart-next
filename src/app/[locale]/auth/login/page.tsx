'use client';

import EyeCloseIcon from '@/components/icons/EyeCloseIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import { Form, FormField, Label } from '@/components/ui/Form';
import { useCustomMutation } from '@/hooks/useMutation';
import { Link, useRouter } from '@/i18n/navigation';
import { LoginFormValues } from '@/types/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Typography } from 'antd';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

const LoginPage = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const scheme = yup.object().shape({
    username: yup.string().required(t('Логин не может быть пустым')),
    password: yup.string().required(t('Пароль не может быть пустым')),
  });

  const form = useForm<LoginFormValues>({
    resolver: yupResolver(scheme),
    defaultValues: {
      username: '',
      password: '',
    },
  });

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
    onSuccess: async () => {
      toast.success(t('Вход выполнен успешно!'));
      router.push('/dashboard');
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      toast.error(t('Логин или пароль неверны!'));
    },
  });

  const onFinish = (values: LoginFormValues) => {
    setLoading(true);
    loginMutation.mutate(values);
  };

  return (
    <Form
      form={form}
      onSubmit={onFinish}
      className="w-full max-w-[420px] py-10 px-6 bg-white space-y-10 items-center rounded-[20px]"
    >
      <Typography className="text-center" color="text-1">
        {t('Вход в систему')}
      </Typography>

      <div className="w-full space-y-5">
        <FormField name="username" label={t('Логин')}>
          <Input placeholder={t('Введите логин')} type="text" />
        </FormField>

        <FormField
          name="password"
          label={t('Пароль')}
          helperText={
            <div className="flex justify-end">
              <Link href="/auth/reset-password">
                <Label
                  label={t('Забыли пароль?')}
                  className="cursor-pointer mt-1"
                  labelRequired={false}
                />
              </Link>
            </div>
          }
        >
          <Input
            type={passwordShow ? 'text' : 'password'}
            placeholder={t('Введите пароль')}
            suffix={
              <div
                className="cursor-pointer text-text-1"
                onClick={() => setPasswordShow(!passwordShow)}
              >
                {passwordShow ? <EyeCloseIcon /> : <EyeIcon />}
              </div>
            }
          />
        </FormField>
      </div>

      <Button htmlType="submit" className="w-full" type="primary" disabled={loading}>
        {t('Войти')}
      </Button>
    </Form>
  );
};

export default LoginPage;
