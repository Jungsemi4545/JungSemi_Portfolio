import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="contact" className={`contact section ${isDark ? 'dark' : 'light'}`} ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Contact</h2>
          <div className="title-underline"></div>
          <p className="section-sub">함께 일하고 싶으시다면 편하게 연락주세요</p>
        </motion.div>

        <motion.div
          className="contact-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {[
            { icon: '✉️', label: 'Email', value: 'your.email@example.com', href: 'mailto:your.email@example.com' },
            { icon: '🐙', label: 'GitHub', value: 'github.com/yourusername', href: 'https://github.com/yourusername' },
          ].map((item, i) => (
            <a href={item.href} className="contact-card" key={i} target="_blank" rel="noopener noreferrer">
              <span className="contact-icon">{item.icon}</span>
              <span className="contact-label">{item.label}</span>
              <span className="contact-value">{item.value}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
