import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CATEGORY_ADD } from '@/graphql/mutations';
import type { CategoryAddFormProps, CategoryAddFormSentProps } from './CategoryAddForm.types';

const CategoryAddForm: FC<CategoryAddFormProps> = ({ closeFN }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CategoryAddFormSentProps>({
    defaultValues: {
      name: '',
      photo: '',
    },
  });

  const [patch] = useMutation(CATEGORY_ADD);

  const submit: SubmitHandler<CategoryAddFormSentProps> = async (data) => {
    try {
      await patch({
        variables: {
          addInput2: {
            name: data.name,
            photo: data.photo,
          },
        },
      });
      closeFN();
    } catch (err) {
      throw new Error(`Ошибка входа: ${err}`);
    }
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(submit)}>
      <input placeholder={'Name'} {...register('name')} />
      <input placeholder={'desc'} {...register('photo')} />
      <button type={'submit'}>Submit</button>
    </form>
  );
};

export { CategoryAddForm, type CategoryAddFormProps };
