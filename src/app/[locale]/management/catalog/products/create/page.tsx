'use client';
import PageHeader from '@/components/landing/PageHeader';
import { productApi } from '@/data/product/product.api';
import { ReqProductCreate } from '@/data/product/product.types';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import ProductForm from '../_components/ProductForm';

export default function CreateProductPage() {
  const t = useTranslations();
  const router = useRouter();
  const [form] = Form.useForm();

  const createMutation = useMutation({
    mutationFn: (data: ReqProductCreate) => productApi.create(data),
    onSuccess: () => {
      message.success(t('Product created successfully'));
      router.push('/management/catalog/products');
    },
    onError: () => {
      message.error(t('Failed to create product'));
    },
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      createMutation.mutate(values);
    } catch {
      message.error(t('Please fill in all required fields'));
    }
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Каталог' },
          { label: 'Продукты', href: '/management/catalog/products' },
          { label: 'Создать' },
        ]}
        actions={
          <div className="flex gap-2">
            <Button onClick={() => router.back()}>{t('Cancel')}</Button>
            <Button type="primary" loading={createMutation.isPending} onClick={handleSubmit}>
              {t('Create')}
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
