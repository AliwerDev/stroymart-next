import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface InfoCardProps {
  items: InfoCardItem[];
  className?: string;
  grid?: string;
}

interface InfoCardItem {
  title: string;
  value?: string;
  children?: ReactNode;
  gridColSpan?: 1 | 2 | 3 | 4;
}

const InfoCard = ({ items, className, grid }: InfoCardProps) => {
  return (
    <div
      className={cn(
        `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5 bg-background-500 rounded-xl`,
        className,
        grid
      )}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className={cn(
            '',
            item.gridColSpan === 1 && 'col-span-1',
            item.gridColSpan === 2 && 'col-span-2',
            item.gridColSpan === 3 && 'col-span-3',
            item.gridColSpan === 4 && 'col-span-4'
          )}
        >
          <p className="text-base leading-6 font-medium mb-1">{item.title}</p>
          {item.children ? (
            item.children
          ) : (
            <p className="text-base leading-6 font-normal text-bunker-600 whitespace-pre-wrap">
              {item.value}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default InfoCard;
