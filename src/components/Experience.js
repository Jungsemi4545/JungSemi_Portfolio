import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';

const experiences = [
  {
    period: '2022.03 — 현재',
    company: '모온컴퍼니',
    role: '전임 / 개발자 · Flutter 앱 개발자',
    highlights: [
      { label: '핵심 성과 1', text: '다수의 데스크탑/태블릿/모바일 앱 프론트엔드 단독 개발 및 유지보수 (Flutter 활용)' },
      { label: '핵심 성과 2', text: 'Flask 서버와 연동하여 AI 가공 데이터 서빙 파이프라인 및 CMS 시스템 구축' },
      { label: '핵심 성과 3', text: '웹 인터랙션 및 외부 하드웨어(Unity 미디어월, OSC 프로토콜 기기 등) 실시간 연동 시스템 고도화' },
    ],
    projects: [
      {
        name: '세컨캐리어 (Second Carrier)',
        period: '2022.08 — 현재',
        tasks: ['Flutter를 활용한 모바일 앱 프론트엔드 전면 단독 개발', 'Google Play / Apple App Store 양대 마켓 정식 출시', '4년 이상 라이브 서비스 유지보수 및 고도화 진행', '웹 서비스 프론트엔드 개발 및 멀티 플랫폼 데이터 동기화'],
        achievements: ['위치 기반 스탬프 투어 및 크로스 플랫폼 아트 수집 서비스 구현', 'Firebase FCM 푸시 알림, Kakao SDK 소셜 로그인 연동'],
        tags: ['Flutter', 'Dart', 'Hive', 'Provider', 'Firebase', 'Kakao SDK'],
      },
      {
        name: 'H-zero 안전체험관 키오스크',
        period: '2025.04 — 현재',
        tasks: ['Flutter Desktop 기반 키오스크 UI/UX 개발', 'Python Flask 서버와 REST API 통신 구현', 'rembg + ComfyUI AI 이미지 합성 파이프라인 연동', 'Unity 미디어월 실시간 연동 및 사원증/기프트카드 인쇄 자동화'],
        achievements: ['AI 배경제거 + 가상 의상 합성(VTON)을 키오스크 단일 시스템으로 통합', 'PyInstaller로 Python 백엔드 독립 실행 파일(.exe) 패키징'],
        tags: ['Flutter Desktop', 'Python', 'Flask', 'ComfyUI', 'rembg', 'Unity'],
      },
      {
        name: '탄광박물관 미디어 송출 관리 CMS',
        period: '2024 — 현재',
        tasks: ['Flutter Desktop + flutter_riverpod + go_router 기반 CMS 앱 개발', 'Python Flask + SQLAlchemy RESTful API 백엔드 구축', '1분할/3분할 화면 동시 지원 관계형 DB 모델링', '미디어 업로드·플레이리스트·스케줄 관리 전체 기능 구현'],
        achievements: ['서버 용량 90% 초과 시 업로드 자동 차단 안정성 로직 구현', '현장 DID 디스플레이와 상태 동기화 폴링 구조 설계'],
        tags: ['Flutter Desktop', 'Riverpod', 'go_router', 'Python', 'Flask', 'SQLite'],
      },
      {
        name: '연세대학교 140주년 미디어 파사드 웹',
        period: '2025.02 — 2025.05',
        tasks: ['Flutter Web 기반 인터랙티브 웹 서비스 개발', 'Geolocator로 캠퍼스 위치 인증 및 시간 기반 동적 제어', 'Fluttermoji 커스텀 아바타 생성 + Unity 미디어파사드 실시간 연동'],
        achievements: ['위치·시간 조건 기반 동적 UI 전환 시스템 설계', '아바타 데이터 → 백엔드 → Unity 대형 화면 실시간 표출 파이프라인 구축'],
        tags: ['Flutter Web', 'Geolocator', 'Provider', 'Hive', 'Unity'],
      },
      {
        name: '국립현대미술관 모바일 활동지 웹 앱',
        period: '2024.03 — 2025.12',
        tasks: ['Flutter Web 기반 모바일 활동지 제작 서비스 개발', '카메라 촬영, 텍스트 입력, 이미지 저장 기능 구현', '서버 공유 갤러리 시스템 개발 및 다국어 대응'],
        achievements: ['iOS Safari 스와이프 백 충돌 해결', '1·2차 고도화를 통한 글로벌 확장 대응'],
        tags: ['Flutter Web', 'camera', 'screenshot', 'dio', 'http'],
      },
      {
        name: 'FIFA 랭킹 시각화 키오스크',
        period: '2025.01 — 2025.05',
        tasks: ['Flutter Desktop Windows 기반 키오스크 앱 개발', 'FIFA 랭킹 데이터 웹 크롤링 및 파싱 구조 구축', 'Hive 로컬 캐싱, 다국어 지원, design.json 기반 설정 분리'],
        achievements: ['window_manager로 타이틀바 제거 및 전체화면 키오스크 환경 구현', '오프라인 환경에서도 안정적인 데이터 캐싱'],
        tags: ['Flutter Desktop', 'window_manager', 'Hive', 'easy_localization'],
      },
      {
        name: '경기 소방안전마루 OX 퀴즈 키오스크',
        period: '2025.07 — 2025.10',
        tasks: ['Flutter Windows 기반 가로형 OX 퀴즈 키오스크 개발', 'Rive 애니메이션 + audioplayers 효과음/BGM 연동', 'IdleTimerNotifier 기반 자동 홈 복귀 시스템 구현'],
        achievements: ['시각적 몰입감 높은 인터랙티브 퀴즈 플로우 구현', 'info.json 기반 문항·설정 분리로 유지보수 효율화'],
        tags: ['Flutter Desktop', 'rive', 'audioplayers', 'provider', 'window_manager'],
      },
      {
        name: '영양군 별자리 미디어아트 태블릿 앱',
        period: '2025.08 — 2025.09',
        tasks: ['Flutter 태블릿 전용 드로잉 앱 개발', 'flutter_drawing_board로 별자리 위 자유 드로잉 구현', '드로잉 이미지 캡처 후 Unity 미디어아트 시스템 전송'],
        achievements: ['글래스모피즘 UI + 커스텀 폰트로 전시 감성 구현', '터치 드로잉 캔버스 해상도 및 성능 최적화'],
        tags: ['Flutter', 'flutter_drawing_board', 'Hive', 'Unity 연동'],
      },
      {
        name: '기획자용 멀티 언어 TTS Windows 앱',
        period: '2025.12',
        tasks: ['Flutter Desktop Windows 기반 업무용 유틸리티 앱 개발', 'Google Translation API + Typecast API 다중 엔진 연동', '오디오 미리듣기 및 로컬 파일 관리 기능 구현'],
        achievements: ['번역부터 TTS 음성 생성까지 원스톱 처리 워크플로우 구현', '서로 다른 API 응답 규격 통합 및 비동기 제어'],
        tags: ['Flutter Desktop', 'Google API', 'Typecast API', 'audioplayers'],
      },
      {
        name: '울산 정보 키오스크',
        period: '2026.02 — 현재',
        tasks: ['Flutter Windows 기반 세로형 키오스크 개발 및 유지보수', '동적 해상도 적용 로직으로 UI 비율 왜곡 문제 해결', '콘텐츠 및 이미지 리소스 정기 교체 유지보수'],
        achievements: ['디스플레이 해상도 변경 시 실시간 스케일링 재산정 로직 구현', 'Windows Release 환경 라이프사이클 안정화'],
        tags: ['Flutter Desktop', 'window_manager', 'provider', 'carousel_slider'],
      },
      {
        name: '한샘 관리자 웹페이지 퍼블리싱',
        period: '2025.01 — 2025.02',
        tasks: ['Bootstrap 5 기반 반응형 관리자 대시보드 퍼블리싱', 'Simple-DataTables 기반 동적 데이터 테이블 구현', '다중 이미지 업로드 및 모달 컴포넌트 개발'],
        achievements: ['사내 최초 웹 퍼블리싱 표준 도입 및 컴포넌트 재사용성 확보'],
        tags: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript', 'jQuery'],
      },
      {
        name: '하이커스 웹사이트 개발',
        period: '2025.07 — 2025.11',
        tasks: ['HTML/CSS/JS 기반 디지털 아트 플랫폼 웹사이트 개발', '커스텀 캐러셀·슬라이더 구현', 'React 이관을 고려한 컴포넌트 구조 지향적 코드 작성'],
        achievements: ['반응형 레이아웃 및 크로스 브라우징 정합성 확보', 'React 전환 효율성을 고려한 클린 코드 설계'],
        tags: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
      },
      {
        name: 'KT Realcube Controller',
        period: '2022.07',
        tasks: ['Flutter Desktop OSC 프로토콜 기반 컨트롤러 앱 개발', 'UDP 소켓을 통한 비동기 데이터 전송 구현', '한글 데이터 인코딩 처리 및 유효성 검사 로직 구현'],
        achievements: ['외부 의존성 없는 OSC 메시지 인코딩/디코딩 직접 모듈화'],
        tags: ['Flutter', 'OSC Protocol', 'UDP Socket', 'shared_preferences'],
      },
      {
        name: '역량 체크 - REST API 갤러리 앱',
        period: '2022.03 — 2022.04',
        tasks: ['Flutter REST API 연동 및 JSON 데이터 파싱', 'FutureBuilder 기반 비동기 상태 관리', 'cached_network_image 이미지 캐싱으로 성능 최적화'],
        achievements: ['반응형 GridView + 로컬 페이징 로직 구현'],
        tags: ['Flutter', 'http', 'cached_network_image', 'FutureBuilder'],
      },
      {
        name: '한국은행 통계 조회 앱 (PoC)',
        period: '2022.06',
        tasks: ['Flutter 기반 금융 통계 데이터 시각화 프로토타입 개발', '확장성 있는 디렉토리 구조 및 초기 아키텍처 설계'],
        achievements: ['대용량 데이터 바인딩 및 상태 관리 패턴 도입 설계'],
        tags: ['Flutter', 'REST API'],
      },
    ],
    tags: ['Flutter', 'Dart', 'Python', 'Flask', 'SQLite', 'ComfyUI', 'HTML', 'CSS', 'JS'],
  },
];

const Experience = () => {
  const { isDark } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
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
            <motion.div className="timeline-item" key={i} initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-period">{exp.period}</span>
                <h3 className="timeline-company">{exp.company}</h3>
                <h4 className="timeline-role">{exp.role}</h4>

                {/* 핵심 성과 */}
                <div className="exp-highlights">
                  {exp.highlights.map((h, hi) => (
                    <div className="exp-highlight-item" key={hi}>
                      <span className="exp-highlight-label">{h.label}</span>
                      <span className="exp-highlight-text">{h.text}</span>
                    </div>
                  ))}
                </div>

                {/* 프로젝트 아코디언 */}
                <div className="exp-projects">
                  <p className="exp-projects-title">▸ 수행 프로젝트 ({exp.projects.length}개)</p>
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
                          <motion.div className="exp-project-detail" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                            <div className="exp-section">
                              <h5>■ 수행 업무</h5>
                              <ul>{proj.tasks.map((t, ti) => <li key={ti}>{t}</li>)}</ul>
                            </div>
                            <div className="exp-section">
                              <h5>■ 주요 성과</h5>
                              <ul>{proj.achievements.map((a, ai) => <li key={ai}>{a}</li>)}</ul>
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
