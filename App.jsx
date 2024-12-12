// src/App.jsx
import { useState, useRef } from 'react'; 
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import Headerall from './Headerall'; // Headerallが存在することを確認
import Footer from './Footer'; 
import { motion } from 'framer-motion';
import { toPng } from "html-to-image";

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const headerRef = useRef(null); 

  const saveAsImage = () => {
    if (headerRef.current === null) return;

    toPng(headerRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "header-thumbnail.png"; 
        link.href = dataUrl; 
        link.click();
      })
      .catch((err) => {
        console.error("画像化に失敗しました:", err);
      });
  };

  const boxVariants = {
    initial: { x: 0, scale: 1 },
    hover: { x: 10, scale: 1.1 },
  };

  return (
    <div>
      {/* Routerの設定 */}
      <BrowserRouter>
        <div ref={headerRef}>
          <Headerall /> {/* Headerallが表示される部分 */}
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/Headerall" element={<Headerall />} />
        </Routes>
      </BrowserRouter>

      {/* 画像として保存するボタン */}
      <button
        onClick={saveAsImage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        画像として保存
      </button>

      {/* マウスオーバーのアニメーション */}
      <motion.div
        className="box"
        variants={boxVariants}
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1>Hover me!</h1>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;