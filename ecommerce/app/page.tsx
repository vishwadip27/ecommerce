import Image from "next/image";
import styles from "./page.module.css";
import About from "./components/About/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <About />
    </div>
  );
}
