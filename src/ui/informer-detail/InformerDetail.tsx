import dayjs from 'dayjs';
import { Button } from '@/ui';
import type { InformerDetailProps } from './InformerDetail.types';
import styles from './InformerDetail.module.css';

const InformerDetail = ({
  id,
  category,
  createdAt,
  updatedAt,
  desc,
  disabled = false,
  name,
  amount,
  photo,
  commandId,
  onClick,
}: InformerDetailProps) => {
  const _category = category?.name || commandId;

  return (
    <article className={styles['informer-detail']} id={id}>
      <div className={styles.wrapper}>
        {_category && <div className={styles.category}>{_category}</div>}
        {createdAt && (
          <div className={styles.date}>{`Создано: ${dayjs(createdAt).format('DD.MM.YYYY')}`}</div>
        )}
        {updatedAt && (
          <div className={styles.date}>{`Обновлено: ${dayjs(updatedAt).format('DD.MM.YYYY')}`}</div>
        )}
      </div>
      <div className={styles.name}>{name}</div>
      {desc && <div className={styles.desc}>{desc}</div>}
      {amount && <div className={styles.sum}>{`${amount}$`}</div>}
      {photo && (
        <div>
          <img src={photo} width={40} height={40} />
        </div>
      )}
      <Button disabled={disabled} text="Редактировать" onClick={onClick} color="Secondary" />
    </article>
  );
};

export { InformerDetail, type InformerDetailProps };
