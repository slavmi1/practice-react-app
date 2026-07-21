import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerSchema } from "../../../Schemas/authSchemas";
import styles from "./Register.module.scss";
import Button from "../../UI/Button/Button";
import Field from "../../UI/Field/Field";
import AuthLayout from "../../Layouts/AuthLayout/AuthLayout";
import { useAuth } from "../../../Context/AuthContext/useAuth";
import { useState } from "react";

type RegisterFormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setAuthError("");
      await registerUser({
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
      navigate("/profile");
    } catch {
      setAuthError(
        "Не удалось зарегистрироваться. Возможно, email уже используется",
      );
    }
  };

  return (
    <AuthLayout
      title="Регистрация"
      subtitle="Создайте аккаунт, чтобы управлять своими записями онлайн"
      footer={
        <>
          Уже есть аккаунт?{" "}
          <Link to="/login" className={styles.authLink}>
            Войти
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

        {authError && <p className={styles.formError}>{authError}</p>}
      </form>
    </AuthLayout>
  );
};

export default Register;
