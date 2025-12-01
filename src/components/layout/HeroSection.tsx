'use client';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const heroSlides = [
  {
    id: 1,
    title: 'Қурилиш учун ҳамма нарса — бир жойда!',
    description: 'Сементдан тортиб, электр асбобларгача — тез ва ишончли етказиб берамиз.',
    features: [
      'Сифатли қурилиш материаллари.',
      'Электр асбоблари ва сантехника.',
      'Энг тезкор етказиб бериш.',
    ],
    image: '/images/home.png',
  },
  {
    id: 2,
    title: 'Профессионал қурилиш асбоблари',
    description: 'Юқори сифатли асбоблар ва материаллар энг яхши нархларда.',
    features: [
      'Оригинал маҳсулотлар.',
      'Кафолат ва хизмат кўрсатиш.',
      'Тезкор етказиб бериш хизмати.',
    ],
    image: '/images/home.png',
  },
  {
    id: 3,
    title: 'Энг яхши нархлар ва сифат',
    description: 'Қурилиш материалларини энг қулай шартларда сотиб олинг.',
    features: ['Рақобатбардош нархлар.', 'Катта танлов.', 'Профессионал маслаҳат.'],
    image: '/images/home.png',
  },
];

const HeroSection = () => {
  return (
    <div
      className="w-full text-white relative"
      style={{
        background: 'linear-gradient(270deg, #74D0FF 0%, #2E8BBA 84.43%)',
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="hero-swiper"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="container h-[450px] relative flex items-center justify-between">
              <div className="max-w-[750px] z-10">
                <h1 className="text-5xl font-semibold leading-snug mb-2">{slide.title}</h1>
                <p className="font-normal leading-6 mb-6">{slide.description}</p>
                <ul className="list-disc list-inside space-y-2">
                  {slide.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <Image
                src={slide.image}
                alt={slide.title}
                width={800}
                height={800}
                className="absolute top-0 right-0 object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
