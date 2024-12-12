'use client';

import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import footerStyles from './footer.module.scss';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={footerStyles.footerWrapper}>
      <div className={footerStyles.footerContent}>
        <div className={footerStyles.column}>
          <div className={footerStyles.logoSection}>
            <img src="/images/sittelogo.png" alt="Logo" className={footerStyles.logo} />
          </div>
        </div>

        <div className={` ${footerStyles.column} ${footerStyles.quickLinkCol}`}>
          <h3>Quick Links</h3>
          <div>
            <Link href="/home" className={footerStyles.link}>Home</Link>
            <Link href="/about" className={footerStyles.link}>About Us</Link>
            <Link href="/products" className={footerStyles.link}>Products</Link>
            <Link href="/cart" className={footerStyles.link}>Cart</Link>
          </div>
        </div>
        <div className={footerStyles.column}>
          <h3>Contact Us</h3>
          <Card className="p-fluid" style={{ width: '100%' }}>
            <p>Email: contact@example.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Main Street, City, Country</p>
            <Button label="Get in Touch" icon="pi pi-envelope" className="p-button-primary" />
          </Card>
        </div>

        <div className={footerStyles.column}>
          <h4>Follow Us</h4>
          <div className={footerStyles.socialIcons}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="pi pi-facebook" title="Facebook" style={{ margin: '0 10px', fontSize: '1.5rem', color: '#4267B2' }}></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="pi pi-twitter" title="Twitter" style={{ margin: '0 10px', fontSize: '1.5rem', color: '#1DA1F2' }}></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="pi pi-instagram" title="Instagram" style={{ margin: '0 10px', fontSize: '1.5rem', color: '#E1306C' }}></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="pi pi-linkedin" title="LinkedIn" style={{ margin: '0 10px', fontSize: '1.5rem', color: '#0077B5' }}></a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="pi pi-github" title="GitHub" style={{ margin: '0 10px', fontSize: '1.5rem', color: '#333' }}></a>
          </div>

        </div>
      </div>

      <Divider />

      <div className={footerStyles.copyrightSection}>
        <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
