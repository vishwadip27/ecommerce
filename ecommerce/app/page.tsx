// app/page.tsx
'use client'
import { Button } from 'primereact/button';
import styles from './page.module.css';
import Products from './products/page';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.page}>
      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1>Welcome to Our Shop!</h1>
          <p>Discover the best products for your needs</p>
          <Button 
          label='Shop Now'
          className={styles.shopNowBtn}
          onClick={() => {
            router.push('/products');
          }}
          />
        </div>
      </section>
    </div>
  );
}
