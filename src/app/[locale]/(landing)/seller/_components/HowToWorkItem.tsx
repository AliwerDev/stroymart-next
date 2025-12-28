import BorderIcon from '@/components/icons/BorderIcon';
import Image from 'next/image';

const HowToWorkItem = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="relative p-10">
      <BorderIcon className="absolute top-0 left-0" />
      <BorderIcon className="absolute top-0 right-0 rotate-90" />
      <BorderIcon className="absolute bottom-0 left-0 rotate-270" />
      <BorderIcon className="absolute bottom-0 right-0 rotate-180" />

      <div className="flex flex-col items-center gap-1 justify-center text-center">
        <Image src={image} width={120} height={120} alt="Cover" />
        <div className="text-center justify-center text-text1 text-lg font-semibold leading-6">
          {title}
        </div>
        <p className="w-full justify-start text-text1/80 text-sm font-normal mb-4">{description}</p>
      </div>
    </div>
  );
};

export default HowToWorkItem;
