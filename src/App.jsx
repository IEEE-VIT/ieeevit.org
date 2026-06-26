import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Alumni from './components/Alumni';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [path, setPath] = useState(window.location.pathname);
  const [loading, setLoading] = useState(false);

  // Sync theme with localStorage and body element
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  // Sync path on browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initial loading animation timer matching the original site loader
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 600);
  //   return () => clearTimeout(timer);
  // }, []);

  const handleNavigate = (newPath) => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
  };

  // if (loading) {
  //   return (
  //     <div id="loader">
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //     </div>
  //   );
  // }

  const isAlumniPage = path === '/alumni' || path === '/alumni.html';

  return (
    <>
      <Navbar
        theme={theme}
        setTheme={setTheme}
        currentPath={path}
        onNavigate={handleNavigate}
      />
      {isAlumniPage ? (
        <Alumni theme={theme} />
      ) : (
        <Home theme={theme} onNavigate={handleNavigate} />
      )}
    </>
  );
}

export default App;
