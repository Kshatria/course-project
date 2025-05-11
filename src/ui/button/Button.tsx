import type { ButtonProps } from './Button.types';
import { clsx } from 'clsx';
import styles from './Button.module.css';

const Button = ({ color, disabled, text, type = 'button', onClick }: ButtonProps) => {
  const btnClasses = clsx(styles.button, {
    [styles.disabled]: disabled,
    [styles.primary]: color === 'Primary',
    [styles.secondary]: color === 'Secondary',
  });

  return (
    <button
      className={btnClasses}
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export { Button, type ButtonProps };
