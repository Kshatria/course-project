import { type SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '@/graphql';
import { useAuth } from '@/stores/useAuth';
import { Button, Input } from '@/ui';
import type { FormRegistrationData } from './FormRegistration.types';
import styles from './FormRegistration.module.css';

const FormRegistration = () => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    watch,
  } = useForm<FormRegistrationData>({ mode: 'onChange' });
  const { login } = useAuth();

  const [signup, { error: gqlError, loading }] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      login(data.profile.signup.token);
    },
    onError: (err) => {
      throw new Error(`Ошибка регистрации: ${err.message}`);
    },
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<FormRegistrationData> = async (data) => {
    try {
      await signup({
        variables: {
          email: data.email,
          password: data.password,
          commandId: '7808',
        },
      });
    } catch (err) {
      throw new Error(`Ошибка регистрации: ${err}`);
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form} data-testid="register-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.email?.message}
          id="email"
          label="Email"
          type="email"
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email',
            },
          })}
        />

        <Input
          error={errors.password?.message}
          id="password"
          label="Пароль"
          type="password"
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
          error={errors.confirmPassword?.message}
          id="repeatPassword"
          label="Повторите пароль"
          type="password"
          {...register('confirmPassword', {
            required: 'Повторите пароль',
            validate: (value) => value === password || 'Пароли не совпадают',
          })}
        />

        <Link to="/login">Авторизоваться</Link>

        <Button
          color={'Primary'}
          disabled={!isValid || loading}
          text={loading ? 'Загрузка...' : 'Зарегистрироваться'}
          type={'submit'}
        />

        {gqlError && <p className={styles.error}>{gqlError.message}</p>}
      </form>
    </div>
  );
};

export { FormRegistration, type FormRegistrationData };
