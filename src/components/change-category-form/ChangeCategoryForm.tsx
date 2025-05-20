import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CATEGORY_PATCH } from '@/graphql';
import type { ChangeCategoryFormProps } from './ChangeCategoryForm.types';
import { Input, Button } from '@/ui';
import { useApolloErrorHandler } from '@/apollo/useApolloErrorHandler';
import { useToast } from '@/serviсes/ToastContext';
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
          },
        },
      }).then((res) => {
        console.log(res);
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
        <Input label={'Наименование'} {...register('name')} />
      </div>
      <Button type={'submit'} text="Добавить" />
    </form>
  );
};

export { ChangeCategoryForm, type ChangeCategoryFormProps };
