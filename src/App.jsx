import { useState, useEffect } from 'react'
import './App.css'
import PassengerView from './components/PassengerView'
import DriverView from './components/DriverView'

function App() {
  const [viewMode, setViewMode] = useState('passenger') // 'passenger' or 'driver'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    // Ensure the theme class is applied to both <html> and <body>
    // Some component styles may target body specifically, so applying to both increases coverage.
    document.documentElement.classList.remove('theme-light', 'theme-dark')
    document.body.classList.remove('theme-light', 'theme-dark')
    document.documentElement.classList.add(`theme-${theme}`)
    document.body.classList.add(`theme-${theme}`)
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Advanced Bus System</h1>
        <div className="header-controls">
          <div className="view-selector">
            <button 
              className={viewMode === 'passenger' ? 'active' : ''}
              onClick={() => setViewMode('passenger')}
            >
              Οθόνη Επιβάτη
            </button>
            <button 
              className={viewMode === 'driver' ? 'active' : ''}
              onClick={() => setViewMode('driver')}
            >
              Οθόνη Οδηγού
            </button>
          </div>

          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title="Toggle light/dark"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      
      {viewMode === 'passenger' ? <PassengerView /> : <DriverView />}
    </div>
  )
}

export default App
