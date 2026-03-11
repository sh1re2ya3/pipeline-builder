import { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import { PipelineUI } from './ui';
import { BottomBar } from './bottomBar';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Update theme in DOM and storage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <header className="app-header">
        <div className="app-title">
          <h1>Pipeline Builder</h1>
          <p className="app-subtitle">Create and analyze directed workflows visually.</p>
        </div>
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={handleToggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '☾' : '☼'}
          </button>
        </div>
      </header>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
      />
      <main className="canvas-area">
        <PipelineUI />
      </main>
      <BottomBar />
    </div>
  );
}

export default App;
