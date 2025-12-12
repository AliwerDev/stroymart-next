import { Link } from '@/i18n/navigation';
import { PolymorphicProps } from '@/types/helper.types';
import { TypographyColor, TypographyVariant } from '@/types/typography';
import { ComponentProps, ElementType, ReactNode, createElement } from 'react';
import { twMerge } from 'tailwind-merge';

export type TypographyProps<T extends ElementType> = PolymorphicProps<T> & {
  variant?: TypographyVariant;
  color?: TypographyColor;
  children?: ReactNode;
  enabled?: boolean;
  lines?: 1 | 2 | 3 | 4 | 5 | 6;
};

// Special case: if user sets as={Link}, then allow LinkProps
type TypographyLinkProps = TypographyProps<typeof Link> & ComponentProps<typeof Link>;

function Typography<T extends ElementType = 'p'>({
  variant = 'body-rg-20',
  color,
  className,
  children,
  as,
  enabled = false,
  lines = 1,
  ...props
}: T extends typeof Link ? TypographyLinkProps : TypographyProps<T>) {
  const getVariantClasses = (variant: string) => {
    const variants = {
      'h-bl-36': 'typo-h-bl-36',
      'h-sm-36': 'typo-h-sm-36',
      'h-rg-36': 'typo-h-rg-36',
      'h2-bl-32': 'typo-h2-bl-32',
      'h2-sm-32': 'typo-h2-sm-32',
      'h2-rg-32': 'typo-h2-rg-32',
      'h3-bl-24': 'typo-h3-bl-24',
      'h3-sm-24': 'typo-h3-sm-24',
      'h3-rg-24': 'typo-h3-rg-24',
      'body-bl-20': 'typo-body-bl-20',
      'body-sm-20': 'typo-body-sm-20',
      'body-rg-20': 'typo-body-rg-20',
      'subtitle-bl-16': 'typo-subtitle-bl-16',
      'subtitle-sm-16': 'typo-subtitle-sm-16',
      'subtitle-rg-16': 'typo-subtitle-rg-16',
      'caption-bl-14': 'typo-caption-bl-14',
      'caption-sm-14': 'typo-caption-sm-14',
      'caption-rg-14': 'typo-caption-rg-14',
      'footnote-bl-12': 'typo-footnote-bl-12',
      'footnote-sm-12': 'typo-footnote-sm-12',
      'footnote-rg-12': 'typo-footnote-rg-12',
    };
    return variants[variant as keyof typeof variants] || 'text-body-rg-20';
  };

  const getDefaultElement = (variant: string) => {
    const elements = {
      'h-bl-36': 'h1',
      'h-sm-36': 'h1',
      'h-rg-36': 'h1',
      'h2-bl-32': 'h2',
      'h2-sm-32': 'h2',
      'h2-rg-32': 'h2',
      'h3-bl-24': 'h3',
      'h3-sm-24': 'h3',
      'h3-rg-24': 'h3',
      'body-bl-20': 'p',
      'body-sm-20': 'p',
      'body-rg-20': 'p',
      'subtitle-bl-16': 'p',
      'subtitle-sm-16': 'p',
      'subtitle-rg-16': 'p',
      'caption-bl-14': 'span',
      'caption-sm-14': 'span',
      'caption-rg-14': 'span',
      'footnote-bl-12': 'small',
      'footnote-sm-12': 'small',
      'footnote-rg-12': 'small',
    };
    return elements[variant as keyof typeof elements] || 'p';
  };

  const getColorClass = (color?: TypographyColor) => {
    if (!color) return '';
    const colors = {
      'primary-black': 'text-primary-black',
      'primary-red': 'text-primary-red',
      'primary-warm-gray': 'text-primary-warm-gray',
      'gray-200': 'text-gray-200',
      'gray-400': 'text-gray-400',
      'gray-600': 'text-gray-600',
      'gray-200': 'text-gray-200',
      'gray-400': 'text-gray-400',
      'gray-900': 'text-gray-900',
      'text-1': 'text-text-1',
      'text-2': 'text-text-2',
      'text-3': 'text-text-3',
      'text-4': 'text-text-4',
      white: 'text-white',
    };
    return colors[color as keyof typeof colors] || '';
  };

  const Component: ElementType = as || (getDefaultElement(variant) as ElementType);

  return createElement(
    Component,
    {
      className: twMerge(
        getVariantClasses(variant),
        getColorClass(color),
        className,
        enabled &&
          twMerge(
            'overflow-hidden overflow-ellipsis break-words',
            lines === 1 && 'line-clamp-1',
            lines === 2 && 'line-clamp-2',
            lines === 3 && 'line-clamp-3',
            lines === 4 && 'line-clamp-4',
            lines === 5 && 'line-clamp-5',
            lines === 6 && 'line-clamp-6'
          )
      ),
      ...props,
    },
    children
  );
}

export default Typography;
