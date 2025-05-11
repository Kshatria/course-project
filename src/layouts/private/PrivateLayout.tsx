import type { ReactNode } from 'react';
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
        <UserDropdown />
      </div>
      {children}
    </div>
  );
};

export { PrivateLayout };
