import { useState, useEffect } from 'react'
import './LiveView.css'

function LiveView() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [roadPosition, setRoadPosition] = useState(0)
  const [treeOffset, setTreeOffset] = useState(0)

  // Animation για την προσομοίωση κίνησης
  useEffect(() => {
    const interval = setInterval(() => {
      setRoadPosition(prev => (prev + 2) % 100)
      setTreeOffset(prev => (prev + 1) % 50)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`live-view-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="view-controls">
        <button 
          className="fullscreen-btn"
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          {isFullscreen ? '⬅️ Επιστροφή' : '🖥️ Πλήρης Οθόνη'}
        </button>
      </div>

      <div className="road-simulation">
        <div className="sky">
          <div className="sun">☀️</div>
          <div className="cloud cloud-1">☁️</div>
          <div className="cloud cloud-2">☁️</div>
        </div>

        <div className="mountains">
          <div className="mountain mountain-1"></div>
          <div className="mountain mountain-2"></div>
          <div className="mountain mountain-3"></div>
        </div>

        <div className="trees">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`tree tree-${i + 1}`}
              style={{
                transform: `translateY(${(treeOffset + i * 10) % 50}px)`
              }}
            >
              🌳
            </div>
          ))}
        </div>

        <div className="road">
          <div className="road-lines">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="road-line"
                style={{
                  top: `${(roadPosition + i * 5) % 100}%`
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="dashboard-overlay">
          <div className="overlay-info">
            <span className="overlay-item">🚌 45 km/h</span>
            <span className="overlay-item">📍 Προς Ακρόπολη</span>
            <span className="overlay-item">⏱️ 15 λεπτά</span>
          </div>
        </div>
      </div>

      <div className="view-description">
        <h3>Ζωντανή Θέα Διαδρομής</h3>
        <p>Απολαύστε τη θέα της διαδρομής όπως τη βλέπει ο οδηγός σε πραγματικό χρόνο.</p>
      </div>
    </div>
  )
}

export default LiveView
