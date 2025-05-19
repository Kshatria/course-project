import { type FC } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { ChangeOperationForm, Modal } from '@/components';
import { OPERATION } from '@/graphql';
import { useModal } from '@/hooks';
import { InformerDetail } from '@/ui';

const Operation: FC = () => {
  let params = useParams();
  const modal = useModal();
  const { data, error, loading } = useQuery(OPERATION, {
    variables: {
      getOneId: params.id,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  const operation = data?.operations.getOne || null;

  return (
    <div>
      <InformerDetail {...operation} onClick={modal.show} />
      <Modal visible={modal.visible} onClose={modal.hide}>
        <ChangeOperationForm {...operation} closeFN={modal.hide} />
      </Modal>
    </div>
  );
};

export { Operation };
