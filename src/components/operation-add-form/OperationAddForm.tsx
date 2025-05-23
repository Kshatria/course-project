import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useApolloErrorHandler } from '@/apollo/useApolloErrorHandler';
import { OPERATION_ADD } from '@/graphql/mutations';
import { useCategories } from '@/hooks';
import { useToast } from '@/serviсes/ToastContext';
import { Button, Input, Select } from '@/ui';
import type { OperationAddFormProps, OperationAddFormSentProps } from './OperationAddForm.types';
import styles from './OperationAddForm.module.css';

const OperationAddForm: FC<OperationAddFormProps> = ({ closeFN }) => {
  const { show } = useToast();
  const { handleQueryErrors } = useApolloErrorHandler();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<OperationAddFormSentProps>({
    defaultValues: {
      name: '',
      desc: '',
      amount: 0,
      date: new Date().getDate().toString(),
      category: '',
      type: 'Cost',
    },
  });

  const { categories, loading } = useCategories();

  const [patch] = useMutation(OPERATION_ADD);

  const submit: SubmitHandler<OperationAddFormSentProps> = async (el) => {
    try {
      await patch({
        variables: {
          input: {
            name: el.name,
            desc: el.desc,
            amount: Number(el.amount),
            categoryId: el.category,
            type: el.type,
            date: el.date,
          },
        },
      });
      closeFN();
    } catch (error) {
      const processedErrors = handleQueryErrors(error);
      show(processedErrors, 'error');
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      <div className={styles.field}>
        <Input
          error={errors.name?.message}
          label="Наименование"
          {...register('name', {
            required: 'Не заполнено поле',
          })}
        />
      </div>
      <div className={styles.field}>
        <Input label="Описание" {...register('desc')} />
      </div>
      <div className={styles.field}>
        <Input
          error={errors.amount?.message}
          label="Стоимость"
          {...register('amount', {
            required: 'Не заполнено поле'
          })}
        />
      </div>
      <div className={styles.field}>
        <Input
          error={errors.date?.message}
          label="Дата"
          type="date"
          {...register('date', {
            required: 'Не выбрана дата',
          })}
        />
      </div>
      <div className={styles.field}>
        <Select
          label="Категория"
          options={[
            { id: 'Cost', name: 'Cost' },
            { id: 'Profit', name: 'Profit' },
          ]}
          {...register('type')}
          onChange={(id) => {
            setValue('type', id as 'Cost' | 'Profit');
          }}
        />
      </div>
      <div className={styles.field}>
        <Select
          label="Категория"
          options={categories}
          {...register('category', {
            required: 'Не выбрана категория',
          })}
          error={errors.category?.message}
          onChange={(id) => {
            setValue('category', id);
          }}
        />
      </div>
      <Button text="Добавить" type={'submit'} />
    </form>
  );
};

export { OperationAddForm, type OperationAddFormProps };
