import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { ChangeCategoryForm, Modal } from '@/components';
import { CATEGORY_ONE } from '@/graphql';
import { useModal } from '@/hooks';

const Category = () => {
  let params = useParams();
  const modal = useModal()
  const { data, error, loading } = useQuery(CATEGORY_ONE, {
    variables: {
      getOneId: params.id
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  const categories = data?.categories.getOne || null;

  return (
    <div>

      <p>Дата создания</p>
      <time>
        {dayjs(categories.createdAt).format('DD.MM.YYYY')}
      </time>

      <p>Дата последнего обновления</p>
      <time>
        {dayjs(categories.updatedAt).format('DD.MM.YYYY')}
      </time>

      <p>Имя</p>
      <p>{categories.name}</p>

      <button
        onClick={modal.show}
      >
        Нажми меня
      </button>
      <Modal visible={modal.visible} onClose={modal.hide}>
        <ChangeCategoryForm {...categories} closeFN={modal.hide} />
      </Modal>
    </div>
  )
}

export { Category }
