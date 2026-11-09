import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: darkMode ? '#121212' : '#ffffff', 
        color: darkMode ? '#f3f4f6' : '#111827',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
    >
      <NavBar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main style={{ padding: '2rem' }}>
        <Outlet context={{ darkMode }} />
      </main>
    </div>
  );
}
