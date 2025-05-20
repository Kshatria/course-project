import { type FC } from 'react';
import { CategoryAddForm, Modal, List } from '@/components';
import { useCategories, useModal } from '@/hooks';
import { Button } from '@/ui';

const Categories: FC = () => {
  const modal = useModal();
  const { categories, error, loading } = useCategories()

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

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
