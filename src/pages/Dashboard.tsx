import type { FC } from 'react';
import { useQuery } from '@apollo/client';
import { OPERATIONS } from '@/graphql';

const Dashboard: FC = () => {
  const { loading, error, data } = useQuery(OPERATIONS, {
    variables: {
      input: {
        // categoryIds: null,
        // createdAt: {
        //   gte: null,
        //   lte: null,
        // },
        // date: {
        //   gte: null,
        //   lte: null,
        // },
        // ids: null,
        // name: null,
        pagination: {
          pageNumber: 1,
          pageSize: 10,
        },
        // sorting: {
        //   field: null,
        //   type: null,
        // },
        type: 'Cost',
        // updatedAt: {
        //   gte: null,
        //   lte: null,
        // },
      },
    },
    fetchPolicy: 'cache-first',
  });

  console.log(data);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return <div>Dashboard в разработке</div>;
};

export { Dashboard };
