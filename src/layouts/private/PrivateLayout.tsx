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
        <BackButton />
        <h1 className={styles.header}>Я авторизован! УЕЕЕ!</h1>
        <Link to={'/dashboard'}>Dashboard</Link>
        <Link to={'/categories'}>Categories</Link>
        <UserDropdown />
      </div>
      {children}
    </div>
  );
};

export { PrivateLayout };
