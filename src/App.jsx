import { useState } from 'react'
import './App.css'
import PassengerView from './components/PassengerView'
import DriverView from './components/DriverView'

function App() {
  const [viewMode, setViewMode] = useState('passenger') // 'passenger' or 'driver'

  return (
    <div className="app-container">
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
      
      {viewMode === 'passenger' ? <PassengerView /> : <DriverView />}
    </div>
  )
}

export default App
