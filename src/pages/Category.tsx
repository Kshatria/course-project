import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { ChangeCategoryForm, Modal } from '@/components';
import { CATEGORY_ONE } from '@/graphql';
import { useModal } from '@/hooks';
import { InformerDetail } from '@/ui';

const Category = () => {
  let params = useParams();
  const modal = useModal();
  const { data, error, loading } = useQuery(CATEGORY_ONE, {
    variables: {
      getOneId: params.id,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  const categories = data?.categories.getOne || null;

  console.log('categories: ', categories);

  return (
    <div>
      <InformerDetail {...categories} onClick={modal.show} />
      <Modal visible={modal.visible} onClose={modal.hide}>
        <ChangeCategoryForm {...categories} closeFN={modal.hide} />
      </Modal>
    </div>
  );
};

export { Category };
