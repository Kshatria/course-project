import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/ui';
import type { FormRegistrationData } from './FormRegistration.types';
import styles from './FormRegistration.module.css';

const FormRegistration = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormRegistrationData>();

  const password = watch('password');

  const onSubmit: SubmitHandler<FormRegistrationData> = async (data) => {
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
    <div className={styles.registrationContainer}>
      <h2 className={styles.title}>Регистрация</h2>
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
              message: 'Минимум 8 символов',
            },
            validate: (value) => /[A-Z]/.test(value) || 'Хотя бы одна заглавная буква',
          })}
        />

        <Input
          type="password"
          label="Повторите пароль"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Повторите пароль',
            validate: (value) => value === password || 'Пароли не совпадают',
          })}
        />

        <Link to="/login">Авторизоваться</Link>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={Object.keys(errors).length > 0}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export { FormRegistration, type FormRegistrationData };
