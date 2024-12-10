// app/page.tsx

import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>Welcome to Our Shop!</h1>
          <p>Discover the best products for your needs</p>
          <button className={styles.shopNowBtn}>Shop Now</button>
        </div>
      </section>
    </div>
  );
}
