import { type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { OPERATION_ADD } from '@/graphql/mutations';
import type { OperationAddFormProps, OperationAddFormSentProps } from './OperationAddForm.types';
import { CATEGORIES } from '@/graphql';

const OperationAddForm: FC<OperationAddFormProps> = ({ closeFN }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<OperationAddFormSentProps>({
    defaultValues: {
      name: '',
      desc: '',
      amount: 0,
      date: new Date().getDate().toString(),
      category: '',
      type: 'Cost'
    },
  });

  const { data, error, loading } = useQuery(CATEGORIES, {
    variables: {
      input: {},
    },
    fetchPolicy: 'network-only',
  });


  const [patch] = useMutation(OPERATION_ADD);

  const submit:SubmitHandler<OperationAddFormSentProps> = async (el) => {
    try {
      console.log(el)
      await  patch({
        variables: {
          input: {
            name: el.name,
            desc: el.desc,
            amount: Number(el.amount),
            categoryId: el.category,
            type: el.type,
            date: el.date
          }
        },
      })
      closeFN()
    } catch (err) {
      throw new Error(`Ошибка входа: ${err}`);
    }

  }

  console.log( loading, error)
  console.log(errors)
  return (
    <form onSubmit={handleSubmit(submit)}>
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
      <input placeholder={'date'} type={'date'}
             {...register('date')} />

      <select  {...register('type')}>
        <option value={'Cost'}>Cost</option>
        <option value={'Profit'}>Profit</option>
      </select>

      <select {...register('category')}>
        {data !== undefined && data.categories.getMany.data.map((item: any) => (
          <option key={item.id} value={item.id}>{(item.name)}</option>
        ))}
      </select>
      <button type={'submit'}>Submit</button>
    </form>
  )
}

export { OperationAddForm, type OperationAddFormProps }
