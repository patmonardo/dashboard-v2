/*
'use client';

import React from 'react';
import { useForm, SubmitHandler, DefaultValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';

// Updated FormView interface
interface FormView<T> {
  render: (props: {
    register: any;
    control: any;
    errors: Record<string, any>;
    isSubmitting: boolean;
    onCancel: () => void;
    error: string | null;
  }) => React.ReactNode;
  defaultValues?: DefaultValues<T>; // Use React Hook Form's type here
}

interface FormControllerProps<T> {
  formView: FormView<T>;
  submitAction: (data: T) => Promise<{ success: boolean; message?: string }>;
  redirectPath?: string;
}

const FormController = <T extends Record<string, any>>({
  formView,
  submitAction,
  redirectPath
}: FormControllerProps<T>) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, control } = useForm<T>({
    defaultValues: formView.defaultValues,
  });

  const onSubmit: SubmitHandler<T> = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitAction(data);

      if (result.success) {
        if (redirectPath) {
          router.push(redirectPath);
        }
      } else {
        setError(result.message || 'An error occurred');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (redirectPath) {
      router.push(redirectPath);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formView.render({
        register,
        control,
        errors,
        isSubmitting,
        onCancel: handleCancel,
        error
      })}
    </form>
  );
};

export default FormController;

*/
