/* eslint-disable @typescript-eslint/no-explicit-any */
import { Language } from '@/data/common/common.types';
import { Badge, Form, Tabs } from 'antd';
import { useTranslations } from 'next-intl';

interface FormLanguageTabsProps {
  activeLang: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}

const FormLanguageTabs = ({ activeLang, onLanguageChange, className }: FormLanguageTabsProps) => {
  const t = useTranslations();

  const getErrorCountByLanguage = (fieldsError: Array<{ name: any[]; errors: string[] }>) => {
    const errorCounts = {
      uzl: 0,
      uzc: 0,
      ru: 0,
    };

    fieldsError.forEach((field) => {
      const fieldName = field.name[0]?.toString() || '';
      if (field.errors.length > 0) {
        if (fieldName.endsWith('_uzl')) {
          errorCounts.uzl++;
        } else if (fieldName.endsWith('_uzc')) {
          errorCounts.uzc++;
        } else if (fieldName.endsWith('_ru')) {
          errorCounts.ru++;
        }
      }
    });

    return errorCounts;
  };

  return (
    <Form.Item noStyle shouldUpdate>
      {({ getFieldsError }) => {
        const errorCounts = getErrorCountByLanguage(getFieldsError());

        const langTabs = [
          {
            key: 'uzl' as Language,
            label: (
              <Badge count={errorCounts.uzl} offset={[10, 0]}>
                {t('UZ Latin')}
              </Badge>
            ),
          },
          {
            key: 'uzc' as Language,
            label: (
              <Badge count={errorCounts.uzc} offset={[10, 0]}>
                {t('UZ Cyrillic')}
              </Badge>
            ),
          },
          {
            key: 'ru' as Language,
            label: (
              <Badge count={errorCounts.ru} offset={[10, 0]}>
                {t('RU')}
              </Badge>
            ),
          },
        ];

        return (
          <Tabs
            activeKey={activeLang}
            onChange={(key) => onLanguageChange(key as Language)}
            items={langTabs}
            className={className}
          />
        );
      }}
    </Form.Item>
  );
};

export default FormLanguageTabs;
