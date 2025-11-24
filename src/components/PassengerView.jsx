import { useState } from 'react'
import LiveView from './LiveView'
import Attractions from './Attractions'
import CafeOrders from './CafeOrders'
import TouristNavigation from './TouristNavigation'
import './PassengerView.css'

function PassengerView() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="passenger-view">
      <div className="passenger-header">
        <h1>Έξυπνο Τουριστικό Λεωφορείο</h1>
        <p className="welcome-text">Καλώς ήρθατε στο ταξίδι σας</p>
      </div>

      <div className="tab-navigation">
        <button 
          className={activeTab === 'home' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('home')}
        >
          <span className="icon">🏠</span>
          Αρχική
        </button>
        <button 
          className={activeTab === 'live-view' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('live-view')}
        >
          <span className="icon">📹</span>
          Ζωντανή Θέα
        </button>
        <button 
          className={activeTab === 'attractions' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('attractions')}
        >
          <span className="icon">🏛️</span>
          Αξιοθέατα
        </button>
        <button 
          className={activeTab === 'cafe' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('cafe')}
        >
          <span className="icon">☕</span>
          Καφετέριες
        </button>
        <button 
          className={activeTab === 'navigation' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab('navigation')}
        >
          <span className="icon">🗺️</span>
          Πλοήγηση
        </button>
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
                <div className="info-item">
                  <span className="info-label">Επόμενη Στάση:</span>
                  <span className="info-value">Ακρόπολη</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Εκτιμώμενη Άφιξη:</span>
                  <span className="info-value">15 λεπτά</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Θερμοκρασία:</span>
                  <span className="info-value">22°C</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Ενέργεια:</span>
                  <span className="info-value">85%</span>
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
