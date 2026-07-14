import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

const experiences = [
  {
    period: '2022.03 — 현재',
    company: '(주)회사명',
    role: 'Flutter 앱 개발자',
    projects: [
      {
        name: '모바일 앱 개발 및 출시',
        period: '2022.03 — 현재',
        tasks: [
          'Flutter를 이용한 Android/iOS 크로스플랫폼 앱 개발',
          '앱스토어 / 플레이스토어 심사 대응 및 출시',
          '신규 기능 추가 및 버그 수정 유지보수',
        ],
        achievements: [
          '단일 코드베이스로 Android · iOS 동시 지원',
          '지속적인 업데이트로 서비스 안정성 유지',
        ],
        tags: ['Flutter', 'Dart', 'Android', 'iOS'],
      },
      {
        name: '팝업 현장 태블릿 앱 개발',
        period: '2023',
        tasks: [
          '팝업 행사 현장 운영을 위한 태블릿 전용 앱 개발',
          '태블릿 화면 비율에 최적화된 UI/UX 설계',
          '앱스토어 출시 없이 현장 디바이스에 직접 설치 및 운영',
        ],
        achievements: [
          '현장 운영 환경에 맞춘 안정적인 앱 구동',
        ],
        tags: ['Flutter', 'Dart', 'Tablet'],
      },
      {
        name: 'AI 이미지 키오스크 개발',
        period: '2023 — 2024',
        tasks: [
          'Flutter Desktop으로 키오스크 전용 풀스크린 UI 개발',
          'Python Flask 서버와 REST API 통신 구현',
          'ComfyUI 기반 AI 이미지 생성 · 합성 파이프라인 연동',
        ],
        achievements: [
          'AI 이미지 처리와 키오스크 UI를 단일 시스템으로 통합',
          'Flutter Desktop + Python 백엔드 연동 구조 설계',
        ],
        tags: ['Flutter', 'Python', 'Flask', 'ComfyUI', 'Desktop'],
      },
      {
        name: 'Flutter Web 및 웹 퍼블리싱',
        period: '2022 — 현재',
        tasks: [
          'Flutter Web을 활용한 웹 서비스 개발',
          'HTML/CSS를 이용한 웹 페이지 퍼블리싱',
          '크로스브라우저 호환성 대응',
        ],
        achievements: [
          'Flutter 단일 코드베이스로 웹까지 확장',
        ],
        tags: ['Flutter', 'HTML', 'CSS', 'Web'],
      },
    ],
    tags: ['Flutter', 'Dart', 'Python', 'Flask', 'ComfyUI', 'HTML', 'CSS'],
  },
];

const Experience = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openProject, setOpenProject] = useState(null);

  return (
    <section id="experience" className={`experience section ${isDark ? 'dark' : 'light'}`} ref={ref}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title">Experience</h2>
          <div className="title-underline"></div>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <motion.div className="timeline-item" key={i} initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.2 }}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-period">{exp.period}</span>
                <h3 className="timeline-company">{exp.company}</h3>
                <h4 className="timeline-role">{exp.role}</h4>

                {/* 프로젝트 목록 */}
                <div className="exp-projects">
                  {exp.projects.map((proj, pi) => (
                    <div className="exp-project" key={pi}>
                      <button
                        className={`exp-project-header ${openProject === `${i}-${pi}` ? 'open' : ''}`}
                        onClick={() => setOpenProject(openProject === `${i}-${pi}` ? null : `${i}-${pi}`)}
                      >
                        <div className="exp-project-title-row">
                          <span className="exp-project-name">{proj.name}</span>
                          <span className="exp-project-period">{proj.period}</span>
                        </div>
                        <span className="exp-chevron">{openProject === `${i}-${pi}` ? '▲' : '▼'}</span>
                      </button>

                      <AnimatePresence>
                        {openProject === `${i}-${pi}` && (
                          <motion.div
                            className="exp-project-detail"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="exp-section">
                              <h5>■ 수행 업무</h5>
                              <ul>
                                {proj.tasks.map((t, ti) => <li key={ti}>{t}</li>)}
                              </ul>
                            </div>
                            <div className="exp-section">
                              <h5>■ 주요 성과</h5>
                              <ul>
                                {proj.achievements.map((a, ai) => <li key={ai}>{a}</li>)}
                              </ul>
                            </div>
                            <div className="exp-tags">
                              {proj.tags.map((tag, ti) => <span className="tag" key={ti}>{tag}</span>)}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="timeline-tags">
                  {exp.tags.map((tag, j) => <span className="tag" key={j}>{tag}</span>)}
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
