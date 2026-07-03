import Button from "./components/ui/Button/Button";
import Field from "./components/ui/Field/Field";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 15,
      }}
    >
      <h1>Список целей</h1>
      <Button type="submit">Добавить цель</Button>
      <Field id="first_input" label="Введите цель" placeholder="Вводи давай" />
    </div>
  );
};

export default App;
