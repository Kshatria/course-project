import { useEffect } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import styles from './Toast.module.css';

const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const iconMap = {
    error: <FaExclamationCircle className={styles.icon} />,
    success: <FaCheckCircle className={styles.icon} />,
    info: <FaInfoCircle className={styles.icon} />,
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.content}>
        {iconMap[type]}
        <span>{message}</span>
      </div>
      <button onClick={onClose} className={styles.closeButton}>
        &times;
      </button>
    </div>
  );
};

export { Toast };
