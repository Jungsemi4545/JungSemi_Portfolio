import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

const infoItems = [
  { icon: '👤', label: '이름', value: 'Your Name' },
  { icon: '📞', label: '연락처', value: '010-0000-0000' },
  { icon: '✉️', label: '이메일', value: 'your.email@example.com' },
  { icon: '📍', label: '위치', value: '서울특별시' },
  { icon: '🎓', label: '학력', value: '00대학교 00학과' },
];

const About = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className={`about section ${isDark ? 'dark' : 'light'}`} ref={ref}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title">About Me</h2>
          <div className="title-underline"></div>
        </motion.div>

        <div className="about-grid">
          {/* 자기소개 텍스트 */}
          <motion.div className="about-text" initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <p>
              안녕하세요! 저는 <strong>Flutter</strong>를 주력으로 사용하는 크로스플랫폼 앱 개발자입니다.
            </p>
            <p>
              2022년 3월부터 현재 회사에서 Flutter를 활용하여 <strong>모바일 앱, 태블릿 앱, 데스크톱 앱, 웹</strong>을
              개발해왔습니다. Flutter의 단일 코드베이스로 다양한 플랫폼을 지원하는 것에 매력을 느끼며,
              사용자 경험을 최우선으로 생각합니다.
            </p>
            <p>
              AI 이미지 가공 시스템(ComfyUI + Flask)과 연동된 키오스크를 개발한 경험을 통해,
              하드웨어와 소프트웨어를 아우르는 솔루션 개발 역량도 갖추고 있습니다.
            </p>

            {/* 통계 카드 */}
            <div className="about-stats">
              {[
                { number: '3+', label: '년 경력' },
                { number: '5+', label: '프로젝트' },
                { number: '4', label: '플랫폼\nMobile·Tablet·Desktop·Web' },
              ].map((stat, i) => (
                <div className="stat-card" key={i}>
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label" style={{ whiteSpace: 'pre-line' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 개인 정보 카드 */}
          <motion.div className="about-info-card" initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            <div className="info-card-header">
              <span className="info-card-avatar">👨‍💻</span>
              <div>
                <h3>Your Name</h3>
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
