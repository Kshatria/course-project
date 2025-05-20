import { type FC } from 'react';
import { useQuery } from '@apollo/client';
import { CategoryAddForm, Modal, List } from '@/components';
import { CATEGORIES } from '@/graphql/queries/categories';
import { useModal } from '@/hooks';
import { Button } from '@/ui';

const Categories: FC = () => {
  const modal = useModal();
  const { data, error, loading } = useQuery(CATEGORIES, {
    variables: {
      input: {},
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;
  const categories = data?.categories?.getMany?.data || [];

  console.log(categories);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px' }}>
        <Button onClick={modal.show} text="Добавить операцию" />
      </div>
      <List defaultItems={categories} type="categories" />
      <Modal visible={modal.visible} onClose={modal.hide}>
        <CategoryAddForm closeFN={modal.hide} />
      </Modal>
    </div>
  );
};

export { Categories };
