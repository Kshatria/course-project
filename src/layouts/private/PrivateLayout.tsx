import type { ReactNode } from 'react';
import styles from './PrivateLayout.module.css';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateLayout = ({ children }: PrivateRouteProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Я авторизован! УЕЕЕ!</h1>
      {children}
    </div>
  );
};

export { PrivateLayout };
