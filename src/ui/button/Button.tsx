import { clsx } from 'clsx';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

const Button = ({ color, disabled, onClick, text, type = 'button' }: ButtonProps) => {
  const btnClasses = clsx(styles.button, {
    [styles.disabled]: disabled,
    [styles.primary]: color === 'Primary',
    [styles.secondary]: color === 'Secondary',
  });

  return (
    <button
      className={btnClasses}
      disabled={disabled}
      type={type}
      onClick={disabled ? undefined : onClick}
    >
      {text}
    </button>
  );
};

export { Button, type ButtonProps };
