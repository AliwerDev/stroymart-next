/* eslint-disable @typescript-eslint/no-explicit-any */
import Checkbox from '@/components/fields/Chexbox';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import Button from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import Typography from '@/components/ui/Typography';
import useGetNewItemPropertyFilter from '@/hooks/endpoints/new-items/useGetNewItemPropertyFilter';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import get from 'lodash.get';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface ProductsPropertyFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onValuesChange?: (values: any) => void;
  values: any;
}

const ProductsPropertyFilters = ({
  isOpen,
  onClose,
  onValuesChange,
  values,
}: ProductsPropertyFiltersProps) => {
  const [propertyValues, setPropertyValues] = useState<number[]>(values);
  const t = useTranslations();
  const category_id = values.category_id;
  const { list: properties } = useGetNewItemPropertyFilter(category_id);
  const { getWord } = useGetTranslatedWord();

  useEffect(() => {
    setPropertyValues(values?.values || []);
  }, [values]);

  const handleValueChange = (propertyId: string) => {
    const newValue = !propertyValues.includes(Number(propertyId));
    setPropertyValues((s: any) => {
      if (newValue) {
        return [...s, Number(propertyId)];
      } else {
        return s.filter((id: number) => id !== Number(propertyId));
      }
    });
  };

  const onApply = () => {
    onValuesChange?.({
      ...values,
      values: propertyValues,
    });
    onClose?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('Фильтр')}
      width="max-w-2xl"
      bodyClassName="pb-0"
    >
      <div className="space-y-5">
        {properties?.map((property: any) => (
          <Disclosure as="div" defaultOpen key={property.id}>
            {({ open }) => (
              <>
                <DisclosureButton className="flex justify-between items-center w-full mb-2 cursor-pointer">
                  <Typography variant="body-sm-20" color="text-1">
                    {getWord(property, "label")}
                  </Typography>
                  <ChevronDownIcon
                    className={`${open ? 'transform rotate-180' : ''} text-text-1`}
                  />
                </DisclosureButton>
                <div className="overflow-hidden py-2">
                  <DisclosurePanel
                    className="space-y-2 origin-top transition-all duration-300 ease-in-out transform"
                    transition
                  >
                    {get(property, "values", []).map((item: any) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-light-gray-1 px-[20px] py-[10px] rounded-lg cursor-pointer mb-2"
                        onClick={() => handleValueChange(item.id)}
                      >
                        <Typography
                          variant="caption-rg-14"
                          color="text-1"
                          className="flex-1 truncate mb-0"
                        >
                          {item?.value}
                        </Typography>

                        <Checkbox checked={propertyValues.includes(Number(item.id)) || false} />
                      </div>
                    ))}
                  </DisclosurePanel>
                </div>
              </>
            )}
          </Disclosure>
        ))}
      </div>
      <div className="flex justify-end gap-2 mt-5 sticky bottom-0 py-4 bg-white">
        <Button variant="secondary" onClick={onClose}>
          {t('Отменить')}
        </Button>
        <Button variant="primary" onClick={onApply}>
          {t('Применить')}
        </Button>
      </div>
    </Modal>
  );
};

export default ProductsPropertyFilters;
