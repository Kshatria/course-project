import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CategoryAddForm , Modal } from '@/components';
import { CATEGORIES } from '@/graphql/queries/categories';
import { useModal } from '@/hooks';

const Categories: FC = () => {
  const modal = useModal()
  const { data, error, loading } = useQuery(CATEGORIES, {
    variables: {
      input: {}
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;
  const categories = data?.categories?.getMany?.data || [];

  return (
    <div>
      <button onClick={modal.show}>Add Category</button>
      {categories.length > 0 ? (
        categories.map((item: any) => (
          <Link key={item.id} to={`/categories/${item.id}`}>
            <h3>{item.name}</h3>
          </Link>
        ))
      ) : (
        <p>Нет данных</p>
      )}
      <Modal visible={modal.visible} onClose={modal.hide}>
        <CategoryAddForm closeFN={modal.hide} />
      </Modal>
    </div>

  )
}

export { Categories }
