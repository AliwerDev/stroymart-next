/* eslint-disable @typescript-eslint/no-explicit-any */
import RadioIcon from '@/components/icons/RadioIcon';
import Button from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import Typography from '@/components/ui/Typography';
import request from '@/lib/request';
import { Radio, RadioGroup } from '@headlessui/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface SetMainModalProps {
  onClose: () => void;
  onSuccess: () => void;
  units: any[];
}

const SetMainModal = ({ onClose, onSuccess, units }: SetMainModalProps) => {
  const t = useTranslations();
  const [selected, setSelected] = useState(units[0]);

  const seMainMutation = useMutation({
    mutationFn: () => {
      return request.post('/property-value/set-parent', {
        parent_id: selected.id,
        property_values: units.map((unit) => unit.id),
      });
    },
    onSuccess: () => {
      toast.success(t('Основное значение успешно установлено'));
      onClose();
      onSuccess();
    },
    onError: () => {
      toast.error(t('Не удалось установить основное значение'));
    },
  });

  const handleSubmit = () => {
    seMainMutation.mutate();
  };

  return (
    <Modal
      isOpen
      bodyClassName="space-y-5"
      onClose={onClose}
      title={t('Выбрать основное')}
      width={800}
    >
      <Typography variant="body-sm-20">{t('Выберите правильный основной вариант')}</Typography>

      <RadioGroup
        by="id"
        value={selected}
        onChange={setSelected}
        aria-label="Server size"
        className="space-y-2"
      >
        {units.map((unit) => (
          <Radio
            key={unit.id}
            value={unit}
            className="group flex items-center justify-between bg-light-gray-1 px-[20px] py-[10px] rounded-lg cursor-pointer"
          >
            <Typography variant="caption-rg-14" color="text-1" className="flex-1 truncate mb-0">
              <span className="font-normal text-text-3">ID: </span>
              {unit.id}
            </Typography>
            <Typography variant="caption-rg-14" color="text-1" className="flex-1 truncate mb-0">
              <span className="font-normal text-text-3">{t('Название')}: </span>
              {unit.value}
            </Typography>

            <RadioIcon checked={selected === unit} />
          </Radio>
        ))}
      </RadioGroup>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          {t('Отмена')}
        </Button>
        <Button isLoading={seMainMutation.isPending} onClick={handleSubmit}>
          {t('Применить')}
        </Button>
      </div>
    </Modal>
  );
};

export default SetMainModal;
