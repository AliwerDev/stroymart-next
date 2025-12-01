/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Paper from '@/components/common/Paper/Paper';
import ProductSlider from '@/components/common/ProductSlider';
import Show from '@/components/common/Show';
import PageHeader from '@/components/layout/PageHeader';
import Tabs from '@/components/ui/Tabs/Tabs';
import Typography from '@/components/ui/Typography';
import useGetProduct from '@/hooks/endpoints/product/useGetProduct';
import useGetTranslatedWord from '@/hooks/useGetTranslatedWord';
import get from 'lodash.get';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const ProductsSlugPage = () => {
  const { getWord } = useGetTranslatedWord();
  const t = useTranslations();
  const { id } = useParams();

  const { entity: product } = useGetProduct(id as string);

  return (
    <div className="pb-10">
      <PageHeader
        breadcrumbs={[
          { label: t('Товарлар'), href: '/dashboard/products' },
          { label: 'TV LG OLED evo C4 4K OLED83C4' },
        ]}
      />
      <Paper className="p-4 md:p-5 lg:p-6 flex justify-center mb-4 md:mb-5 lg:mb-6">
        <ProductSlider className="max-w-[780px]" images={product.images} />
      </Paper>
      <Paper>
        <Tabs
          items={[
            {
              label: t('Характеристика'),
              value: 'characteristics',
              children: (
                <div className="p-4 md:p-5 lg:p-6 space-y-4 md:space-y-5 lg:space-y-6">
                  {get(product, 'characteristics', [])?.map((item: any) => (
                    <div key={item.title}>
                      <Typography variant="body-rg-20" color="text-1" className="mb-2">
                        {getWord(item.label, 'label')}
                      </Typography>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-6">
                        {get(item, "child", [])?.map((childItem: any) => (
                          <div
                            key={childItem.id}
                            className="flex items-start justify-between bg-light-gray-1 px-[20px] gap-2 py-[10px] rounded-lg"
                          >
                            <Typography variant="caption-rg-14" color="text-1">
                              {getWord(childItem, 'label')}
                            </Typography>
                            <Typography variant="caption-rg-14" color="text-1">
                              {get(childItem, 'values[0].value')}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Show when={get(product, 'additional_characteristics.length') > 0}>
                    <div>
                      <Typography variant="body-rg-20" color="text-1" className="mb-2">
                        {t('Другие функции')}
                      </Typography>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-6">
                        {get(product, 'additional_characteristics', [])?.map((item: any) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between bg-light-gray-1 px-[20px] py-[10px] rounded-lg"
                          >
                            <Typography variant="caption-rg-14" color="text-1">
                              {getWord(item, 'label')}
                            </Typography>
                            <Typography variant="caption-rg-14" color="text-1">
                              {getWord(item, 'value')}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Show>
                </div>
              ),
            },
            {
              label: t('Описание'),
              value: 'description',
              children: (
                <div className="p-4 md:p-5 lg:p-6">
                  <Typography variant="subtitle-rg-16" color="text-1">
                    {getWord(product, 'description')}
                  </Typography>
                </div>
              ),
            },
          ]}
          queryKey="tab"
        />
      </Paper>
    </div>
  );
};

export default ProductsSlugPage;
