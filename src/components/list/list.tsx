import { Link } from 'react-router-dom';
import { Informer, Loader } from '@/ui';
import { ListProps } from './list.types';
import styles from './List.module.css';

const List = ({ defaultItems, type = 'dashboard' }: ListProps) => {
  return (
    <article className={styles.list}>
      <div className={styles.wrapper}>
        {defaultItems.map((item: any) => (
          <Link to={`/${type}/${item.id}`} className={styles.item} key={item.id}>
            <Informer {...item} />
          </Link>
        ))}
      </div>
      <Loader />
      <span className={styles.sub}>Ниже мордов ничего нет. Это конец.</span>
    </article>
  );
};

export { List };
