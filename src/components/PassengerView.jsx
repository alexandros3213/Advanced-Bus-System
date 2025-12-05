import { useState, useRef, useEffect } from 'react'
import LiveView from './LiveView'
import Attractions from './Attractions'
import CafeOrders from './CafeOrders'
import TouristNavigation from './TouristNavigation'
import './PassengerView.css'

function PassengerView() {
  const [activeTab, setActiveTab] = useState('home')
  const navRef = useRef(null)
  const tabRefs = useRef([])
  const gliderRef = useRef(null)

  const tabs = [
    { id: 'home', icon: '🏠', label: 'Αρχική' },
    { id: 'live-view', icon: '📹', label: 'Ζωντανή Θέα' },
    { id: 'attractions', icon: '🏛️', label: 'Αξιοθέατα' },
    { id: 'cafe', icon: '☕', label: 'Καφετέριες' },
    { id: 'navigation', icon: '🗺️', label: 'Πλοήγηση' }
  ]

  // Display data for passenger overview
  const todayRoute = ['Ακρόπολη', 'Μουσείο Ακρόπολης', 'Σύνταγμα']
  const hasWifi = true
  const minutesToNextStop = 5
  const nextStopName = 'Ακρόπολη'
  const batteryPercent = 85

  useEffect(() => {
    const updateGlider = () => {
      const index = tabs.findIndex(t => t.id === activeTab)
      const el = tabRefs.current[index]
      const nav = navRef.current
      const glider = gliderRef.current
      if (!el || !glider || !nav) return

      // center the active tab in the scroll container
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })

      const left = el.offsetLeft - nav.scrollLeft
      glider.style.transform = `translateX(${left}px)`
      glider.style.width = `${el.offsetWidth}px`
    }

    // update now and on resize
    updateGlider()
    window.addEventListener('resize', updateGlider)
    return () => window.removeEventListener('resize', updateGlider)
  }, [activeTab])

  return (
    <div className="passenger-view">
      <div className="passenger-header">
        <h1>Έξυπνο Τουριστικό Λεωφορείο</h1>
        <p className="welcome-text">Καλώς ήρθατε στο ταξίδι σας</p>
      </div>

      <div className="tab-navigation" ref={navRef}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => (tabRefs.current[i] = el)}
            className={activeTab === t.id ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveTab(t.id)}
            aria-pressed={activeTab === t.id}
          >
            <span className="icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
        <div className="tab-glider" ref={gliderRef} aria-hidden="true" />
      </div>

      <div className="tab-content">
        {activeTab === 'home' && (
          <div className="home-content">
            <div className="info-card">
              <h2>Καλώς ήρθατε!</h2>
              <p>Απολαύστε το ταξίδι σας με τις έξυπνες υπηρεσίες μας:</p>
              <ul>
                <li>📹 Δείτε τη διαδρομή σε πραγματικό χρόνο</li>
                <li>🏛️ Ανακαλύψτε κοντινά αξιοθέατα</li>
                <li>☕ Παραγγείλτε από συνεργαζόμενες καφετέριες</li>
              </ul>
            </div>
                <div className="route-info">
                  <h3>Πληροφορίες Διαδρομής</h3>
                    <div className="info-grid">
                      <div className="info-item route-item">
                        <span className="info-label">Διαδρομή σήμερα</span>
                        <ol className="route-list">
                          {todayRoute.map((stop, idx) => (
                            <li key={stop} className="route-stop"><span className="stop-index">{idx + 1}.</span> <span className="stop-name">{stop}</span></li>
                          ))}
                        </ol>
                      </div>

                      <div className="right-cards">
                        <div className="info-item wifi-item">
                          <span className="info-label">Wi‑Fi</span>
                          <span className="info-value">{hasWifi ? 'Δωρεάν Wi‑Fi' : 'Χωρίς Wi‑Fi'}</span>
                        </div>

                        <div className="info-item nextstop-item">
                          <span className="info-label">Επόμενη στάση</span>
                          <span className="info-value">{nextStopName} · {minutesToNextStop} λεπτά</span>
                        </div>

                        <div className="info-item energy-item">
                          <span className="info-label">Ενέργεια</span>
                          <div className="battery" aria-hidden>
                            <div className="battery-inner" style={{ width: `${batteryPercent}%` }} />
                            <div className="battery-cap" />
                          </div>
                          <span className="info-value battery-text">{batteryPercent}%</span>
                        </div>
                      </div>
                    </div>
                </div>
          </div>
        )}
        {activeTab === 'live-view' && <LiveView />}
        {activeTab === 'attractions' && <Attractions />}
        {activeTab === 'cafe' && <CafeOrders />}
        {activeTab === 'navigation' && <TouristNavigation />}
      </div>
    </div>
  )
}

export default PassengerView
