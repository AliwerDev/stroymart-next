import { cn } from '@/lib/utils';
import { FieldValues, FormProvider } from 'react-hook-form';
import { FormProps } from './types';

const Form = <TFieldValues extends FieldValues = FieldValues>({
  form,
  onSubmit = () => {},
  className,
  children,
  ...props
}: FormProps<TFieldValues>) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-6', className)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
