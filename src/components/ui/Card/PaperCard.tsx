import Paper from '@/components/common/Paper/Paper';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface PaperCardProps {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  imgSrc: string;
  imgAlt: string;
}

const PaperCard = ({ containerClassName, className, imgSrc, imgAlt, children }: PaperCardProps) => {
  return (
    <Paper className={twMerge('p-2.5', containerClassName)}>
      <Image
        src={imgSrc}
        width={345}
        height={160}
        priority
        alt={imgAlt}
        className="w-full h-40 object-cover bg-center rounded-xl border border-mid-gray-1"
      />

      <div className={twMerge('w-full', className)}>{children}</div>
    </Paper>
  );
};

export default PaperCard;
