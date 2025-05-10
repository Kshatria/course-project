import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/ui';
import { FormLoginData } from './FormLogin.types';
import styles from './FormLogin.module.css';

const FormLogin: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormLoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormLoginData> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Форма отправлена:', data);
      reset();
      alert('Вход выполнен успешно!');
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Вход в систему</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          type="email"
          label="Email"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email',
            },
          })}
        />

        <Input
          type="password"
          label="Пароль"
          error={errors.password?.message}
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: {
              value: 8,
              message: 'Пароль должен быть не менее 8 символов',
            },
          })}
        />

        <Link to="/registration">Зарегистрироваться</Link>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export { FormLogin, type FormLoginData };
