import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../../UI/Button/Button";
import Card from "../../../UI/Card/Card";
import Field from "../../../UI/Field/Field";
import Select from "../../../UI/Select/Select";

import type { Service } from "../types";
import { type BookingFormData, bookSchema } from "./bookSchema";

import { createBooking } from "../../../../Api/bookingApi";

import styles from "./BookingForm.module.scss";
import calenderLight from "../../../../assets/icons/calendar_light.svg";
import calenderDark from "../../../../assets/icons/calendar_dark.svg";
import { useAuth } from "../../../../Context/AuthContext/useAuth";

type BookingFormProps = {
  services: Service[];
  selectedServiceId: string;
  onServiceSelect: (serviceId: string) => void;
};

const BookingForm = (props: BookingFormProps) => {
  const { services, selectedServiceId, onServiceSelect } = props;

  const { user } = useAuth();

  const serviceOptions = services.map((service) => ({
    value: String(service._id),
    label: service.title,
  }));
  const timeOptions = Array.from({ length: 12 }, (_, index) => {
    const hour = index + 9;
    const time = `${hour}:00`;

    return {
      value: time,
      label: time,
    };
  });

  const selectedService = services.find(
    (service) => String(service._id) === selectedServiceId,
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: yupResolver(bookSchema),
    defaultValues: {
      service: undefined,
      name: "",
      phone: "",
      time: "",
    },
  });

  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data: BookingFormData) => {
    setSubmitMessage("");
    setSubmitError("");

    try {
      await createBooking({
        serviceId: String(data.service),
        date: data.date.toISOString().split("T")[0], // обрезает время
        time: data.time,
        name: data.name,
        phone: data.phone,
      });

      setSubmitMessage(
        "Запись успешно создана, мы свяжемся с вами для подтверждения",
      );
    } catch {
      setSubmitError("Не удалось создать запись. Попробуйте еще раз");
    }
  };

  const selectedDateWatch = useWatch({ control, name: "date" });
  const selectedTimeWatch = useWatch({ control, name: "time" });

  useEffect(() => {
    if (selectedServiceId) {
      setValue("service", Number(selectedServiceId), {
        shouldValidate: true,
      });
    }
  }, [selectedServiceId, setValue]);

  useEffect(() => {
    if (!user) {
      return;
    }

    setValue("name", user.name);
    setValue("phone", user.phone);
  }, [user, setValue]);

  return (
    <Card className={styles.bookingForm}>
      <div className={styles.header}>
        <img className={styles.icon} src={calenderDark} />
        <h2 className={styles.title}>Запись онлайн</h2>
      </div>

      <div className={styles.formContent}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <Select
                id="service"
                label="Услуга"
                placeholder="Выберите услугу"
                isPlaceholder={!field.value}
                options={serviceOptions}
                error={errors.service?.message}
                value={field.value ? String(field.value) : ""}
                onChange={(event) => {
                  const serviceId = event.target.value;

                  field.onChange(Number(serviceId));
                  onServiceSelect(serviceId);
                }}
              />
            )}
          />
          <Field
            id="name"
            label="Имя"
            placeholder="Введите ваше имя"
            {...register("name")}
            error={errors.name?.message}
          />
          <Field
            id="phone"
            label="Телефон"
            placeholder="+79999999999"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
          />

          <div className={styles.dateTime}>
            <div className={styles.dateTimeField}>
              <Field
                className={styles.dateField}
                id="date"
                label="Дата"
                type="date"
                isPlaceholder={!selectedDateWatch}
                {...register("date")}
                error={errors.date?.message}
              />
            </div>

            <div className={styles.dateTimeField}>
              <Select
                className={styles.timeField}
                id="time"
                label="Время"
                placeholder="Выберите время"
                isPlaceholder={!selectedTimeWatch}
                options={timeOptions}
                {...register("time")}
                error={errors.time?.message}
              />
            </div>
          </div>

          <Button
            icon={calenderLight}
            className={styles.button}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Записаться"}
          </Button>

          <p className={styles.mark}>
            {submitMessage && submitMessage}
            {submitError && submitError}
          </p>
        </form>

        {selectedService && (
          <Card className={styles.selectedBlock}>
            <span>Выбрано: {selectedService.title}</span>
            <span className={styles.selectedParams}>
              {selectedService.duration} мин
            </span>
            <span className={styles.selectedParams}>
              {selectedService.price} ₽
            </span>
          </Card>
        )}
      </div>
    </Card>
  );
};

export default BookingForm;
