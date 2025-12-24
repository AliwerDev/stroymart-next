'use client';
import FileUpload from '@/components/common/FileUpload';
import FormLanguageTabs from '@/components/common/FormLanguageTabs';
import TranslatedTextInput from '@/components/common/TranslatedTextInput/TranslatedTextInput';
import { CategoryStatusEnum, ResCategoryOne } from '@/data/category/category.types';
import { Language } from '@/data/common/common.types';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { Form, FormInstance, InputNumber, Select } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CategoryFormProps {
  form: FormInstance;
  initialData?: ResCategoryOne;
  parentCategories?: ResCategoryOne[];
}

const CategoryForm = ({ form, initialData, parentCategories }: CategoryFormProps) => {
  const t = useTranslations();
  const [activeLang, setActiveLang] = useState<Language>('uzl');
  const getTranslatedWord = useGetTranslatedWord();

  const parentCategoryOptions = parentCategories
    ?.filter((cat) => cat.uuid !== initialData?.uuid)
    .map((cat) => ({
      label: getTranslatedWord(cat, 'name'),
      value: cat.uuid,
    }));

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ status: CategoryStatusEnum.ACTIVE }}
      className="bg-white p-6 rounded-lg"
    >
      <FormLanguageTabs activeLang={activeLang} onLanguageChange={setActiveLang} className="mb-4" />

      <Form.Item label={t('Parent Category')} name="parentCategoryUuid">
        <Select
          size="large"
          options={parentCategoryOptions}
          placeholder={t('Select parent category')}
          allowClear
        />
      </Form.Item>

      <TranslatedTextInput
        name="name"
        label={t('Name')}
        required
        type="input"
        activeLang={activeLang}
      />

      <TranslatedTextInput
        name="description"
        label={t('Description')}
        type="textarea"
        rows={3}
        activeLang={activeLang}
      />

      <TranslatedTextInput
        type="textarea"
        name="contentDescription"
        label={t('Content Description')}
        activeLang={activeLang}
      />

      <TranslatedTextInput
        type="textarea"
        name="ceoContent"
        label={t('CEO Content')}
        activeLang={activeLang}
      />

      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          label={t('Status')}
          name="status"
          rules={[{ required: true, message: t('Required field') }]}
        >
          <Select
            size="large"
            options={[
              { label: 'ACTIVE', value: CategoryStatusEnum.ACTIVE },
              { label: 'INACTIVE', value: CategoryStatusEnum.INACTIVE },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={t('Percent')}
          name="percent"
          rules={[{ required: true, message: t('Required field') }]}
        >
          <InputNumber size="large" min={0} max={100} className="w-full!" />
        </Form.Item>

        <Form.Item label={t('Order Number')} name="orderNumber">
          <InputNumber size="large" min={0} className="w-full!" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FileUpload
          name="iconUrl"
          label={t('Icon')}
          required
          accept="image/*"
          maxSize={2}
          listType="picture-card"
        />

        <FileUpload
          name="bannerUrl"
          label={t('Banner')}
          required
          accept="image/*"
          maxSize={5}
          listType="picture-card"
        />
      </div>
    </Form>
  );
};

export default CategoryForm;
