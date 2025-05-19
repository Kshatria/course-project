import { Button } from '@/ui';
import type { InformerDetailProps } from './InformerDetail.types';
import styles from './InformerDetail.module.css';

const InformerDetail = ({
  id,
  category,
  createdAt,
  desc,
  disabled = false,
  name,
  amount,
  onClick,
}: InformerDetailProps) => {
  return (
    <article className={styles['informer-detail']} id={id}>
      <div className={styles.wrapper}>
        <div className={styles.category}>{category.name}</div>
        <div className={styles.date}>{createdAt}</div>
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.desc}>{desc}</div>
      <div className={styles.sum}>{amount + '$'}</div>
      <Button disabled={disabled} text="Редактировать" onClick={onClick} color="Secondary" />
    </article>
  );
};

export { InformerDetail, type InformerDetailProps };
