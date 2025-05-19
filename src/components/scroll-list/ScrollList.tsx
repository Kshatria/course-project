import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Informer, type InformerProps, Loader } from '@/ui';
import styles from './ScrollList.module.css';

type ScrollListProps = InformerProps & {
  onScroll: () => void;
  type: 'dashboard' | 'categories';
};

const ScrollList = ({ defaultItems, onScroll, type = 'dashboard' }: any) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);

  const fetchMoreItems = useCallback(() => {
    return;
    // if (loading) return;

    // setLoading(true);

    // setTimeout(() => {
    // Искуственная задержка. Она тут не нужна. Лоадер классный =)
    //   const currentDate = new Date().toLocaleString('ru-RU');
    //   setItems((prev) => [...prev]);

    //   setLoading(false);
    // }, 2000);
  }, [loading, setLoading]);

  useEffect(() => {
    fetchMoreItems();
  }, [fetchMoreItems]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreItems();
        }
      },
      { threshold: 1.0 },
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, [fetchMoreItems]);

  return (
    <article className={styles['scroll-list']}>
      <div className={styles.wrapper}>
        {defaultItems.map((item: any) => (
          <Link to={`/${type}/${item.id}`} className={styles.item} key={item.id}>
            <Informer {...item} />
          </Link>
        ))}
      </div>
      <div ref={loadMoreRef} style={{ height: '20px' }} />
      {loading && <Loader />}
    </article>
  );
};

export { ScrollList };
