import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useApolloErrorHandler } from '@/apollo/useApolloErrorHandler';
import { OPERATION_PATCH } from '@/graphql';
import { useCategories } from '@/hooks';
import { useToast } from '@/serviсes/ToastContext';
import { Button, Input, Select } from '@/ui';
import type { ChangeOperationFormProps } from './ChangeOperationForm.types';
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
  const { categories, loading } = useCategories();

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
        <Input error={errors.name?.message} label="Наименование" {...register('name', {
          required: 'Поле наименование не заполнено'
        })} />
      </div>
      <div className={styles.field}>
        <Input label="Описание" {...register('desc')} />
      </div>
      <div className={styles.field}>
        <Input error={errors.amount?.message} label="Стоимость" {...register('amount', {
          required: 'Поле стоимость не заполнено'
        })} />
      </div>
      <div className={styles.field}>
        <Input error={errors.date?.message} label="Дата" type="date" {...register('date', {
          required: 'Поле дата не заполнено'
        })} />
      </div>
      <div className={styles.field}>
        <Select
          defaultValue={props.category.id}
          label="Категория"
          options={categories}
          {...register('category', {
            required: 'Категория не выбрана'
          })}
          onChange={(id) => {
            setValue('category', id);
          }}
        />
      </div>
      <Button text="Изменить" type={'submit'} />
    </form>
  );
};

export { ChangeOperationForm, type ChangeOperationFormProps };
