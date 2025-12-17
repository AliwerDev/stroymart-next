'use client';
import FormLanguageTabs from '@/components/common/FormLanguageTabs';
import TranslatedTextInput from '@/components/common/TranslatedTextInput/TranslatedTextInput';
import { Language } from '@/data/common/common.types';
import { filterGroupApi } from '@/data/filter-group/filter-group.api';
import { filterApi } from '@/data/filter/filter.api';
import { ReqFilterCreate, ReqFilterUpdate } from '@/data/filter/filter.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Input, InputNumber, Modal, Select, Spin, message } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface AddEditFilterModalProps {
  open: boolean;
  onClose: () => void;
  filterUuid?: string;
  filterGroupUuid?: string;
}

const AddEditFilterModal = ({
  open,
  onClose,
  filterUuid,
  filterGroupUuid: initialFilterGroupUuid,
}: AddEditFilterModalProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [activeLang, setActiveLang] = useState<Language>('uzl');

  const isEdit = !!filterUuid;

  const { data: filterData, isLoading: isLoadingFilter } = useQuery({
    queryKey: ['filter', filterUuid],
    queryFn: () => filterApi.getOne(filterUuid!),
    enabled: isEdit && open,
  });

  const { data: filterGroups } = useQuery({
    queryKey: ['filter-groups'],
    queryFn: filterGroupApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: ReqFilterCreate) => filterApi.create(data),
    onSuccess: () => {
      message.success(t('Filter created successfully'));
      queryClient.invalidateQueries({ queryKey: ['filters'] });
      onClose();
      form.resetFields();
    },
    onError: () => {
      message.error(t('Failed to create filter'));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ReqFilterUpdate) => filterApi.update(data),
    onSuccess: () => {
      message.success(t('Filter updated successfully'));
      queryClient.invalidateQueries({ queryKey: ['filters'] });
      queryClient.invalidateQueries({ queryKey: ['filter', filterUuid] });
      onClose();
    },
    onError: () => {
      message.error(t('Failed to update filter'));
    },
  });

  useEffect(() => {
    if (filterData && open) {
      form.setFieldsValue({
        name_uzl: filterData.name?.uzl,
        name_uzc: filterData.name?.uzc,
        name_ru: filterData.name?.ru,
        iconUrl: filterData.iconUrl,
        orderNumber: filterData.orderNumber,
        filterGroupUuid: filterData.filterGroupUuid,
      });
    } else if (!open) {
      form.resetFields();
    } else if (open && !isEdit && initialFilterGroupUuid) {
      form.setFieldsValue({
        filterGroupUuid: initialFilterGroupUuid,
      });
    }
  }, [filterData, open, form, isEdit, initialFilterGroupUuid]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        name: {
          uzl: values.name_uzl,
          uzc: values.name_uzc,
          ru: values.name_ru,
        },
        iconUrl: values.iconUrl || '',
        orderNumber: values.orderNumber || 0,
        filterGroupUuid: values.filterGroupUuid,
      };

      if (isEdit) {
        updateMutation.mutate({ ...payload, uuid: filterUuid });
      } else {
        createMutation.mutate(payload);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const filterGroupOptions = filterGroups?.data.map((group) => ({
    label: locale === 'uz' ? group.name.uzl : group.name.ru,
    value: group.uuid,
  }));

  return (
    <Modal
      title={isEdit ? t('Edit Filter') : t('Add Filter')}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={createMutation.isPending || updateMutation.isPending}
      width={800}
      okText={isEdit ? t('Update') : t('Create')}
      cancelText={t('Cancel')}
    >
      <Spin spinning={isEdit && isLoadingFilter}>
        <Form form={form} layout="vertical">
          <FormLanguageTabs
            activeLang={activeLang}
            onLanguageChange={setActiveLang}
            className="mb-4"
          />

          <TranslatedTextInput
            name="name"
            label={t('Name')}
            required
            type="input"
            activeLang={activeLang}
          />

          <Form.Item
            label={t('Icon URL')}
            name="iconUrl"
            rules={[{ required: true, message: t('Required field') }]}
          >
            <Input placeholder={t('Enter icon URL')} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={t('Filter Group')}
              name="filterGroupUuid"
              rules={[{ required: true, message: t('Required field') }]}
            >
              <Select
                placeholder={t('Select filter group')}
                options={filterGroupOptions}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item label={t('Order Number')} name="orderNumber">
              <InputNumber size="large" min={0} className="w-full!" />
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddEditFilterModal;
