import Typography from '@/components/ui/Typography';
import React from 'react';

interface ClientAnalyticsInfoCardItem {
  id: number;
  title: string;
  value: number | string;
  icon: React.ReactNode;
}
const AnalyticsInfoCard = ({
  items,
  isLoading = false,
}: {
  items: ClientAnalyticsInfoCardItem[];
  isLoading?: boolean;
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-5`}>
      {items.map((item) => (
        <div key={item.id} className="rounded-2xl p-6 bg-white shadow-xs">
          <div className="flex items-center gap-x-2.5 max-w-[200px]">
            <div className="bg-light-gray-1 aspect-square rounded-full h-10 w-10 flex items-center justify-center">
              {item.icon}
            </div>
            <Typography variant="caption-sm-14" className="text-text-2 whitespace-break-spaces">
              {item.title}
            </Typography>
          </div>
          <Typography variant="h2-bl-32" className="pt-2.5">
            {isLoading ? (
              <div className="h-11 bg-light-gray-1 rounded animate-pulse"></div>
            ) : (
              `${item.value}`
            )}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsInfoCard;
