import { Category } from '@/types/api';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface CategoryCardProps {
  category: Category;
  className?: string;
  onClick?: () => void;
}

const CategoryCard = ({ category, className, onClick }: CategoryCardProps) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        'flex h-[264px] p-5 flex-col items-end gap-4 flex-1 rounded-[20px] cursor-pointer transition-transform relative',
        className
      )}
      style={{
        background: '#F4F5F7',
        boxShadow: '0 4px 15px 0 rgba(0, 0, 0, 0.20)',
      }}
    >
      <h3 className="text-2xl font-semibold text-left w-full text-bunker-900">{category.name}</h3>

      <Image
        src={category.image}
        alt={category.name}
        width={300}
        height={180}
        className="object-cover object-center w-[156px] h-[156px] absolute bottom-6 right-6"
      />
    </div>
  );
};

export default CategoryCard;
