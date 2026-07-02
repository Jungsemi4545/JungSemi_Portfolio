import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { isDark } = useTheme();
  const [displayed, setDisplayed] = useState('');
  const fullText = 'Flutter App Developer';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(timer);
    }, 70);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className={`hero ${isDark ? 'dark' : 'light'}`}>
      {/* Flutter-inspired floating widgets */}
      <div className="bg-widgets">
        {['Widget()', 'build()', 'setState()', 'MaterialApp()', 'Scaffold()', 'StatefulWidget'].map((w, i) => (
          <span key={i} className={`bg-widget widget-${i}`}>{w}</span>
        ))}
      </div>

      <div className="hero-content">
        <motion.p
          className="hero-greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          안녕하세요, 저는
        </motion.p>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Your Name
        </motion.h1>

        <motion.h2
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="typed-text">{displayed}</span>
          <span className="cursor">|</span>
        </motion.h2>

        <motion.p
          className="hero-bio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Flutter로 모바일, 태블릿, 데스크톱, 웹을 아우르는<br />
          크로스플랫폼 앱을 개발합니다.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Link to="projects" smooth duration={600} offset={-70}>
            <button className="btn-primary">프로젝트 보기</button>
          </Link>
          <Link to="contact" smooth duration={600} offset={-70}>
            <button className="btn-outline">연락하기</button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="phone-mockup">
          <div className="phone-screen">
            <div className="app-bar">
              <span>MyApp</span>
            </div>
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
