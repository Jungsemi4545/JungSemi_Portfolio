import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

const projects = [
  { title: '세컨캐리어 (Second Carrier)', emoji: '🗺️', year: '2022', category: 'Mobile', color: '#54C5F8',
    desc: '위치 기반 스탬프 투어 및 크로스 플랫폼 아트 수집 서비스. Google Play / App Store 양대 마켓 정식 출시 후 4년 이상 운영 중.',
    tasks: ['Flutter 모바일 앱 프론트엔드 전면 단독 개발', 'Google Play / App Store 양대 마켓 출시', '4년 이상 라이브 서비스 유지보수 및 고도화', '웹 서비스 프론트엔드 및 멀티 플랫폼 데이터 동기화'],
    achievements: ['GPS 위치 인증 기반 디지털 아트 수집 시스템 구현', 'Firebase FCM 푸시 알림, Kakao SDK 소셜 로그인 연동'],
    tags: ['Flutter', 'Dart', 'Hive', 'Provider', 'Firebase', 'Kakao SDK'] },
  { title: 'H-zero 안전체험관 키오스크', emoji: '🤖', year: '2025', category: 'Desktop', color: '#764ABC',
    desc: 'Flutter Desktop + Python Flask + ComfyUI/rembg AI 이미지 합성 파이프라인을 연동한 스마트 키오스크 시스템.',
    tasks: ['Flutter Desktop 키오스크 UI/UX 개발', 'Python Flask 서버와 REST API 통신 구현', 'rembg + ComfyUI AI 배경제거 및 가상 의상 합성(VTON)', 'Unity 미디어월 실시간 연동 및 인쇄 자동화'],
    achievements: ['AI 이미지 합성 파이프라인을 단일 키오스크 시스템으로 통합', 'PyInstaller Python 백엔드 독립 실행 파일(.exe) 패키징'],
    tags: ['Flutter Desktop', 'Python', 'Flask', 'ComfyUI', 'rembg', 'Unity'] },
  { title: '탄광박물관 미디어 송출 CMS', emoji: '🎬', year: '2024', category: 'Desktop', color: '#8B5A2B',
    desc: 'Flutter Desktop + Python Flask 기반 박물관 미디어 자산 및 상영 스케줄 통합 관리 데스크탑 앱.',
    tasks: ['flutter_riverpod + go_router 기반 CMS 앱 개발', 'Python Flask + SQLAlchemy RESTful API 백엔드 구축', '1분할/3분할 화면 동시 지원 DB 모델링', '미디어 업로드·플레이리스트·스케줄 관리 전체 기능 구현'],
    achievements: ['서버 용량 90% 초과 시 업로드 자동 차단 안정성 로직', '현장 DID 디스플레이와 상태 동기화 폴링 구조 설계'],
    tags: ['Flutter Desktop', 'Riverpod', 'go_router', 'Python', 'Flask', 'SQLite'] },
  { title: '연세대 140주년 미디어 파사드 웹', emoji: '🎓', year: '2025', category: 'Web', color: '#003087',
    desc: 'Flutter Web 기반 위치 인증 + 커스텀 아바타 + Unity 미디어파사드 실시간 연동 인터랙티브 웹 서비스.',
    tasks: ['Flutter Web 인터랙티브 웹 서비스 개발', 'Geolocator 캠퍼스 위치 인증 및 시간 기반 동적 제어', 'Fluttermoji 커스텀 아바타 생성 및 데이터 패키징', 'Unity 대형 미디어파사드 실시간 연동 파이프라인 구축'],
    achievements: ['위치·시간 조건 기반 동적 UI 전환 시스템 설계', '아바타 데이터 → 백엔드 → Unity 실시간 표출 파이프라인'],
    tags: ['Flutter Web', 'Geolocator', 'Provider', 'Hive', 'Unity'] },
  { title: '국립현대미술관 모바일 활동지 웹', emoji: '🎨', year: '2024', category: 'Web', color: '#E91E63',
    desc: 'Flutter Web 기반 미술관 관람객이 사진 촬영·텍스트 입력으로 활동지를 제작하고 갤러리로 공유하는 웹 앱.',
    tasks: ['Flutter Web 모바일 활동지 제작 서비스 개발', '카메라 촬영, 텍스트 입력, 이미지 저장 기능 구현', '서버 공유 갤러리 시스템 및 다국어 대응'],
    achievements: ['iOS Safari 스와이프 백 충돌 문제 해결', '1·2차 고도화로 글로벌 확장 대응'],
    tags: ['Flutter Web', 'camera', 'screenshot', 'dio', 'http'] },
  { title: 'FIFA 랭킹 시각화 키오스크', emoji: '⚽', year: '2025', category: 'Desktop', color: '#1565C0',
    desc: 'FIFA 공식 랭킹 데이터를 실시간 크롤링·시각화하는 Windows 기반 키오스크 플랫폼.',
    tasks: ['Flutter Desktop 키오스크 앱 개발', 'FIFA 랭킹 데이터 웹 크롤링 및 파싱 구조 구축', 'Hive 로컬 캐싱, 다국어 지원, design.json 설정 분리'],
    achievements: ['window_manager로 전체화면 키오스크 환경 구현', '오프라인 환경에서도 안정적인 데이터 캐싱'],
    tags: ['Flutter Desktop', 'window_manager', 'Hive', 'easy_localization'] },
  { title: '경기 소방안전마루 OX 퀴즈 키오스크', emoji: '🚒', year: '2025', category: 'Desktop', color: '#F44336',
    desc: 'Rive 애니메이션과 오디오를 활용한 어린이 대상 Windows 기반 가로형 소방안전 OX 퀴즈 키오스크.',
    tasks: ['Flutter Windows 기반 가로형 OX 퀴즈 키오스크 개발', 'Rive 인터랙티브 애니메이션 + audioplayers 효과음/BGM', 'IdleTimerNotifier 기반 자동 홈 복귀 시스템 구현'],
    achievements: ['시각적 몰입감 높은 인터랙티브 퀴즈 플로우 구현', 'info.json 기반 문항·설정 분리로 유지보수 효율화'],
    tags: ['Flutter Desktop', 'rive', 'audioplayers', 'provider', 'window_manager'] },
  { title: '영양군 별자리 미디어아트 태블릿 앱', emoji: '⭐', year: '2025', category: 'Tablet', color: '#9C27B0',
    desc: '전시 관람객이 태블릿으로 별자리 위에 그림을 그리고 Unity 미디어아트 시스템으로 전송하는 인터랙티브 앱.',
    tasks: ['Flutter 태블릿 전용 드로잉 앱 개발', 'flutter_drawing_board 별자리 캔버스 위 자유 드로잉 구현', '드로잉 이미지 캡처 후 Unity 미디어아트 시스템 전송'],
    achievements: ['글래스모피즘 UI + 커스텀 폰트로 전시 감성 구현', '터치 드로잉 캔버스 해상도 및 성능 최적화'],
    tags: ['Flutter', 'flutter_drawing_board', 'Hive', 'Unity 연동'] },
  { title: '기획자용 멀티 언어 TTS Windows 앱', emoji: '🎙️', year: '2025', category: 'Desktop', color: '#00BCD4',
    desc: 'Google Translation API + Typecast API를 연동하여 번역부터 TTS 음성 생성까지 원스톱 처리하는 업무용 앱.',
    tasks: ['Flutter Desktop Windows 업무용 유틸리티 앱 개발', 'Google Translation API + Typecast API 다중 엔진 연동', '오디오 미리듣기 및 로컬 파일 관리 기능 구현'],
    achievements: ['번역→TTS 음성 생성 원스톱 처리 워크플로우 구현', '서로 다른 API 응답 규격 통합 및 비동기 제어'],
    tags: ['Flutter Desktop', 'Google API', 'Typecast API', 'audioplayers'] },
  { title: '울산 정보 키오스크', emoji: '🏙️', year: '2026', category: 'Desktop', color: '#4CAF50',
    desc: '울산 지역 정보를 안내하는 Windows 기반 세로형 키오스크. 동적 해상도 적용 및 라이프사이클 안정화.',
    tasks: ['Flutter Windows 기반 세로형 키오스크 개발 및 유지보수', '동적 해상도 적용 로직으로 UI 비율 왜곡 문제 해결', '콘텐츠 및 이미지 리소스 정기 교체 유지보수'],
    achievements: ['디스플레이 해상도 변경 시 실시간 스케일링 재산정 로직', 'Windows Release 환경 라이프사이클 안정화'],
    tags: ['Flutter Desktop', 'window_manager', 'provider', 'carousel_slider'] },
  { title: '한샘 관리자 웹페이지 퍼블리싱', emoji: '🏠', year: '2025', category: 'Web', color: '#FF9800',
    desc: 'Bootstrap 5 기반 반응형 관리자 대시보드 퍼블리싱. Simple-DataTables 동적 테이블 및 모달 컴포넌트 개발.',
    tasks: ['Bootstrap 5 기반 반응형 관리자 대시보드 퍼블리싱', 'Simple-DataTables 기반 동적 데이터 테이블 구현', '다중 이미지 업로드 및 모달 컴포넌트 개발'],
    achievements: ['사내 최초 웹 퍼블리싱 표준 도입 및 컴포넌트 재사용성 확보'],
    tags: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript', 'jQuery'] },
  { title: '하이커스 웹사이트 개발', emoji: '🎭', year: '2025', category: 'Web', color: '#607D8B',
    desc: '디지털 아트 플랫폼 하이커스의 웹사이트. React 이관을 고려한 컴포넌트 구조 지향적 코드 설계.',
    tasks: ['HTML/CSS/JS 기반 디지털 아트 플랫폼 웹사이트 개발', '커스텀 캐러셀·슬라이더 및 인터랙티브 UI 구현', 'React 이관을 고려한 컴포넌트 구조 지향적 코드 작성'],
    achievements: ['반응형 레이아웃 및 크로스 브라우징 정합성 확보', 'React 전환 효율성을 고려한 클린 코드 설계'],
    tags: ['HTML5', 'CSS3', 'Vanilla JavaScript'] },
  { title: 'KT Realcube Controller', emoji: '🎮', year: '2022', category: 'Desktop', color: '#E91E63',
    desc: 'OSC 프로토콜 기반으로 사용자 정보를 수집하여 KT Realcube 외부 시스템과 UDP 통신하는 데스크탑 컨트롤러 앱.',
    tasks: ['Flutter Desktop OSC 프로토콜 기반 컨트롤러 앱 개발', 'UDP 소켓을 통한 비동기 데이터 전송 구현', '한글 데이터 인코딩 처리 및 유효성 검사 로직 구현'],
    achievements: ['외부 의존성 없는 OSC 메시지 인코딩/디코딩 직접 모듈화'],
    tags: ['Flutter', 'OSC Protocol', 'UDP Socket', 'shared_preferences'] },
  { title: '역량 체크 - REST API 갤러리 앱', emoji: '📋', year: '2022', category: 'Mobile', color: '#009688',
    desc: '외부 API로부터 아이템 리스트를 비동기로 받아 GridView로 렌더링하는 Flutter 역량 검증 프로젝트.',
    tasks: ['Flutter REST API 연동 및 JSON 데이터 파싱', 'FutureBuilder 기반 비동기 상태 관리', 'cached_network_image 이미지 캐싱으로 성능 최적화'],
    achievements: ['반응형 GridView + 로컬 페이징 로직 구현', '이미지 캐싱으로 네트워크 리소스 낭비 방지'],
    tags: ['Flutter', 'http', 'cached_network_image', 'FutureBuilder'] },
  { title: '한국은행 통계 조회 앱 (PoC)', emoji: '🏦', year: '2022', category: 'Mobile', color: '#795548',
    desc: '한국은행 통계 데이터 시각화 모바일 앱 프로토타입. 확장성 있는 아키텍처 설계 및 초기 프레임워크 구축.',
    tasks: ['Flutter 기반 금융 통계 데이터 시각화 프로토타입 개발', '확장성 있는 디렉토리 구조 및 초기 아키텍처 설계', '데이터 조회 UI 및 화면 전환 로직 구현'],
    achievements: ['대용량 데이터 바인딩 및 상태 관리 패턴 도입 설계'],
    tags: ['Flutter', 'REST API', 'Dart'] },
];

const Modal = ({ project, onClose, isDark }) => (
  <AnimatePresence>
    {project && (
      <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div className={`modal-content ${isDark ? 'dark' : 'light'}`} initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} onClick={e => e.stopPropagation()} style={{ '--accent': project.color }}>
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-header">
            <span className="modal-emoji">{project.emoji}</span>
            <div>
              <h2 className="modal-title">{project.title}</h2>
              <span className="modal-period">{project.year} · {project.category}</span>
            </div>
          </div>
          <p className="modal-desc">{project.desc}</p>
          <div className="modal-image-placeholder">
            <span>📸</span>
            <p>프로젝트 스크린샷을 추가할 수 있어요</p>
            <small>projects 배열의 images 항목에 URL을 추가하세요</small>
          </div>
          <div className="modal-section">
            <h4>■ 수행 업무</h4>
            <ul className="modal-list">{project.tasks.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
          <div className="modal-section">
            <h4>■ 주요 성과</h4>
            <ul className="modal-list">{project.achievements.map((a, i) => <li key={i}>{a}</li>)}</ul>
          </div>
          <div className="modal-tags">{project.tags.map((tag, i) => <span className="tag" key={i}>{tag}</span>)}</div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Projects = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const categories = ['All', 'Mobile', 'Tablet', 'Desktop', 'Web'];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className={`projects section ${isDark ? 'dark' : 'light'}`} ref={ref}>
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="section-title">Projects</h2>
          <div className="title-underline"></div>
          <p className="section-sub">참여한 주요 프로젝트 · 카드를 클릭하면 상세 내용을 볼 수 있어요</p>
        </motion.div>

        <div className="filter-tabs">
          {categories.map(cat => (
            <button key={cat} className={`filter-tab ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>{cat}</button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((project, i) => (
            <motion.div className="project-card" key={project.title} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.06 }} style={{ '--accent': project.color }} onClick={() => setSelected(project)}>
              <div className="project-top">
                <span className="project-emoji">{project.emoji}</span>
                <span className="project-period">{project.year}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tags">{project.tags.slice(0, 4).map((tag, j) => <span className="tag" key={j}>{tag}</span>)}</div>
              <div className="project-expand-hint">자세히 보기 →</div>
            </motion.div>
          ))}
        </div>
      </div>
      <Modal project={selected} onClose={() => setSelected(null)} isDark={isDark} />
    </section>
  );
};
export default Projects;
