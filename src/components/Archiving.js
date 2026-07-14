import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

const archives = [
  {
    icon: '🐙',
    title: 'GitHub',
    desc: '소스 코드 저장소',
    url: 'https://github.com/yourusername',
    label: 'github.com/yourusername',
    color: '#54C5F8',
  },
];

const Archiving = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="archiving" className={`archiving section ${isDark ? 'dark' : 'light'}`} ref={ref}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title">Archiving</h2>
          <div className="title-underline"></div>
          <p className="section-sub">코드 저장소 및 활동 링크</p>
        </motion.div>

        <div className="archiving-grid">
          {archives.map((item, i) => (
            <motion.a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="archive-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{ '--accent': item.color }}
            >
              <div className="archive-icon">{item.icon}</div>
              <div className="archive-body">
                <h3 className="archive-title">{item.title}</h3>
                <p className="archive-desc">{item.desc}</p>
                <span className="archive-url">{item.label}</span>
              </div>
              <span className="archive-arrow">→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Archiving;
