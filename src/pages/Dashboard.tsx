import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { OperationAddForm, Modal } from '@/components';
import { OPERATIONS } from '@/graphql';
import { useModal } from '@/hooks';

const Dashboard: FC = () => {
  const modal = useModal()
  const { data, error, loading } = useQuery(OPERATIONS, {
    variables: {
     input: {

     }
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;
  const operations = data?.operations?.getMany?.data || [];
  return <div>
    <button onClick={modal.show}>Add Category</button>
    {operations.length > 0 ? (
      operations.map((item: any) => (
        <Link key={item.id} to={`/dashboard/${item.id}`}>
          <p>{item.type}</p>
          <h3>{item.name}</h3>
          <p>{item.amount}</p>
        </Link>
      ))
    ) : (
      <p>Нет данных</p>
    )}

    <Modal visible={modal.visible} onClose={modal.hide}>
      <OperationAddForm closeFN={modal.hide} />
    </Modal>
  </div>;
};

export { Dashboard };
