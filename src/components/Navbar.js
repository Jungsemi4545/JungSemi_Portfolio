import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-scroll';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'archiving', label: 'Archiving' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isDark ? 'dark' : 'light'}`}>
      <div className="nav-logo">
        <span className="logo-bracket">&lt;</span>
        <span className="logo-text">정세미</span>
        <span className="logo-bracket"> /&gt;</span>
      </div>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l.id}>
            <Link to={l.id} smooth duration={600} offset={-70} onClick={() => setMenuOpen(false)}>{l.label}</Link>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme}>{isDark ? '☀️' : '🌙'}</button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
