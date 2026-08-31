import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

const infoItems = [
  { icon: '👤', label: '이름', value: '정세미' },
  { icon: '✉️', label: '이메일', value: 'sm1860sm@gmail.com' },
  { icon: '💼', label: '직함', value: '크로스 플랫폼 & 풀스택 개발자' },
  { icon: '🏢', label: '소속', value: '모온컴퍼니 (2022.03 ~ 현재)' },
  { icon: '📍', label: '위치', value: '대한민국' },
];

const About = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className={`about section ${isDark ? 'dark' : 'light'}`} ref={ref}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </motion.div>

        <div className="about-grid">
          <motion.div className="about-text" initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <p>
              안녕하세요! 저는 <strong>Flutter</strong>를 주력으로 사용하는
              크로스 플랫폼 & 풀스택 개발자 <strong>정세미</strong>입니다.
            </p>
            <p>
              2022년 3월부터 모온컴퍼니에서 Flutter를 활용하여 <strong>모바일, 태블릿,
              데스크톱, 웹</strong> 등 다양한 플랫폼의 앱을 단독 개발해왔습니다.
            </p>
            <p>
              Flutter 프론트엔드 개발을 주력으로 하며, <strong>Python(Flask) 백엔드 구축</strong>부터
              <strong> ComfyUI를 활용한 AI 이미지 가공</strong>까지 서비스 전반의 파이프라인을
              다룰 수 있습니다.
            </p>
            <p>
              박물관, 체험관, 미술관, 기업 등 다양한 클라이언트의 프로젝트를 수행하며
              실무 현장에서 요구하는 안정성과 완성도를 갖춘 솔루션을 제공해왔습니다.
            </p>

            <div className="about-stats">
              {[
                { number: '3+', label: '년 실무 경력' },
                { number: '15+', label: '완료 프로젝트' },
                { number: '4', label: '플랫폼\nMobile·Tablet·Desktop·Web' },
              ].map((s, i) => (
                <div className="stat-card" key={i}>
                  <span className="stat-number">{s.number}</span>
                  <span className="stat-label" style={{ whiteSpace: 'pre-line' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="about-info-card" initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            <div className="info-card-header">
              <span className="info-card-avatar">🦋</span>
              <div>
                <h3>정세미</h3>
                <p>Flutter App Developer</p>
              </div>
            </div>
            <div className="info-card-body">
              {infoItems.map((item, i) => (
                <div className="info-row" key={i}>
                  <span className="info-icon">{item.icon}</span>
                  <div className="info-content">
                    <span className="info-label">{item.label}</span>
                    <span className="info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default About;
