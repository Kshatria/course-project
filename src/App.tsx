import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import styles from '@/styles/app.module.css';

export default function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>My App</h1>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
