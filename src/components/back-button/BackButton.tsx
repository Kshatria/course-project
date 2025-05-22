import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '@/stores/useAuth';
import styles from './BackButton.module.css';

const BackButton = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    prevPathRef.current = location.pathname;
  }, [location]);

  if (!isAuth) {
    return null;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  if (prevPathRef.current === '/login' || prevPathRef.current === '/registration') {
    return null;
  }

  if (location.pathname === '/') {
    return null;
  }

  return (
    <button className={styles.button} type="button" onClick={handleGoBack}>
      <FiArrowLeft className="text-lg" />
      <span>Назад</span>
    </button>
  );
};

export { BackButton };
