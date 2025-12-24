'use client';
import { Language } from '@/data/common/common.types';
import { Form } from 'antd';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface TranslatedRichTextEditorProps {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  height?: number;
  activeLang: Language;
}

const TranslatedRichTextEditor = ({
  name,
  label,
  required = false,
  placeholder,
  height = 200,
  activeLang,
}: TranslatedRichTextEditorProps) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
      ],
    }),
    []
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'align',
    'link',
  ];

  return (
    <div className="mb-4">
      {label && <label className="block mb-2 text-sm font-medium">{label}</label>}
      <div className="grid grid-cols-1 gap-4">
        <Form.Item
          name={`${name}_uzl`}
          rules={[{ required: required && activeLang === 'uzl', message: 'Required field' }]}
          className={activeLang !== 'uzl' ? 'hidden' : ''}
        >
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            style={{ height: `${height}px`, marginBottom: '42px' }}
          />
        </Form.Item>

        <Form.Item
          name={`${name}_uzc`}
          rules={[{ required: required && activeLang === 'uzc', message: 'Required field' }]}
          className={activeLang !== 'uzc' ? 'hidden' : ''}
        >
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            style={{ height: `${height}px`, marginBottom: '42px' }}
          />
        </Form.Item>

        <Form.Item
          name={`${name}_ru`}
          rules={[{ required: required && activeLang === 'ru', message: 'Required field' }]}
          className={activeLang !== 'ru' ? 'hidden' : ''}
        >
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            style={{ height: `${height}px`, marginBottom: '42px' }}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default TranslatedRichTextEditor;
