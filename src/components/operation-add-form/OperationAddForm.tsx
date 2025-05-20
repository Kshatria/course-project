import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { OPERATION_ADD } from '@/graphql/mutations';
import type { OperationAddFormProps, OperationAddFormSentProps } from './OperationAddForm.types';
import { CATEGORIES } from '@/graphql';
import { Button, Input, Select } from '@/ui';
import styles from './OperationAddForm.module.css';

const OperationAddForm: FC<OperationAddFormProps> = ({ closeFN }) => {
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

  const { data, error, loading } = useQuery(CATEGORIES, {
    variables: {
      input: {},
    },
    fetchPolicy: 'network-only',
  });

  const [patch] = useMutation(OPERATION_ADD);

  const submit: SubmitHandler<OperationAddFormSentProps> = async (el) => {
    try {
      console.log(el);
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
    } catch (err) {
      throw new Error(`Ошибка входа: ${err}`);
    }
  };

  console.log(loading, error);
  console.log(errors);

  if (!data) return <div>Загрузка...</div>;
  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
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
          options={[
            { id: 'Cost', name: 'Cost' },
            { id: 'Profit', name: 'Profit' },
          ]}
          label="Категория"
          {...register('type')}
          onChange={(id) => {
            setValue('type', id as 'Cost' | 'Profit');
          }}
        />
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

export { OperationAddForm, type OperationAddFormProps };
