import { type SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/graphql';
import { useAuth } from '@/stores/useAuth';
import { Button, Input } from '@/ui';
import { type FormLoginData } from './FormLogin.types';
import { isServerErrors, getFirstError } from '@/errors';
import styles from './FormLogin.module.css';

const FormLogin = () => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<FormLoginData>({ mode: 'onChange' });
  const { login } = useAuth();

  const [_login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      login(data.profile.signin.token);
    },
    onError: (err) => {
      throw new Error(`Ошибка входа: ${err}`);
    },
  });

  const onSubmit: SubmitHandler<FormLoginData> = async (data) => {
    try {
      await _login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      if (isServerErrors(error)) {
        const firstError = getFirstError(error);
        //showToast(firstError);
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Вход</h2>
      <form className={styles.form} data-testid="login-form" onSubmit={handleSubmit(onSubmit)}>
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
          })}
        />

        <Link to="/registration">Зарегистрироваться</Link>

        <Button
          color="Primary"
          disabled={!isValid || loading}
          text={loading ? 'Вход...' : 'Войти'}
          type="submit"
        />
      </form>
    </div>
  );
};

export { FormLogin, type FormLoginData };
