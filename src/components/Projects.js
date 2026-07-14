import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

const projects = [
  {
    title: '모바일 앱 (출시)',
    emoji: '📱',
    period: '2022 — 현재',
    category: 'Mobile',
    desc: 'Flutter로 개발한 모바일 앱. Android/iOS 동시 출시 후 지속적인 유지보수 진행 중.',
    tasks: [
      'Flutter 단일 코드베이스로 Android · iOS 동시 지원',
      '앱스토어 / 플레이스토어 출시 및 심사 대응',
      '지속적인 기능 추가 및 버그 수정 유지보수',
    ],
    achievements: [
      '단일 코드베이스로 개발 비용 절감',
      '안정적인 서비스 운영 유지',
    ],
    tags: ['Flutter', 'Dart', 'Mobile'],
    color: '#54C5F8',
    images: [],
  },
  {
    title: '팝업 현장용 태블릿 앱',
    emoji: '🖼️',
    period: '2023',
    category: 'Tablet',
    desc: '팝업 행사 현장에서 사용하기 위한 태블릿 전용 앱. 직접 디바이스에 설치해 현장 운영.',
    tasks: [
      'Flutter로 태블릿 화면 비율에 최적화된 UI 개발',
      '현장 운영 환경에 맞춘 UX 설계',
      '직접 태블릿에 설치 후 팝업 현장 실사용',
    ],
    achievements: [
      '현장 운영 환경에서 안정적 구동',
    ],
    tags: ['Flutter', 'Dart', 'Tablet'],
    color: '#01B4BC',
    images: [],
  },
  {
    title: 'AI 이미지 키오스크',
    emoji: '🤖',
    period: '2023 — 2024',
    category: 'Desktop',
    desc: 'Flutter Desktop으로 구현한 키오스크. Python Flask + ComfyUI를 연동해 AI 이미지 가공을 실시간 처리.',
    tasks: [
      'Flutter Desktop으로 키오스크 전용 풀스크린 UI 개발',
      'Python Flask 서버와 REST API 통신',
      'ComfyUI 기반 AI 이미지 생성 · 합성 파이프라인 연동',
    ],
    achievements: [
      'AI 이미지 처리와 키오스크 UI를 단일 시스템으로 통합',
      'Flutter Desktop + Python 백엔드 연동 구조 설계',
    ],
    tags: ['Flutter', 'Python', 'Flask', 'ComfyUI', 'Desktop'],
    color: '#764ABC',
    images: [],
  },
  {
    title: 'Flutter Web 서비스',
    emoji: '🌐',
    period: '2023',
    category: 'Web',
    desc: 'Flutter Web을 활용한 웹 서비스 개발. 기존 Flutter 코드를 웹 환경으로 포팅 및 최적화.',
    tasks: [
      'Flutter Web 빌드 및 배포',
      '웹 환경에 맞는 반응형 레이아웃 구현',
    ],
    achievements: ['Flutter 단일 코드베이스로 웹까지 확장'],
    tags: ['Flutter', 'Dart', 'Web'],
    color: '#F7B731',
    images: [],
  },
  {
    title: '웹 퍼블리싱',
    emoji: '🖥️',
    period: '2022 — 현재',
    category: 'Web',
    desc: 'HTML/CSS를 이용한 정적 웹 페이지 퍼블리싱 작업.',
    tasks: [
      'HTML · CSS 기반 웹 페이지 마크업 및 스타일링',
      '크로스브라우저 호환성 대응',
    ],
    achievements: ['다양한 환경에서 일관된 UI 제공'],
    tags: ['HTML', 'CSS', 'Web Publishing'],
    color: '#FC5C65',
    images: [],
  },
];

const Modal = ({ project, onClose, isDark }) => (
  <AnimatePresence>
    {project && (
      <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div
          className={`modal-content ${isDark ? 'dark' : 'light'}`}
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          onClick={e => e.stopPropagation()}
          style={{ '--accent': project.color }}
        >
          <button className="modal-close" onClick={onClose}>✕</button>

          <div className="modal-header">
            <span className="modal-emoji">{project.emoji}</span>
            <div>
              <h2 className="modal-title">{project.title}</h2>
              <span className="modal-period">{project.period}</span>
            </div>
          </div>

          <p className="modal-desc">{project.desc}</p>

          {/* 이미지 영역 - 나중에 이미지 URL 추가 가능 */}
          {project.images && project.images.length > 0 ? (
            <div className="modal-images">
              {project.images.map((src, i) => (
                <img key={i} src={src} alt={`${project.title} ${i + 1}`} className="modal-image" />
              ))}
            </div>
          ) : (
            <div className="modal-image-placeholder">
              <span>📸</span>
              <p>스크린샷 또는 이미지를 추가할 수 있어요</p>
              <small>projects 배열의 images 항목에 URL을 추가하세요</small>
            </div>
          )}

          <div className="modal-section">
            <h4>■ 수행 업무</h4>
            <ul className="modal-list">
              {project.tasks.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>

          <div className="modal-section">
            <h4>■ 주요 성과</h4>
            <ul className="modal-list">
              {project.achievements.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>

          <div className="modal-tags">
            {project.tags.map((tag, i) => <span className="tag" key={i}>{tag}</span>)}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Projects = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Mobile', 'Tablet', 'Desktop', 'Web'];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className={`projects section ${isDark ? 'dark' : 'light'}`} ref={ref}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title">Projects</h2>
          <div className="title-underline"></div>
          <p className="section-sub">참여한 주요 프로젝트들 · 카드를 클릭하면 상세 내용을 볼 수 있어요</p>
        </motion.div>

        <div className="filter-tabs">
          {categories.map(cat => (
            <button key={cat} className={`filter-tab ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>{cat}</button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((project, i) => (
            <motion.div
              className="project-card"
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ '--accent': project.color }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-top">
                <span className="project-emoji">{project.emoji}</span>
                <span className="project-period">{project.period}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tags">
                {project.tags.map((tag, j) => <span className="tag" key={j}>{tag}</span>)}
              </div>
              <div className="project-expand-hint">자세히 보기 →</div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} isDark={isDark} />
    </section>
  );
};

export default Projects;
