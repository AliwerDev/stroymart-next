import { twMerge } from 'tailwind-merge';

type Props = {
  label: string;
  labelRequired?: boolean;
  className?: string;
  htmlFor?: string;
};

const Label = ({ label, labelRequired, className, htmlFor }: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge('block mb-1 font-semibold text-sm leading-5 text-text-1', className)}
    >
      {label}
      {labelRequired && <span className="text-primary-500 ml-1">*</span>}
    </label>
  );
};

export default Label;
