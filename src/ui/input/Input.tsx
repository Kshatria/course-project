import { useState, forwardRef } from 'react';
import type { InputType, InputProps } from './Input.types';
import styles from './Input.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = 'text', label, value, onChange, placeholder, error, className = '', ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className={`${styles.container} ${className}`}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${styles.input} ${error ? styles.error : ''}`}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.toggleButton}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          )}
        </div>

        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);

export { Input, type InputType, type InputProps };
