'use client';
import PageHeader from '@/components/landing/PageHeader';
import { productApi } from '@/data/product/product.api';
import { ReqProductUpdate } from '@/data/product/product.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Spin, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProductForm from '../_components/ProductForm';

export default function EditProductPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const t = useTranslations();
  const router = useRouter();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', uuid],
    queryFn: () => productApi.getOne(uuid),
    enabled: !!uuid,
  });

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  const updateMutation = useMutation({
    mutationFn: (data: ReqProductUpdate) => productApi.update(data),
    onSuccess: () => {
      message.success(t('Product updated successfully'));
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', uuid] });
      router.push('/management/catalog/products');
    },
    onError: () => {
      message.error(t('Failed to update product'));
    },
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      updateMutation.mutate({ ...values, uuid });
    } catch {
      message.error(t('Please fill in all required fields'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Каталог' },
          { label: 'Продукты', href: '/management/catalog/products' },
          { label: 'Редактировать' },
        ]}
        actions={
          <div className="flex gap-2">
            <Button onClick={() => router.back()}>{t('Cancel')}</Button>
            <Button type="primary" loading={updateMutation.isPending} onClick={handleSubmit}>
              {t('Save')}
            </Button>
          </div>
        }
      />

      <div className="mt-4">
        <ProductForm form={form} />
      </div>
    </div>
  );
}
