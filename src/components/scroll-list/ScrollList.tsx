import { Link } from 'react-router-dom';
import { Informer, type InformerProps, Loader } from '@/ui';
import styles from './ScrollList.module.css';

type ScrollListProps = {
  defaultItems: InformerProps[];
  type: 'dashboard' | 'categories';
};

const ScrollList = ({ defaultItems, type = 'dashboard' }: ScrollListProps) => {
  return (
    <article className={styles['scroll-list']}>
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

export { ScrollList };
