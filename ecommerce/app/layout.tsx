'use client';

import { useEffect, useState } from 'react';
import localFont from "next/font/local";
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import store from "./store";
import { LOGIN_SUCCESS } from './store/actions/authTypes';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showHeaderFooter = pathname !== "/login" && pathname !== "/signup";

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const body = document.body;
      const bodyStyle = body.style;

      bodyStyle.removeProperty('overflow');
      bodyStyle.removeProperty('padding');
      bodyStyle.removeProperty('margin');

      bodyStyle.overflow = 'auto'; 
      bodyStyle.padding = '0';      
      bodyStyle.margin = '0';       

      body.style.overflowX = 'auto';

      console.log('Overflow and padding styles applied:', bodyStyle);

      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null; 

      if (isLoggedIn && user) {
        store.dispatch({ type: LOGIN_SUCCESS, payload: user });
      }

      setIsHydrated(true);
    }
  }, []);

  if (!isHydrated) {
    return null; 
  }

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {showHeaderFooter && <Header />}
          {children}
          {showHeaderFooter && <Footer />}
        </Provider>
      </body>
    </html>
  );
}
