import { type FC } from 'react';
import { useParams } from "react-router";
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs'
import { ChangeOperationForm , Modal } from '@/components';
import { OPERATION } from '@/graphql';
import { useModal } from '@/hooks';


const Card:FC = () => {
  let params = useParams();
  const modal = useModal()
  const { data, error, loading } = useQuery(OPERATION, {
    variables: {
      getOneId: params.id
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  const operation = data?.operations.getOne || null;

  return (
    <div>

      <p>Дата создания</p>
      <time>
        {dayjs(operation.createdAt).format('DD.MM.YYYY')}
      </time>

      <p>Дата последнего обновления</p>
      <time>
        {dayjs(operation.updatedAt).format('DD.MM.YYYY')}
      </time>

      <p>Имя</p>
      <p>{operation.name}</p>

      <p>amount</p>
      <p>{operation.amount}</p>

      <p>Тип</p>
      <p>{operation.type}</p>
      <p>Category</p>
      <p>{operation.category.name}</p>
      <button
        onClick={modal.show}
      >
        Нажми меня
      </button>
      <Modal visible={modal.visible} onClose={modal.hide}>
        <ChangeOperationForm {...operation} closeFN={modal.hide} />
      </Modal>
    </div>
  )
}

export { Card }
