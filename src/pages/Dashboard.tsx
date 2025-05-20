import type { FC } from 'react';
import { useQuery } from '@apollo/client';
import { OperationAddForm, Modal, List } from '@/components';
import { OPERATIONS } from '@/graphql';
import { useModal } from '@/hooks';
import { Button } from '@/ui';

const Dashboard: FC = () => {
  const modal = useModal();
  const { data, error, loading } = useQuery(OPERATIONS, {
    variables: {
      input: {},
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;
  const operations = data?.operations?.getMany?.data || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px' }}>
        <Button onClick={modal.show} text="Добавить операцию" />
      </div>
      <List defaultItems={operations} type="dashboard" />
      <Modal visible={modal.visible} onClose={modal.hide}>
        <OperationAddForm closeFN={modal.hide} />
      </Modal>
    </div>
  );
};

export { Dashboard };
