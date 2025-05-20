import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CATEGORY_ADD } from '@/graphql/mutations';
import type { CategoryAddFormProps, CategoryAddFormSentProps } from './CategoryAddForm.types';
import styles from './CategoryAddForm.module.css';
import { Input, Button } from '@/ui';

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
      const formData = {
        variables: {
          addInput2: {
            name: data.name,
            photo: data.photo,
          },
        },
      }
      await patch(formData);
      closeFN();
    } catch (err) {
      throw new Error(`Ошибка входа: ${err}`);
    }
  };
  console.log(errors);
  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      <div className={styles.field}>
        <Input label="Наименование" {...register('name')} />
      </div>
      <div className={styles.field}>
        <Input label="Описание" {...register('photo')} />
      </div>
      <Button type={'submit'} text="Добавить" />
    </form>
  );
};

export { CategoryAddForm, type CategoryAddFormProps };
