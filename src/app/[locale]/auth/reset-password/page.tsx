/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Show from '@/components/common/Show';
import Input, { OTPInput } from '@/components/fields/Input';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { object, ref, string } from 'yup';

const ResetPasswordPage = () => {
  const t = useTranslations();
  const [step, setStep] = useState<'email' | 'otp' | 'password'>('email');
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const resolver = yupResolver(
    object({
      email:
        step === 'email'
          ? string().required(t('Поле обязательно')).email(t('Неверный формат'))
          : string().optional(),
      code: step === 'otp' ? string().required(t('Поле обязательно')) : string().optional(),
      password:
        step === 'password' ? string().required(t('Поле обязательно')) : string().optional(),
      confirm_password:
        step === 'password'
          ? string()
            .required(t('Поле обязательно'))
            .oneOf([ref('password')], t('Пароли не совпадают'))
          : string().optional(),
    })
  );

  const form = useForm<any>({
    resolver,
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirm_password: '',
    },
  });

  console.log(form.getValues(), form.formState.errors);

  const router = useRouter();

  const sendEmailMutation = useCustomMutation({
    mutationKey: ['reset-password-send-email'],
    mutationFn: (values: any) => request.post('/user/reset-password-send-email', values),
    onSuccess: () => {
      toast.success(t('Письмо отправлено!'));
      setStep('otp');
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const sendOtpMutation = useCustomMutation({
    mutationKey: ['check-reset-password'],
    mutationFn: (values: any) => request.post('/user/check-reset-password', values),
    onSuccess: ({ data }) => {
      setAccessToken(data.result);
      setStep('password');
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const sendPasswordMutation = useCustomMutation({
    mutationKey: ['reset-password'],
    mutationFn: (values: any) =>
      request.post('/user/reset-password', values, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    onSuccess: () => {
      toast.success(t('Пароль успешно сохранен!'));
      router.push('/auth/login');
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const onFinish = (values: any) => {
    if (step === 'email') {
      sendEmailMutation.mutate({
        email: values.email,
      });
    } else if (step === 'otp') {
      sendOtpMutation.mutate({
        email: values.email,
        code: values.code,
      });
    } else {
      sendPasswordMutation.mutate({
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
      });
    }
  };

  return (
    <Form
      form={form}
      onSubmit={onFinish}
      className="w-full max-w-[420px] py-10 px-6 bg-white space-y-10 items-center rounded-[20px]"
    >
      <Show when={step === 'email'}>
        <div className="space-y-2 px-4 text-center">
          <Typography variant="h2-bl-32" color="text-1">
            {t('Забыли пароль?')}
          </Typography>
          <Typography variant="subtitle-sm-16" color="text-3">
            {t('Введите ваш логин или электронную почту для восстановления пароля')}
          </Typography>
        </div>

        <div className="w-full">
          <FormField name="email" label={t('Электронная почта')} required>
            <Input placeholder={t('Введите электронную почту')} className="w-full" type="text" />
          </FormField>
        </div>
      </Show>

      <Show when={step === 'otp'}>
        <div className="space-y-2 text-center">
          <Typography variant="h2-bl-32" color="text-1">
            {t('Проверьте свою почту')}
          </Typography>
          <Typography variant="subtitle-sm-16" color="text-3">
            {t('Мы отправили ссылку для сброса пароля на адрес {email}', {
              email: form.getValues('email')!,
            })}
          </Typography>
        </div>

        <div className="w-full">
          <FormField name="code" required>
            <OTPInput length={5} />
          </FormField>
        </div>
      </Show>

      <Show when={step === 'password'}>
        <div className="space-y-2 text-center">
          <Typography variant="h2-bl-32" color="text-1">
            {t('Создайте новый пароль')}
          </Typography>
          <Typography variant="subtitle-sm-16" color="text-3">
            {t('Создайте новый пароль для входа в систему')}
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
      </Show>

      <Button
        variant="primary"
        type="submit"
        fullWidth
        disabled={
          sendEmailMutation.isPending || sendOtpMutation.isPending || sendPasswordMutation.isPending
        }
      >
        {t('Отправить')}
      </Button>
    </Form>
  );
};

export default ResetPasswordPage;
