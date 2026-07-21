import * as yup from "yup";

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

const maxDate = new Date(currentDate);
maxDate.setMonth(maxDate.getMonth() + 3);

export const bookSchema = yup.object({
  service: yup
    .number()
    .required("Выберите услугу")
    .typeError("Выберите услугу"),

  name: yup
    .string()
    .trim()
    .required("Введите ваше имя")
    .max(30, "Имя не должно быть длиннее 30 символов"),

  phone: yup
    .string()
    .required("Введите номер телефона")
    .matches(/^\+7\d{10}$/, "Введите корректный номер телефона"),

  date: yup
    .date()
    .required("Выберите дату")
    .typeError("Выберите корректную дату")
    .min(currentDate, "Дата не может быть раньше текущей")
    .max(maxDate, "Запись доступна максимум на 3 месяца вперед"),

  time: yup.string().required("Выберите время"),
});

export type BookingFormData = yup.InferType<typeof bookSchema>; // тип извлекается автоматически из схемы
