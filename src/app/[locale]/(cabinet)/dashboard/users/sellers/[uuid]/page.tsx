'use client';

import PageHeader from '@/components/landing/PageHeader';
import { sellerApi } from '@/data/seller/seller.api';
import { ResSellerOne, SellerStatusEnum } from '@/data/seller/seller.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Card, Checkbox, Form, Input, Select, Spin, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SellerDetailPage() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const uuid = params.uuid as string;

  const { data: seller, isLoading } = useQuery({
    queryKey: ['seller', uuid],
    queryFn: () => sellerApi.getById(uuid),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<ResSellerOne>) => sellerApi.update(uuid, data),
    onSuccess: () => {
      message.success(t('Seller updated successfully'));
      queryClient.invalidateQueries({ queryKey: ['sellers'] });
      queryClient.invalidateQueries({ queryKey: ['seller', uuid] });
    },
    onError: () => {
      message.error(t('Failed to update seller'));
    },
  });

  useEffect(() => {
    if (seller) {
      form.setFieldsValue({
        fullName: seller.fullName,
        phoneNumber: seller.phoneNumber,
        companyName: seller.companyName,
        inn: seller.inn,
        requisite: seller.requisite,
        userStatus: seller.userStatus,
        nds: seller.nds,
        yatt: seller.yatt,
        isMonthlyCalculation: seller.isMonthlyCalculation,
      });
    }
  }, [seller, form]);

  const handleSubmit = (values: Partial<ResSellerOne>) => {
    updateMutation.mutate(values);
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: t('Users') },
          { label: t('Sellers') },
          { label: seller?.companyName || seller?.fullName || 'Seller' },
        ]}
      />

      <div className="mt-4">
        <Card>
          <Form form={form} layout="vertical" onFinish={handleSubmit} className="max-w-2xl">
            <Form.Item
              label={t('Full Name')}
              name="fullName"
              rules={[{ required: true, message: t('Please enter full name') }]}
            >
              <Input placeholder={t('Full Name')} />
            </Form.Item>

            <Form.Item
              label={t('Company Name')}
              name="companyName"
              rules={[{ required: true, message: t('Please enter company name') }]}
            >
              <Input placeholder={t('Company Name')} />
            </Form.Item>

            <Form.Item
              label={t('Phone')}
              name="phoneNumber"
              rules={[{ required: true, message: t('Please enter phone number') }]}
            >
              <Input placeholder={t('Phone Number')} disabled />
            </Form.Item>

            <Form.Item
              label={t('INN')}
              name="inn"
              rules={[{ required: true, message: t('Please enter INN') }]}
            >
              <Input placeholder={t('INN')} />
            </Form.Item>

            <Form.Item label={t('Requisite')} name="requisite">
              <Input.TextArea placeholder={t('Requisite')} rows={3} />
            </Form.Item>

            <Form.Item
              label={t('Status')}
              name="userStatus"
              rules={[{ required: true, message: t('Please select status') }]}
            >
              <Select
                options={[
                  { label: t('Active'), value: SellerStatusEnum.ACTIVE },
                  { label: t('Inactive'), value: SellerStatusEnum.INACTIVE },
                  { label: t('Blocked'), value: SellerStatusEnum.BLOCKED },
                ]}
              />
            </Form.Item>

            <Form.Item name="nds" valuePropName="checked">
              <Checkbox>{t('NDS')}</Checkbox>
            </Form.Item>

            <Form.Item name="yatt" valuePropName="checked">
              <Checkbox>{t('YATT')}</Checkbox>
            </Form.Item>

            <Form.Item name="isMonthlyCalculation" valuePropName="checked">
              <Checkbox>{t('Monthly Calculation')}</Checkbox>
            </Form.Item>

            <Form.Item>
              <div className="flex gap-2">
                <Button type="primary" htmlType="submit" loading={updateMutation.isPending}>
                  {t('Save')}
                </Button>
                <Button onClick={() => router.back()}>{t('Cancel')}</Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
