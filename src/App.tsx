import Button from "./components/ui/Button/Button";
import Card from "./components/ui/Card/Card";
import Field from "./components/ui/Field/Field";
import Select from "./components/ui/Select/Select";

const App = () => {
  const services = [
    { value: "haircut", label: "Мужская стрижка" },
    { value: "beard", label: "Оформление бороды" },
    { value: "combo", label: "Стрижка + борода" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 15,
      }}
    >
      <h1>Запись в барбершоп</h1>
      <Button type="submit">Добавить цель</Button>
      <Field id="first_input" label="Введите цель" placeholder="Вводи давай" />
      <Select id="service" label="Услуга" options={services} />
      <Card>
        <p>Это карточка</p>
      </Card>
    </div>
  );
};

export default App;
