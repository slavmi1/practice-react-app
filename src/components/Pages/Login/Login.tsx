import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../../../Schemas/authSchemas";
import styles from "./Login.module.scss";
import Button from "../../UI/Button/Button";
import Field from "../../UI/Field/Field";
import AuthLayout from "../../Layouts/AuthLayout/AuthLayout";
import { useAuth } from "../../../Context/AuthContext/useAuth";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  // Достаем из useForm только то, что нужно
  const {
    register, // Подключает input к React Hook Form
    handleSubmit, // Валидирует форму перед отправкой и кладет ошибки в errors
    formState: { errors }, // Достает errors из formState
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate("/profile");
    } catch {
      console.log("Ошибка авторизации");
    }
  };

  return (
    <AuthLayout
      title="Авторизация"
      subtitle="Войдите в аккаунт, чтобы управлять своими записями онлайн"
      footer={
        <>
          Нет аккаунта?{" "}
          <Link to="/register" className={styles.authLink}>
            Зарегистрироваться
          </Link>
        </>
      }
    >
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
    </AuthLayout>
  );
};

export default Login;
