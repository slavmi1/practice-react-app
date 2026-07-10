import styles from "./Home.module.scss";
import HomeAdvantages from "./HomeAdvantages/HomeAdvantages";
import HomeHero from "./HomeHero/HomeHero";

const Home = () => {
  return (
    <div className={styles.home}>
      <HomeHero />
      <HomeAdvantages />
    </div>
  );
};

export default Home;
