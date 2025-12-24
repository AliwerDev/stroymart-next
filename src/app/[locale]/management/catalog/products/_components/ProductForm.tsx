'use client';
import FileUpload from '@/components/common/FileUpload';
import FormLanguageTabs from '@/components/common/FormLanguageTabs';
import TranslatedRichTextEditor from '@/components/common/TranslatedRichTextEditor';
import TranslatedTextInput from '@/components/common/TranslatedTextInput/TranslatedTextInput';
import { categoryApi } from '@/data/category/category.api';
import { Language } from '@/data/common/common.types';
import { LengthTypeEnum, WeightTypeEnum } from '@/data/product/product.types';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { useQuery } from '@tanstack/react-query';
import { Checkbox, Form, FormInstance, Input, InputNumber, Select, Tabs } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface ProductFormProps {
  form: FormInstance;
}

const ProductForm = ({ form }: ProductFormProps) => {
  const t = useTranslations();
  const [activeLang, setActiveLang] = useState<Language>('uzl');
  const [activeTab, setActiveTab] = useState('information');
  const getTranslatedWord = useGetTranslatedWord();

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAll,
  });

  const categoryOptions = categories?.map((cat) => ({
    label: getTranslatedWord(cat, 'name'),
    value: cat.uuid,
  }));

  const items = [
    {
      key: 'information',
      label: t('Information'),
      children: (
        <div className="space-y-4">
          <FormLanguageTabs activeLang={activeLang} onLanguageChange={setActiveLang} />

          <TranslatedTextInput
            name="name"
            label={t('Name')}
            required
            type="input"
            activeLang={activeLang}
          />

          <TranslatedTextInput
            name="shortDescription"
            label={t('Short Description')}
            type="textarea"
            rows={2}
            activeLang={activeLang}
          />

          <TranslatedRichTextEditor
            name="description"
            label={t('Description')}
            height={250}
            activeLang={activeLang}
          />

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={t('Model')}
              name="model"
              rules={[{ required: true, message: t('Required field') }]}
            >
              <Input size="large" placeholder={t('Enter model')} />
            </Form.Item>

            <Form.Item
              label={t('SKU Code')}
              name="skuCode"
              rules={[{ required: true, message: t('Required field') }]}
            >
              <Input size="large" placeholder={t('Enter SKU code')} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={t('Category')}
              name="categoryUuid"
              rules={[{ required: true, message: t('Required field') }]}
            >
              <Select
                size="large"
                options={categoryOptions}
                placeholder={t('Select category')}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item label={t('Seller UUID')} name="sellerUuid">
              <Input size="large" placeholder={t('Enter seller UUID')} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              label={t('Real Price')}
              name="realPrice"
              rules={[{ required: true, message: t('Required field') }]}
            >
              <InputNumber size="large" min={0} className="w-full!" placeholder="0" />
            </Form.Item>

            <Form.Item
              label={t('Quantity')}
              name="quantity"
              rules={[{ required: true, message: t('Required field') }]}
            >
              <InputNumber size="large" min={0} className="w-full!" placeholder="0" />
            </Form.Item>

            <Form.Item label={t('Min Quantity')} name="minQuantity">
              <InputNumber size="large" min={0} className="w-full!" placeholder="0" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label={t('IKPY Code')} name="ikpyCode">
              <InputNumber size="large" min={0} className="w-full!" placeholder="0" />
            </Form.Item>

            <Form.Item name="decStock" valuePropName="checked">
              <Checkbox>{t('Decrease Stock')}</Checkbox>
            </Form.Item>
          </div>
        </div>
      ),
    },
    {
      key: 'parameters',
      label: t('Parameters'),
      children: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label={t('Width')} name="width">
              <InputNumber size="large" min={0} className="w-full!" placeholder="0" />
            </Form.Item>

            <Form.Item label={t('Height')} name="height">
              <InputNumber size="large" min={0} className="w-full!" placeholder="0" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label={t('Length')} name="length">
              <InputNumber size="large" min={0} className="w-full!" placeholder="0" />
            </Form.Item>

            <Form.Item label={t('Length Type')} name="lengthType">
              <Select
                size="large"
                placeholder={t('Select length type')}
                options={[
                  { label: 'MM', value: LengthTypeEnum.MM },
                  { label: 'CM', value: LengthTypeEnum.CM },
                  { label: 'M', value: LengthTypeEnum.M },
                  { label: 'KM', value: LengthTypeEnum.KM },
                ]}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label={t('Weight')} name="weight">
              <InputNumber size="large" min={0} className="w-full!" placeholder="0" />
            </Form.Item>

            <Form.Item label={t('Weight Type')} name="weightType">
              <Select
                size="large"
                placeholder={t('Select weight type')}
                options={[
                  { label: 'GR', value: WeightTypeEnum.GR },
                  { label: 'KG', value: WeightTypeEnum.KG },
                  { label: 'T', value: WeightTypeEnum.T },
                ]}
              />
            </Form.Item>
          </div>
        </div>
      ),
    },
    {
      key: 'images',
      label: t('Images'),
      children: (
        <div className="space-y-4">
          <FileUpload
            name="images"
            label={t('Product Images')}
            required
            accept="image/*"
            maxSize={5}
            listType="picture-card"
            multiple
          />
        </div>
      ),
    },
  ];

  return (
    <Form form={form} layout="vertical" className="bg-white p-6 rounded-lg">
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
    </Form>
  );
};

export default ProductForm;
