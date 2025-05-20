import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CATEGORY_ADD } from '@/graphql/mutations';
import type { CategoryAddFormProps, CategoryAddFormSentProps } from './CategoryAddForm.types';
import { Input, Button } from '@/ui';
import { useApolloErrorHandler } from '@/apollo/useApolloErrorHandler';
import { useToast } from '@/serviсes/ToastContext';
import styles from './CategoryAddForm.module.css';

const CategoryAddForm: FC<CategoryAddFormProps> = ({ closeFN }) => {
  const { show } = useToast();
  const { handleQueryErrors } = useApolloErrorHandler();

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

  const [patch, { loading }] = useMutation(CATEGORY_ADD);

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
    } catch (error) {
      const processedErrors = handleQueryErrors(error);
      show(processedErrors, 'error');
    }
  };

  if (loading) return <p>Загрузка...</p>;
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
