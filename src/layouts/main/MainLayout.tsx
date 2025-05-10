import type { ReactNode } from 'react';
import styles from './MainLayout.module.css';

interface MainRouteProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainRouteProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Оставь надежду всяк сюда входящий</h1>
      {children}
    </div>
  );
};

export { MainLayout };
