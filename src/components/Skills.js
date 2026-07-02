import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

const skillsData = [
  {
    category: 'Primary',
    icon: '📱',
    skills: [
      { name: 'Flutter', level: 85 },
      { name: 'Dart', level: 80 },
    ],
  },
  {
    category: 'Platform',
    icon: '🖥️',
    skills: [
      { name: 'Mobile (Android/iOS)', level: 85 },
      { name: 'Desktop App', level: 70 },
      { name: 'Web (Flutter Web)', level: 65 },
      { name: 'Tablet', level: 75 },
    ],
  },
  {
    category: 'Backend & Tools',
    icon: '⚙️',
    skills: [
      { name: 'Python / Flask', level: 55 },
      { name: 'HTML / Web Publishing', level: 65 },
      { name: 'ComfyUI (AI Image)', level: 50 },
      { name: 'Git', level: 70 },
    ],
  },
];

const Skills = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className={`skills section ${isDark ? 'dark' : 'light'}`} ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills</h2>
          <div className="title-underline"></div>
          <p className="section-sub">사용해본 기술 스택</p>
        </motion.div>

        <div className="skills-grid">
          {skillsData.map((group, gi) => (
            <motion.div
              className="skill-group"
              key={gi}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.15 }}
            >
              <div className="skill-group-header">
                <span className="skill-icon">{group.icon}</span>
                <h3>{group.category}</h3>
              </div>
              {group.skills.map((skill, si) => (
                <div className="skill-item" key={si}>
                  <div className="skill-label">
                    <span>{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      className="skill-fill"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: gi * 0.15 + si * 0.1 + 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
