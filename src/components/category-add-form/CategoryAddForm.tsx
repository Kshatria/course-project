import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useApolloErrorHandler } from '@/apollo/useApolloErrorHandler';
import { CATEGORY_ADD } from '@/graphql/mutations';
import { useToast } from '@/serviсes/ToastContext';
import { Button, Input } from '@/ui';
import type { CategoryAddFormProps, CategoryAddFormSentProps } from './CategoryAddForm.types';
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
    } catch (error) {
      const processedErrors = handleQueryErrors(error);
      show(processedErrors, 'error');
    }
  };

  if (loading) return <p>Загрузка...</p>;
  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      <div className={styles.field}>
        <Input error={errors.name?.message} label="Наименование" {...register('name', {
          required: 'Не заполнено поле'
        })} />
      </div>
      <div className={styles.field}>
        <Input label="Фото" {...register('photo')} />
      </div>
      <Button text="Добавить" type={'submit'} />
    </form>
  );
};

export { CategoryAddForm, type CategoryAddFormProps };
