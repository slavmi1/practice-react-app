import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerSchema } from "../../../Schemas/authSchemas";
import styles from "./RegisterPage.module.scss";
import Button from "../../UI/Button/Button";
import Field from "../../UI/Field/Field";

type RegisterFormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <main className={styles.register}>
      <section className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>

        <p className={styles.subtitle}>
          Создайте аккаунт, чтобы управлять своими записями онлайн
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Field
            id="name"
            label="Имя"
            placeholder="Введите ваше имя"
            autoComplete="name"
            error={errors.name?.message}
            {...register("name")}
          />

          <Field
            id="phone"
            label="Номер телефона"
            placeholder="+79999999999"
            autoComplete="tel"
            type="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />

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
            autoComplete="new-password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Field
            id="confirmPassword"
            label="Подтвердите пароль"
            placeholder="Повторите пароль"
            autoComplete="new-password"
            type="password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button className={styles.submitButton} type="submit">
            Зарегистрироваться
          </Button>
        </form>

        <p className={styles.registerText}>
          Уже есть аккаунт?{" "}
          <Link to="/login" className={styles.authLink}>
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
