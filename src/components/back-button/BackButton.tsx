import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '@/stores/useAuth';
import styles from './BackButton.module.css';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth } = useAuth();

  const ALLOWED_PATHS = ['/dashboard', '/profile', '/categories'];

  const historyRef = useRef<string[]>([]);

  useEffect(() => {
    if (isAuth && ALLOWED_PATHS.includes(location.pathname)) {
      if (historyRef.current[historyRef.current.length - 1] !== location.pathname) {
        historyRef.current = [...historyRef.current, location.pathname];
      }
    }
  }, [location.pathname, isAuth]);

  const END_ARRAY_ITEM = 2;

  const handleGoBack = () => {
    const history = historyRef.current;
    if (history.length > 1) {
      const prevPath = history[history.length - END_ARRAY_ITEM];
      navigate(prevPath);
    } else {
      navigate('/dashboard');
    }
  };

  const shouldShowButton =
    isAuth && ALLOWED_PATHS.includes(location.pathname) && historyRef.current.length !== 0;

  if (!shouldShowButton) return null;

  return (
    <button className={styles.button} type="button" onClick={handleGoBack}>
      <FiArrowLeft className="text-lg" />
      <span>Назад</span>
    </button>
  );
};

export { BackButton };
