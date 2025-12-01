import Typography from '../Typography';

interface TagProps {
  label?: string | React.ReactNode;
  className?: string;
  children?: string | React.ReactNode;
  variant?: 'primary' | 'gray' | 'success' | 'danger' | 'warning' | 'info';
  icon?: React.ReactNode;
}

const Tag = ({ label, className, variant = 'success', children, icon }: TagProps) => {
  const variantClass = {
    primary: 'bg-blue-50 text-blue-500',
    gray: 'bg-gray-50 text-text-1',
    success: 'bg-success-50 text-success-500',
    danger: 'bg-primary-50 text-primary-500',
    warning: 'bg-yellow-50 text-yellow-500',
    info: 'bg-blue-50 text-blue-500',
  };

  return (
    <div
      className={`px-3 py-1 rounded-sm text-xs leading-4 font-medium flex items-center gap-1 ${variantClass[variant]} ${className}`}
    >
      {icon}
      {children || <Typography variant="footnote-rg-12">{label}</Typography>}
    </div>
  );
};

export default Tag;
