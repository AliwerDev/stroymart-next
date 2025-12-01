/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Input from '@/components/fields/Input';
import EyeCloseIcon from '@/components/icons/EyeCloseIcon';
import EyeIcon from '@/components/icons/EyeIcon';
import Button from '@/components/ui/Button';
import { Form, FormField } from '@/components/ui/Form';
import Typography from '@/components/ui/Typography';
import { useCustomMutation } from '@/hooks/useMutation';
import { useRouter } from '@/i18n/navigation';
import request from '@/lib/request';
import { getErrorMessage } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { object, ref, string } from 'yup';

const ResetPasswordPage = () => {
  const t = useTranslations();
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const searchParams = useSearchParams();

  const resolver = yupResolver(
    object({
      password: string().required(t('Поле обязательно')),
      confirm_password:
        string()
          .required(t('Поле обязательно'))
          .oneOf([ref('password')], t('Пароли не совпадают')),
    })
  );

  const form = useForm<any>({
    resolver,
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });
  const router = useRouter();

  const setPasswordMutation = useCustomMutation({
    mutationKey: ['set-new-password'],
    mutationFn: (values: any) => request.post('/user/set-new-password', values),
    onSuccess: () => {
      toast.success(t('Пароль успешно сохранен!'));
      router.push('/auth/login');
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const onFinish = (values: any) => {
    setPasswordMutation.mutate({
      auth_key: searchParams.get('auth_key'),
      password: values.password,
      confirm_password: values.confirm_password,
    });
  };

  return (
    <Form
      form={form}
      onSubmit={onFinish}
      className="w-full max-w-[420px] py-10 px-6 bg-white space-y-10 items-center rounded-[20px]"
    >

      <div className="space-y-2 px-4 text-center">
        <Typography variant="h2-bl-32" color="text-1">
          {t('Создайте пароль')}
        </Typography>
        <Typography variant="subtitle-sm-16" color="text-3" className="max-w-3xs mx-auto">
          {t('Создайте пароль для входа в систему')}
        </Typography>
      </div>

      <div className="w-full">
        <FormField name="password" label={t('Пароль')}>
          <Input
            type={passwordShow ? 'text' : 'password'}
            placeholder={t('Введите пароль')}
            fullWidth
            endIcon={
              <div
                className="cursor-pointer text-text-1"
                onClick={() => setPasswordShow(!passwordShow)}
              >
                {passwordShow ? <EyeCloseIcon /> : <EyeIcon />}
              </div>
            }
          />
        </FormField>
        <FormField name="confirm_password" label={t('Подтвердите пароль')}>
          <Input
            type={confirmPasswordShow ? 'text' : 'password'}
            placeholder={t('Введите пароль')}
            fullWidth
            endIcon={
              <div
                className="cursor-pointer text-text-1"
                onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
              >
                {confirmPasswordShow ? <EyeCloseIcon /> : <EyeIcon />}
              </div>
            }
          />
        </FormField>
      </div>

      <Button
        variant="primary"
        type="submit"
        fullWidth
        disabled={
          setPasswordMutation.isPending
        }
      >
        {t('Отправить')}
      </Button>
    </Form>
  );
};

export default ResetPasswordPage;
