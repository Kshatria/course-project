import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { CATEGORIES, OPERATION_PATCH } from '@/graphql';
import type { ChangeOperationFormProps } from './ChangeOperationForm.types';
import { Button, Input, Select } from '@/ui';
import { useApolloErrorHandler } from '@/apollo/useApolloErrorHandler';
import { useToast } from '@/serviсes/ToastContext';
import styles from './ChangeOperationForm.module.css';

const ChangeOperationForm = (props: ChangeOperationFormProps) => {
  const { show } = useToast();
  const { handleQueryErrors } = useApolloErrorHandler();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<Omit<ChangeOperationFormProps, 'category'> & { category: string }>({
    defaultValues: {
      name: props.name || '',
      desc: props.desc || '',
      amount: props.amount || 0,
      date: props.date,
      category: props.category.id,
    },
  });
  const { data, loading } = useQuery(CATEGORIES, {
    variables: {
      input: {},
    },
    fetchPolicy: 'network-only',
  });

  const [patch] = useMutation(OPERATION_PATCH);

  const submit: SubmitHandler<
    Omit<ChangeOperationFormProps, 'category'> & { category: string }
  > = async (elements) => {
    try {
      await patch({
        variables: {
          patchId: props.id,
          input: {
            name: elements.name,
            desc: elements.desc,
            amount: Number(elements.amount),
            date: elements.date,
            categoryId: elements.category,
          },
        },
      });
      props.closeFN();
    } catch (error) {
      const processedErrors = handleQueryErrors(error);
      show(processedErrors, 'error');
    }
  };
  if (loading) return <p>Загрузка...</p>;
  return (
    <form className={styles['change-form']} onSubmit={handleSubmit(submit)}>
      <div className={styles.field}>
        <Input label="Наименование" {...register('name')} />
      </div>
      <div className={styles.field}>
        <Input label="Описание" {...register('desc')} />
      </div>
      <div className={styles.field}>
        <Input label="Стоимость" {...register('amount')} />
      </div>
      <div className={styles.field}>
        <Input label="Дата" type="date" {...register('date')} />
      </div>
      <div className={styles.field}>
        <Select
          options={data.categories.getMany.data}
          label="Категория"
          {...register('category')}
          onChange={(id) => {
            setValue('category', id);
          }}
        />
      </div>
      <Button type={'submit'} text="Добавить" />
    </form>
  );
};

export { ChangeOperationForm, type ChangeOperationFormProps };
