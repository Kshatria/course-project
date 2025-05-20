import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useApolloErrorHandler } from '@/apollo/useApolloErrorHandler';
import { CATEGORY_PATCH } from '@/graphql';
import { useToast } from '@/serviсes/ToastContext';
import { Button, Input } from '@/ui';
import type { ChangeCategoryFormProps } from './ChangeCategoryForm.types';
import styles from './ChangeCategoryForm.module.css';

const ChangeCategoryForm = (props: ChangeCategoryFormProps) => {
  const { show } = useToast();
  const { handleQueryErrors } = useApolloErrorHandler();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ChangeCategoryFormProps>({
    defaultValues: {
      name: props.name || '',
      photo: props.photo || ''
    },
  });

  const [patch, { loading }] = useMutation(CATEGORY_PATCH);

  const submit: SubmitHandler<ChangeCategoryFormProps> = async (data) => {
    try {
      await patch({
        variables: {
          getOneId: null,
          patchId: props.id,
          input: {
            name: data.name,
            photo: data.photo,
          },
        },
      }).then(() => {
        props.closeFN();
      });
    } catch (error) {
      const processedErrors = handleQueryErrors(error);
      show(processedErrors, 'error');
    }
  };
  if (loading) return <p>Загрузка...</p>;
  return (
    <form className={styles['change-form']} onSubmit={handleSubmit(submit)}>
      <div className={styles.field}>
        <Input error={errors.name?.message} label={'Наименование'} {...register('name', {
          required: 'Не заполненное поле наименование'
        })} />
      </div>
      <div className={styles.field}>
        <Input label={'Фото'} {...register('photo')} />
      </div>
      <Button text="Изменить" type={'submit'} />
    </form>
  );
};

export { ChangeCategoryForm, type ChangeCategoryFormProps };
