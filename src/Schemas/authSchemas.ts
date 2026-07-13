import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Введите email")
    .email("Введите корректный email"),

  password: yup
    .string()
    .required("Введите пароль")
    .min(8, "Пароль должен быть не короче 8 символов"),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Введите имя")
    .max(30, "Имя не должно быть длиннее 30 символов"),

  phone: yup
    .string()
    .required("Введите номер телефона")
    .matches(/^\+7\d{10}$/, "Введите корректный номер телефона"),

  email: yup
    .string()
    .trim()
    .required("Введите email")
    .email("Введите корректный email"),

  password: yup
    .string()
    .required("Введите пароль")
    .min(8, "Пароль должен быть не короче 8 символов"),

  confirmPassword: yup
    .string()
    .required("Повторите пароль")
    .oneOf([yup.ref("password")], "Пароли должны совпадать"),
});
