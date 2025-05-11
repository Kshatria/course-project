import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '@/stores/useAuth';
import styles from './UserDropdown.module.css'; // Импорт стилей

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.iconButton} type="button" onClick={() => setIsOpen(!isOpen)}>
        <FaUser className="text-gray-700" />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <button
            className={styles.menuItem}
            type="button"
            onClick={() => {
              navigate('/profile');
              setIsOpen(false);
            }}
          >
            Личный кабинет
          </button>
          <button
            className={styles.menuItem}
            type="button"
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
          >
            Выход
          </button>
        </div>
      )}
    </div>
  );
};

export { UserDropdown };
