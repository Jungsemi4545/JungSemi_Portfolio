import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { isDark } = useTheme();
  const [displayed, setDisplayed] = useState('');
  const fullText = '크로스 플랫폼 & 풀스택 개발자';

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(t);
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className={`hero ${isDark ? 'dark' : 'light'}`}>
      <div className="bg-widgets">
        {['Widget()', 'build()', 'setState()', 'MaterialApp()', 'Scaffold()', 'StatefulWidget'].map((w, i) => (
          <span key={i} className={`bg-widget widget-${i}`}>{w}</span>
        ))}
      </div>
      <div className="hero-content">
        <motion.p className="hero-greeting" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          👋 안녕하세요, 저는
        </motion.p>
        <motion.h1 className="hero-name" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          정세미
        </motion.h1>
        <motion.h2 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <span className="typed-text">{displayed}</span><span className="cursor">|</span>
        </motion.h2>
        <motion.blockquote className="hero-quote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}>
          "사용자의 문제를 해결하고, 효율적인 아키텍처를 설계하는 개발자입니다."
        </motion.blockquote>
        <motion.p className="hero-bio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}>
          Flutter를 활용한 멀티 플랫폼 어플리케이션 개발을 주력으로 하며,<br />
          Python(Flask) 백엔드부터 ComfyUI AI 데이터 가공까지 서비스 전반을 다룹니다.
        </motion.p>
        <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }}>
          <Link to="projects" smooth duration={600} offset={-70}><button className="btn-primary">프로젝트 보기</button></Link>
          <Link to="contact" smooth duration={600} offset={-70}><button className="btn-outline">연락하기</button></Link>
        </motion.div>
      </div>
      <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
        <div className="phone-mockup">
          <div className="phone-screen">
            <div className="app-bar"><span>Flutter App</span></div>
            <div className="app-content">
              <div className="card-item"></div>
              <div className="card-item short"></div>
              <div className="fab">+</div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="scroll-hint">
        <Link to="about" smooth duration={600} offset={-70}>
          <span>스크롤</span>
          <div className="scroll-arrow">↓</div>
        </Link>
      </div>
    </section>
  );
};
export default Hero;
