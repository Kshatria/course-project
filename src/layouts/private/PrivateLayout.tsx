import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BackButton, UserDropdown } from '@/components';
import styles from './PrivateLayout.module.css';

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateLayout = ({ children }: PrivateRouteProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.nav}>
          <BackButton />
          <h1 className={styles.header}>Я авторизован! УЕЕЕ!</h1>
        </div>
        <div className={styles.nav}>
          <Link className={styles.link} to={'/dashboard'}>
            Операции
          </Link>
          <Link className={styles.link} to={'/categories'}>
            Категории
          </Link>
          <UserDropdown />
        </div>
      </div>
      {children}
    </div>
  );
};

export { PrivateLayout };
