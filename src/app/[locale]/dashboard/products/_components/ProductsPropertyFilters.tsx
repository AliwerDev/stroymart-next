import Typography from '@/components/ui/Typography';

const filters = [
  {
    title: 'Технические характеристики',
    list: [
      { label: 'Энергоэффективность (A+++, A++, A+)', id: '1' },
      { label: 'Скорость отжима', id: '2' },
      { label: 'Класс шума (дБ)', id: '3' },
      { label: 'Разрешение экрана', id: '4' },
      { label: 'Тип матрицы', id: '5' },
      { label: 'Поддержка Smart TV / Wi-Fi', id: '6' },
    ],
  },
  {
    title: 'Дополнительные фильтры (блок 1)',
    list: [
      { label: 'Цвет (белый, чёрный, серебристый …)', id: 'color' },
      { label: 'Объём', id: '5' },
      { label: 'Размеры / Габариты (Высота, Ширина, Глубина)', id: '6' },
      { label: 'Тип управления (механическое, сенсорное …)', id: '7' },
      { label: 'Тип управления (механическое, сенсорное …)', id: '8' },
      { label: 'Размеры / Габариты (Высота, Ширина, Глубина)', id: '9' },
      { label: 'Тип управления (механическое, сенсорное …)', id: '10' },
      { label: 'Размеры / Габариты (Высота, Ширина, Глубина)', id: '11' },
      { label: 'Тип управления (механическое, сенсорное …)', id: '12' },
    ],
  },
  {
    title: 'Дополнительные фильтры (блок 2)',
    list: [
      { label: 'Цвет (белый, чёрный, серебристый …)', id: '13' },
      { label: 'Объём', id: '14' },
      { label: 'Размеры / Габариты (Высота, Ширина, Глубина)', id: '15' },
      { label: 'Тип управления (механическое, сенсорное …)', id: '16' },
      { label: 'Тип управления (механическое, сенсорное …)', id: '17' },
    ],
  },
];

const ProductsPropertyFilters = () => {
  return (
    <div className="px-[30px] py-5 space-y-5">
      {filters.map((filter) => (
        <div key={filter.title}>
          <Typography variant="body-sm-20" color="text-1" className="mb-2">
            {filter.title}
          </Typography>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
            {filter.list.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-light-gray-1 px-[20px] py-[10px] rounded-lg cursor-pointer"
              >
                <Typography variant="caption-rg-14" color="text-1" className="flex-1 truncate mb-0">
                  {item.label}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsPropertyFilters;
