'use client';

import { CategoryCard } from '@/components/ui/Card';
import { Category } from '@/types/api';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { ChevronLeftIcon } from '../icons';

const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Асбоб-ускуналар',
    image: '/images/mock/catalog.png',
  },
  {
    id: 2,
    name: 'Электр ва ёритгич',
    image: '/images/mock/catalog.png',
  },
  {
    id: 3,
    name: 'Ёғоч тахта ва фанера',
    image: '/images/mock/catalog.png',
  },
  {
    id: 4,
    name: 'Бетон ва цемент',
    image: '/images/mock/catalog.png',
  },
  {
    id: 5,
    name: 'Арматура ва темир қувурлар',
    image: '/images/mock/catalog.png',
  },
  {
    id: 6,
    name: 'Бўёқ ва лакилар',
    image: '/images/mock/catalog.png',
  },
  {
    id: 7,
    name: 'Бўёқ ва лакилар',
    image: '/images/mock/catalog.png',
  },
  {
    id: 8,
    name: 'Бўёқ ва лакилар',
    image: '/images/mock/catalog.png',
  },
];

const CatalogsSection = () => {
  const t = useTranslations();
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="container py-10">
      <h1 className="text-5xl font-semibold leading-snug mb-8">{t('Каталог')}</h1>

      <div className="relative">
        <div className="py-6 px-3 overflow-x-hidden -my-6 -mx-3">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={6}
            navigation
            loop={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="category-swiper"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
              1536: {
                slidesPerView: 6,
                spaceBetween: 24,
              },
            }}
          >
            {mockCategories.map((category) => (
              <SwiperSlide key={category.id}>
                <CategoryCard category={category} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            style={{
              boxShadow: '4px 4px 10px 0px #0000001A, -2px 2px 6px 0px #0000001A',
            }}
            onClick={() => swiperRef?.current?.slidePrev()}
            className="w-12 h-12 bg-white absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 left-0 z-10 rounded-full flex items-center justify-center cursor-pointer"
          >
            <ChevronLeftIcon className="w-6 h-6 text-primary" />
          </div>
          <div
            style={{
              boxShadow: '4px 4px 10px 0px #0000001A, -2px 2px 6px 0px #0000001A',
            }}
            onClick={() => swiperRef?.current?.slideNext()}
            className="w-12 h-12 bg-white absolute top-1/2 transform -translate-y-1/2 translate-x-1/2 right-0 z-10 rounded-full flex items-center justify-center cursor-pointer"
          >
            <ChevronLeftIcon className="rotate-180 w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogsSection;
