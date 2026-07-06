import Button from "./components/ui/Button/Button";
import Card from "./components/ui/Card/Card";
import Field from "./components/ui/Field/Field";
import Select from "./components/ui/Select/Select";
import Badge from "./components/ui/Badge/Badge";
import ServiceCard from "./components/ui/ServiceCard/ServiceCard";

import mansHaircutIcon from "./assets/service_icons/mansHaircut.png";
import beardDecorIcon from "./assets/service_icons/beardDecor.png";
import hairAndBeardIcon from "./assets/service_icons/hairAndBeard.png";
import kidsHaircutIcon from "./assets/service_icons/kidsHaircut.png";
import hairDryerIcon from "./assets/service_icons/hairDryer.png";

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
      <ServiceCard
        icon={mansHaircutIcon}
        title="Мужская стрижка"
        description="Классическая или современная стрижка"
        duration={45}
        price={1200}
      />
      <Button type="submit">Добавить цель</Button>
      <Field
        type="select "
        id="first_input"
        label="Введите цель"
        placeholder="Вводи давай"
      />
      <Select id="service" label="Услуга" options={services} />
      <Card>
        <p>Это карточка</p>
      </Card>
      <Badge type="confirmed"></Badge>
      <Badge type="new"></Badge>
      <Badge type="completed"></Badge>
      <Badge type="cancelled"></Badge>
    </div>
  );
};

export default App;
