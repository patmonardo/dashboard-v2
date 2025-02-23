import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormView } from '@/ui/view/form';

/*
interface FormControllerProps<T> {
  formView: FormView<T>;
}

const FormController = <T,>({ formView }: FormControllerProps<T>) => {
  const { register, handleSubmit, formState: { errors } } = useForm<T>();

  const onSubmit: SubmitHandler<T> = async (data) => {
    await formView.handleSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formView.render()}
      <button type="submit">Submit</button>
      <button type="button" onClick={formView.handleCancel}>Cancel</button>
    </form>
  );
};

export default FormController;

*/
