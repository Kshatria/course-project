import type { InformerProps } from './Informer.types';
import styles from './Informer.module.css';

const Informer = ({
  id,
  category,
  desc,
  name,
  amount,
  commandId,
  createdAt,
  photo,
  updatedAt,
}: InformerProps) => {
  return (
    <article className={styles.informer} id={id}>
      <div className={styles.wrapper}>
        {category && <div className={styles.category}>{category.name}</div>}
        {amount && <div className={styles.amount}>{amount + '$'}</div>}
      </div>
      <div className={styles.name}>{name}</div>
      {desc && <div className={styles.desc}>{desc}</div>}
    </article>
  );
};

export { Informer, type InformerProps };
