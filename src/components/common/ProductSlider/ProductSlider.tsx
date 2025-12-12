'use client';
import 'keen-slider/keen-slider.min.css';
import { KeenSliderInstance, KeenSliderPlugin, useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { MutableRefObject, useCallback, useMemo, useState } from 'react';

import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import { cn, getImageUrl } from '@/lib/utils';
import { IFileResponse } from '@/types/file';

function ThumbnailPlugin(mainRef: MutableRefObject<KeenSliderInstance | null>): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active');
      });
    }
    function addActive(idx: number) {
      if (slider.slides[idx]) slider.slides[idx].classList.add('active');
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on('created', () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on('animationStarted', (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export interface ProductSliderProps {
  images: IFileResponse[];
  className?: string;
}

const ProductSlider = ({ images, className }: ProductSliderProps) => {
  const validImages = useMemo(() => images?.filter(Boolean) || [], [images]);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged: () => {
      setCurrentImage(instanceRef.current?.track.details.rel || 0);
    },
  });

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 1,
      slides: {
        perView: 5,
        spacing: 12,
      },
      breakpoints: {
        '(max-width: 1536px)': {
          slides: { perView: 6, spacing: 10 },
        },
        '(max-width: 1280px)': {
          slides: { perView: 5, spacing: 10 },
        },
        '(max-width: 768px)': {
          slides: { perView: 4, spacing: 8 },
        },
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  const canGoPrev = !!instanceRef.current && currentImage > 0;
  const canGoNext = !!instanceRef.current && currentImage < validImages.length - 1;

  const handlePrev = useCallback(() => instanceRef.current?.prev(), [instanceRef]);
  const handleNext = useCallback(() => instanceRef.current?.next(), [instanceRef]);

  if (!validImages?.length) {
    return (
      <div
        className={cn(
          'w-full h-full rounded-xl bg-white flex items-center justify-center',
          className
        )}
      >
        <div className="w-full aspect-video bg-gray-100 rounded-xl" />
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="relative">
        <div
          ref={sliderRef}
          className={'keen-slider rounded-xl overflow-hidden bg-white border border-gray-200'}
        >
          {validImages.map((img) => (
            <div
              key={img.id}
              className="keen-slider__slide flex items-center justify-center p-2"
              style={{
                width: 'auto',
                height: '400px',
              }}
            >
              <Image
                src={getImageUrl(img)}
                alt={img.title || 'image'}
                width={1200}
                height={800}
                className="w-auto h-full object-cover select-none"
                priority
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-4 h-16">
        <div
          onClick={handlePrev}
          className={cn(
            `h-full w-8 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-600 transition cursor-pointer`,
            !canGoPrev && 'opacity-60 cursor-not-allowed'
          )}
        >
          <ChevronLeftIcon className="text-text-1 w-6 h-6" />
        </div>

        <div ref={thumbnailRef} className="keen-slider">
          {validImages.map((img: IFileResponse, index: number) => (
            <div key={`thumb-${img.id}`} className="keen-slider__slide h-full">
              <div
                className={cn(
                  'h-full w-full p-2 rounded-lg overflow-hidden border border-gray-200 bg-white cursor-pointer transition-all duration-200',
                  currentImage === index && '!border-primary-500'
                )}
              >
                <Image
                  src={getImageUrl(img)}
                  alt={img.title || 'thumb'}
                  width={200}
                  height={200}
                  className="w-auto h-full object-cover mx-auto"
                />
              </div>
            </div>
          ))}
        </div>

        <div
          onClick={handleNext}
          className={cn(
            `h-full w-8 flex items-center justify-center rounded-md cursor-pointer bg-gray-200 hover:bg-gray-600 transition`,
            !canGoNext && 'opacity-60 cursor-not-allowed'
          )}
        >
          <ChevronLeftIcon className="rotate-180 text-text-1 w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
