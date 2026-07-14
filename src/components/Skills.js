import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

const skillsData = [
  {
    category: 'Primary',
    icon: '📱',
    skills: [
      { name: 'Flutter', level: 85, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'Dart', level: 80, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
    ],
  },
  {
    category: 'Platform',
    icon: '🖥️',
    skills: [
      { name: 'Mobile (Android/iOS)', level: 85, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
      { name: 'Desktop App', level: 70, logo: '🖥️' },
      { name: 'Web (Flutter Web)', level: 65, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg' },
      { name: 'Tablet', level: 75, logo: '📟' },
    ],
  },
  {
    category: 'Backend & Tools',
    icon: '⚙️',
    skills: [
      { name: 'Python / Flask', level: 55, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'HTML / CSS', level: 65, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'ComfyUI (AI Image)', level: 50, logo: '🤖' },
      { name: 'Git', level: 70, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    ],
  },
];

const SkillLogo = ({ logo, name }) => {
  if (logo && logo.startsWith('http')) {
    return <img src={logo} alt={name} className="skill-logo-img" onError={e => { e.target.style.display='none'; }} />;
  }
  return <span className="skill-logo-emoji">{logo}</span>;
};

const Skills = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className={`skills section ${isDark ? 'dark' : 'light'}`} ref={ref}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title">Skills</h2>
          <div className="title-underline"></div>
          <p className="section-sub">사용해본 기술 스택</p>
        </motion.div>

        <div className="skills-grid">
          {skillsData.map((group, gi) => (
            <motion.div className="skill-group" key={gi} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: gi * 0.15 }}>
              <div className="skill-group-header">
                <span className="skill-icon">{group.icon}</span>
                <h3>{group.category}</h3>
              </div>
              {group.skills.map((skill, si) => (
                <div className="skill-item" key={si}>
                  <div className="skill-label">
                    <div className="skill-name-row">
                      <SkillLogo logo={skill.logo} name={skill.name} />
                      <span>{skill.name}</span>
                    </div>
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
