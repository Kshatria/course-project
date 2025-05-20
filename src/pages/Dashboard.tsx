import type { FC } from 'react';
import { List, Modal, OperationAddForm } from '@/components';
import { useDashboard, useModal } from '@/hooks';
import { Button } from '@/ui';

const Dashboard: FC = () => {
  const modal = useModal();
  const { error, loading, operations } = useDashboard()

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px' }}>
        <Button text="Добавить операцию" onClick={modal.show} />
      </div>
      <List defaultItems={operations} type="dashboard" />
      <Modal visible={modal.visible} onClose={modal.hide}>
        <OperationAddForm closeFN={modal.hide} />
      </Modal>
    </div>
  );
};

export { Dashboard };
