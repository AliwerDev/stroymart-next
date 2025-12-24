'use client';
import { fileApi } from '@/data/file/file.api';
import { InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Form, Upload, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface FileUploadProps {
  name: string;
  label?: string;
  required?: boolean;
  accept?: string;
  maxSize?: number;
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
  disabled?: boolean;
  multiple?: boolean;
}

const FileUpload = ({
  name,
  label,
  required = false,
  accept,
  maxSize = 5,
  listType = 'picture-card',
  disabled = false,
  multiple = false,
}: FileUploadProps) => {
  const t = useTranslations();
  const form = Form.useFormInstance();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const fieldValue = Form.useWatch(name, form);

  useEffect(() => {
    if (fieldValue) {
      if (typeof fieldValue === 'string') {
        let fileName = fieldValue.split('/').pop() || 'file';

        const match = fileName.match(/^\d+-(.+)$/);
        if (match) {
          fileName = match[1];
        }

        setFileList([
          {
            uid: '-1',
            name: fileName,
            status: 'done',
            url: fieldValue,
          },
        ]);
      } else if (Array.isArray(fieldValue)) {
        const files = fieldValue.map((url, index) => {
          let fileName = url.split('/').pop() || 'file';

          const match = fileName.match(/^\d+-(.+)$/);
          if (match) {
            fileName = match[1];
          }

          return {
            uid: String(index),
            name: fileName,
            status: 'done' as const,
            url: url,
          };
        });

        setFileList(files);
      }
    } else {
      setFileList([]);
    }
  }, [fieldValue]);

  const handleUpload: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    try {
      setLoading(true);
      const uploadFile = file as File;

      if (maxSize && uploadFile.size > maxSize * 1024 * 1024) {
        message.error(t('File size must be less than {size}MB', { size: maxSize }));
        onError?.(new Error('File too large'));
        return;
      }

      const response = await fileApi.upload(uploadFile);

      if (multiple) {
        const currentValue = form.getFieldValue(name);
        const currentUrls = Array.isArray(currentValue) ? currentValue : [];
        form.setFieldValue(name, [...currentUrls, response.url]);
      } else {
        form.setFieldValue(name, response.url);
      }

      onSuccess?.(response);
      message.success(t('File uploaded successfully'));
    } catch (error) {
      console.error('Upload error:', error);
      message.error(t('Failed to upload file'));
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const doneFiles = newFileList.filter((file) => file.status === 'done');

    if (multiple) {
      const urls = doneFiles.map((file) => file.url).filter(Boolean) as string[];
      form.setFieldValue(name, urls.length > 0 ? urls : undefined);
    } else {
      const url = doneFiles[0]?.url;
      form.setFieldValue(name, url || undefined);
    }
  };

  const handleBeforeUpload = (file: File) => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      message.error(t('File size must be less than {size}MB', { size: maxSize }));
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  return (
    <Form.Item name={name} label={label} rules={[{ required, message: t('Please upload a file') }]}>
      <Upload.Dragger
        name="file"
        listType={listType}
        fileList={fileList}
        multiple={multiple}
        customRequest={handleUpload}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
        maxCount={multiple ? undefined : 1}
        disabled={disabled || loading}
        accept={accept}
        classNames={{
          root: '!space-y-2',
        }}
      >
        {loading ? (
          <div className="py-4">
            <LoadingOutlined className="text-4xl text-blue-500" />
            <p className="mt-2">{t('Uploading...')}</p>
          </div>
        ) : (
          <div className="py-4">
            <InboxOutlined className="text-4xl text-gray-400" />
            <p className="mt-2 text-base">{t('Click or drag file to upload')}</p>
            {maxSize && (
              <p className="text-sm text-gray-500">
                {t('Maximum file size: {size}MB', { size: maxSize })}
              </p>
            )}
          </div>
        )}
      </Upload.Dragger>
    </Form.Item>
  );
};

export default FileUpload;
