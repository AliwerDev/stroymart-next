import { cn } from '@/lib/utils';

interface TableLoadingProps {
  className?: string;
  columnCount: number;
}

export const TableLoading = ({ className, columnCount }: TableLoadingProps) => {
  return (
    <tbody className={cn('w-full', className)}>
      {[...Array(5)].map((_, i) => (
        <tr key={i}>
          {Array.from({ length: columnCount }).map((_, j) => (
            <td key={j} className="h-10 pt-1 pr-1">
              <div className="h-full w-full bg-bunker-100 animate-pulse"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
