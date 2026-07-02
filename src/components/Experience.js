import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

const experiences = [
  {
    period: '2022.03 — 현재',
    company: '(주)회사명',
    role: 'Flutter 앱 개발자',
    items: [
      'Flutter를 이용한 모바일 앱 개발 및 앱스토어/플레이스토어 출시, 유지보수',
      '팝업 현장 운영용 태블릿 앱 개발 및 현장 배포',
      'Flutter Desktop으로 키오스크 앱 개발 — Python Flask 서버 및 ComfyUI AI 이미지 처리 시스템과 연동',
      'Flutter Web을 활용한 웹 서비스 개발',
      'HTML/CSS를 이용한 웹 퍼블리싱',
    ],
    tags: ['Flutter', 'Dart', 'Python', 'Flask', 'ComfyUI', 'HTML'],
  },
];

const Experience = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="experience" className={`experience section ${isDark ? 'dark' : 'light'}`} ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience</h2>
          <div className="title-underline"></div>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <motion.div
              className="timeline-item"
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.2 }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-period">{exp.period}</span>
                <h3 className="timeline-company">{exp.company}</h3>
                <h4 className="timeline-role">{exp.role}</h4>
                <ul className="timeline-items">
                  {exp.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
                <div className="timeline-tags">
                  {exp.tags.map((tag, j) => (
                    <span className="tag" key={j}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
