import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  return (
    <footer className={`footer ${isDark ? 'dark' : 'light'}`}>
      <p>Built with <span className="heart">♥</span> using React · Flutter Developer Portfolio</p>
      <p className="footer-copy">© 2024 Your Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
