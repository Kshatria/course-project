import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CATEGORY_PATCH } from '@/graphql';
import type { ChangeCategoryFormProps } from './ChangeCategoryForm.types';
import styles from './ChangeCategoryForm.module.css'

const ChangeCategoryForm = (props: ChangeCategoryFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ChangeCategoryFormProps>({
    defaultValues: {
      name: props.name || '',
    },
  });

  const [patch, { error, loading }] = useMutation(CATEGORY_PATCH);

  const submit:SubmitHandler<ChangeCategoryFormProps> = async (data) => {
    try {
      console.log(props.id)
      await  patch({
        variables: {
          "getOneId": null,
          patchId:  props.id,
          input: {
            name: data.name,
          }
        },
      })
        .then((res) => {
          console.log(res)
          props.closeFN()
        })
    } catch (err) {
      throw new Error(`Ошибка входа: ${err}`);
    }

  }


  console.log( loading, error)
  console.log(errors)
  return (
    <form className={styles['change-form']} onSubmit={handleSubmit(submit)}>
      <input
        placeholder={'Name'}
        {...register('name')}
      />
      <button type={'submit'}>Submit</button>
    </form>
  )
}

export { ChangeCategoryForm, type ChangeCategoryFormProps }
