'use client';

import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { LOGIN_SUCCESS } from './store/actions/authTypes';
import Head from 'next/head';

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

      const removeInlineStyles = () => {
        bodyStyle.removeProperty('overflow');
        bodyStyle.removeProperty('padding');
        bodyStyle.removeProperty('margin');
      };

      const applyStyles = () => {
        bodyStyle.setProperty('overflow', 'auto', 'important');
        bodyStyle.setProperty('padding', '0', 'important');
        bodyStyle.setProperty('margin', '0', 'important');
      };
    
      removeInlineStyles();
      applyStyles();
      const interval = setInterval(() => {
        if (bodyStyle.overflow !== 'auto') {
          applyStyles(); 
        } else {
          clearInterval(interval);
        }
      }, 100);

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
      <Head>
        <style>
          {`
            body {
              overflow: auto !important;
              margin: 0 !important;
              padding: 0 !important;
            }
          `}
        </style>
      </Head>
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
