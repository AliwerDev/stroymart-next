import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';
import { useTranslations } from 'next-intl';

interface TranslatedTextInputProps {
  name: string;
  label: string;
  required?: boolean;
  type?: 'input' | 'textarea';
  rows?: number;
  rules?: Rule[];
  placeholder?: string;
  activeLang: 'uzl' | 'uzc' | 'ru';
}

const TranslatedTextInput = ({
  name,
  label,
  required = false,
  type = 'input',
  rows = 3,
  rules = [],
  placeholder,
  activeLang,
}: TranslatedTextInputProps) => {
  const t = useTranslations();

  const defaultRules: Rule[] = required ? [{ required: true, message: t('Required field') }] : [];

  const allRules = [...defaultRules, ...rules];

  return (
    <div>
      <Form.Item
        label={activeLang === 'uzl' ? label : undefined}
        name={`${name}_uzl`}
        rules={allRules}
        style={{ display: activeLang === 'uzl' ? 'block' : 'none' }}
      >
        {type === 'textarea' ? (
          <Input.TextArea
            rows={rows}
            placeholder={placeholder || `${t('Enter')} ${label.toLowerCase()} (UZ Latin)`}
          />
        ) : (
          <Input placeholder={placeholder || `${t('Enter')} ${label.toLowerCase()} (UZ Latin)`} />
        )}
      </Form.Item>

      <Form.Item
        label={activeLang === 'uzc' ? label : undefined}
        name={`${name}_uzc`}
        rules={allRules}
        style={{ display: activeLang === 'uzc' ? 'block' : 'none' }}
      >
        {type === 'textarea' ? (
          <Input.TextArea
            rows={rows}
            placeholder={placeholder || `${t('Enter')} ${label.toLowerCase()} (UZ Cyrillic)`}
          />
        ) : (
          <Input
            placeholder={placeholder || `${t('Enter')} ${label.toLowerCase()} (UZ Cyrillic)`}
          />
        )}
      </Form.Item>

      <Form.Item
        label={activeLang === 'ru' ? label : undefined}
        name={`${name}_ru`}
        rules={allRules}
        style={{ display: activeLang === 'ru' ? 'block' : 'none' }}
      >
        {type === 'textarea' ? (
          <Input.TextArea
            rows={rows}
            placeholder={placeholder || `${t('Enter')} ${label.toLowerCase()} (RU)`}
          />
        ) : (
          <Input placeholder={placeholder || `${t('Enter')} ${label.toLowerCase()} (RU)`} />
        )}
      </Form.Item>
    </div>
  );
};

export default TranslatedTextInput;
