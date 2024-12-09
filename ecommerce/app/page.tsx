import styles from "./page.module.css";
import About from "./components/About/page";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./login/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Login />
      <About />
      <Footer />
    </div>
  );
}
