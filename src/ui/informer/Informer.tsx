import type { InformerProps } from './Informer.types';
import styles from './Informer.module.css';
import dayjs from 'dayjs';

const Informer = ({
  id,
  category,
  desc,
  name,
  amount,
  commandId,
  photo,
  updatedAt,
}: InformerProps) => {
  const _category = category?.name || commandId;

  return (
    <article className={styles.informer} id={id}>
      <div className={styles.wrapper}>
        {_category && <div className={styles.category}>{_category}</div>}
        <div>
          {amount && <div className={styles.amount}>{`${amount}$`}</div>}
          {updatedAt && <div className={styles.date}>{dayjs(updatedAt).format('DD.MM.YYYY')}</div>}
        </div>
      </div>
      <div className={styles.name}>{name}</div>
      {desc && <div className={styles.desc}>{desc}</div>}
      {photo && (
        <div>
          <img src={photo} width={40} height={40} />
        </div>
      )}
    </article>
  );
};

export { Informer, type InformerProps };
