import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { CATEGORIES, OPERATION_PATCH } from '@/graphql';
import type { ChangeOperationFormProps } from './ChangeOperationForm.types';
import styles from './ChangeOperationForm.module.css'

const ChangeOperationForm = (props: ChangeOperationFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ChangeOperationFormProps & { category: string}>({
    defaultValues: {
      name: props.name || '',
      desc: props.desc || '',
      amount: props.amount || 0,
      date: props.date,
      category: props.category.id,
    },
  });
  const { data, error, loading } = useQuery(CATEGORIES, {
    variables: {
      input: {},
    },
    fetchPolicy: 'network-only',
  });

  const [patch] = useMutation(OPERATION_PATCH);

  const submit:SubmitHandler<ChangeOperationFormProps> = async (elements) => {
    try {
      await  patch({
        variables: {
          patchId:  props.id,
          input: {
            name: elements.name,
            desc: elements.desc,
            amount: Number(elements.amount),
            date: elements.date,
            categoryId: elements.category ,
          }
        },
      })
      props.closeFN()
    } catch (err) {
      throw new Error(`Ошибка входа: ${err}`);
    }

  }
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;
  console.log(data)
  console.log( loading, error)
  console.log(errors)
  return (
    <form className={styles['change-form']} onSubmit={handleSubmit(submit)}>
      <input
        placeholder={'Name'}
        {...register('name')}
      />
      <input
        placeholder={'desc'}
        {...register('desc')}
      />
      <input
        placeholder={'amount'}
        {...register('amount')}
      />
      <input
        placeholder={'date'}
        {...register('date')}
      />
      <select {...register('category')} defaultValue={props.category?.id}>
        {data !== undefined && data.categories.getMany.data.map((item: any) => (
          <option key={item.id} value={item.id}>{(item.name)}</option>
        )) }
      </select>
      <button type={'submit'}>Submit</button>
    </form>
  )
}

export { ChangeOperationForm, type ChangeOperationFormProps }
