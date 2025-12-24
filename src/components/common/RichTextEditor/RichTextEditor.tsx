'use client';
import { Form } from 'antd';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  height?: number;
}

const RichTextEditor = ({
  name,
  label,
  required = false,
  placeholder,
  height = 200,
}: RichTextEditorProps) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean'],
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
    <Form.Item label={label} name={name} rules={[{ required, message: 'Required field' }]}>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: `${height}px`, marginBottom: '42px' }}
      />
    </Form.Item>
  );
};

export default RichTextEditor;
