import StarIcon from '@/components/icons/StarIcon';
import Image from 'next/image';

interface CommentItemProps {
  text: string;
  fullName: string;
  position: string;
  image: string;
  grade: number;
  style?: React.CSSProperties;
}

const CommentItem = ({ fullName, position, image, grade, style }: CommentItemProps) => {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{
        background:
          'linear-gradient(180deg, #FFE6F4 0%, #FFF 100%), linear-gradient(325deg, #51FF00 0%, rgba(81, 255, 0, 0.10) 100%)',
        boxShadow: '0 40px 64px -32px rgba(14, 14, 14, 0.04)',
        backdropFilter: 'blur(6px)',
        ...style,
      }}
    >
      <div className="self-stretch justify-center">
        <span className="text-neutral-900 text-base font-normal leading-7">&quot;One of the</span>
        <span className="text-neutral-900 text-base font-normal font-['Poppins'] leading-7"> </span>
        <span className="text-neutral-900 text-base font-semibold font-['Poppins'] leading-7">
          most in-depth and up-to-date courses
        </span>
        <span className="text-neutral-900 text-base font-normal font-['Poppins'] leading-7"> </span>
        <span className="text-neutral-900 text-base font-normal leading-7">
          I’ve ever come across. It’s incredibly thorough, easy to follow and breaks things down
          clearly.{' '}
        </span>
      </div>
      <div className="self-stretch justify-center">
        <span className="text-neutral-900 text-base font-normal leading-7">
          It covers everything for great UI design
        </span>
        <span className="text-neutral-900 text-base font-normal font-['Poppins'] leading-7">
          {' '}
          —{' '}
        </span>
        <span className="text-neutral-900 text-base font-semibold font-['Poppins'] leading-7">
          a lot more than just creating design systems
        </span>
        <span className="text-neutral-900 text-base font-normal leading-7">
          {' '}
          and components in Figma.{' '}
        </span>
      </div>
      <div className="self-stretch justify-center">
        <span className="text-neutral-900 text-base font-normal leading-7">
          It covers everything for great UI design
        </span>
        <span className="text-neutral-900 text-base font-normal font-['Poppins'] leading-7">
          {' '}
          —{' '}
        </span>
        <span className="text-neutral-900 text-base font-semibold font-['Poppins'] leading-7">
          a lot more than just creating design systems
        </span>
        <span className="text-neutral-900 text-base font-normal leading-7">
          {' '}
          and components in Figma.{' '}
        </span>
      </div>

      <div className="flex items-center">
        {Array.from({ length: grade }).map((_, index) => (
          <StarIcon className="text-text1 w-8 h-8" key={index} />
        ))}
      </div>

      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-text1 text-lg font-bold leading-4">{fullName}</h3>
          <p className="text-text1/60 text-sm font-normal leading-6">{position}</p>
        </div>
        <div className="w-12 h-12 overflow-hidden">
          <Image
            src={image}
            width={100}
            height={100}
            className="w-full h-full object-cover rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
