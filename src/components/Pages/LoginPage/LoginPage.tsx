import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../../../Schemas/authSchemas";
import styles from "./LoginPage.module.scss";
import Button from "../../UI/Button/Button";
import Field from "../../UI/Field/Field";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  // Достаем из useForm только то, что нужно
  const {
    register, // Подключает input к React Hook Form
    handleSubmit, // Валидирует форму перед отправкой и кладет ошибки в errors
    formState: { errors }, // Достает errors из formState
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <main className={styles.login}>
      <section className={styles.card}>
        <h1 className={styles.title}>Авторизация</h1>

        <p className={styles.subtitle}>
          Войдите в аккаунт, чтобы посмотреть свои записи
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Field
            id="email"
            label="Email"
            placeholder="Введите email"
            autoComplete="email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Field
            id="password"
            label="Пароль"
            placeholder="Введите пароль"
            autoComplete="current-password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button className={styles.submitButton} type="submit">
            Войти
          </Button>
        </form>

        <p className={styles.registerText}>
          Нет аккаунта?{" "}
          <Link to="/register" className={styles.authLink}>
            Зарегистрироваться
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
