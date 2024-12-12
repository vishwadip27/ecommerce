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
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Force apply styles using !important
      document.body.style.setProperty('overflow', 'auto', 'important');
      document.body.style.setProperty('margin', '0', 'important');
      document.body.style.setProperty('padding', '0', 'important'); // 
    }
  }, []); 
  const pathname = usePathname();
  const showHeaderFooter = pathname !== "/login" && pathname !== "/signup"; 

  const [isHydrated, setIsHydrated] = useState(false); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null; 

      if (isLoggedIn && user) {
        store.dispatch({ type: LOGIN_SUCCESS, payload: user });
      }
      setIsHydrated(true); 
      document.body.style.setProperty('overflow', 'auto', 'important');
      document.body.style.setProperty('margin', '0', 'important');
      document.body.style.setProperty('padding', '0', 'important'); // 
    }
  }, []);


  if (!isHydrated) {
    return null; 
  }

  return (
    <html lang="en">
        <body style={{ margin: 0, padding: 0, overflow: 'auto' }}>
        <Provider store={store}>
          {showHeaderFooter && <Header />} 
          <main>{children}</main>
          {showHeaderFooter && <Footer />}
        </Provider>
      </body>
    </html>
  );
}
