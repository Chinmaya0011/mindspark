import React from 'react';
import style from './Footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={style.footerContainer}>
      <div className={style.footerContent}>
        <div className={style.navContainer}>
          <h3 className={style.footerTitle}>Quick Links</h3>
          <ul className={style.navList}>
            <li><a href="#home" className={style.navItem}>Home</a></li>
            <li><a href="#about" className={style.navItem}>About Us</a></li>
            <li><a href="#services" className={style.navItem}>Services</a></li>
            <li><a href="#contact" className={style.navItem}>Contact</a></li>
          </ul>
        </div>
        
        <div className={style.contactContainer}>
          <h3 className={style.footerTitle}>Contact Us</h3>
          <p className={style.contactAddress}>
            123 Learning St.<br />
            Education City, EC 12345<br />
            Email: info@mindspark.com<br />
            Phone: (123) 456-7890
          </p>
        </div>

        <div className={style.socialContainer}>
          <h3 className={style.footerTitle}>Follow Us</h3>
          <div className={style.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={style.socialIcon}>
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={style.socialIcon}>
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={style.socialIcon}>
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={style.socialIcon}>
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className={style.footerBottom}>
        <p>&copy; {new Date().getFullYear()} MindSpark. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
