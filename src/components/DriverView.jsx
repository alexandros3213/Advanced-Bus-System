import { useState } from 'react'
import './DriverView.css'

function DriverView() {
  const [orders, setOrders] = useState([
    { id: 1, seat: 'A12', items: 'Καφές Espresso, Κρουασάν', stop: 'Ακρόπολη', status: 'pending' },
    { id: 2, seat: 'B08', items: 'Καπουτσίνο, Τυρόπιτα', stop: 'Μουσείο', status: 'ready' },
    { id: 3, seat: 'C15', items: 'Χυμός Πορτοκάλι', stop: 'Ακρόπολη', status: 'delivered' },
  ])

  const [busStats] = useState({
    speed: 45,
    battery: 85,
    temperature: 22,
    passengers: 28,
    nextStop: 'Ακρόπολη',
    eta: '15 λεπτά'
  })

  return (
    <div className="driver-view">
      <div className="driver-header">
        <h1>Πίνακας Ελέγχου Οδηγού</h1>
        <div className="status-bar">
          <span className="status-item">🚌 Ταχύτητα: {busStats.speed} km/h</span>
          <span className="status-item">🔋 Μπαταρία: {busStats.battery}%</span>
          <span className="status-item">🌡️ Θερμοκρασία: {busStats.temperature}°C</span>
          <span className="status-item">👥 Επιβάτες: {busStats.passengers}</span>
        </div>
      </div>

      <div className="driver-content">
        <div className="route-section">
          <h2>Πληροφορίες Διαδρομής</h2>
          <div className="route-card">
            <div className="route-detail">
              <span className="label">Επόμενη Στάση:</span>
              <span className="value">{busStats.nextStop}</span>
            </div>
            <div className="route-detail">
              <span className="label">Εκτιμώμενη Άφιξη:</span>
              <span className="value">{busStats.eta}</span>
            </div>
            <div className="route-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>

          <div className="energy-section">
            <h3>Ενεργειακή Κατάσταση</h3>
            <div className="energy-grid">
              <div className="energy-card">
                <span className="energy-icon">☀️</span>
                <span className="energy-label">Φωτοβολταϊκά</span>
                <span className="energy-value">+12 kW</span>
              </div>
              <div className="energy-card">
                <span className="energy-icon">🔋</span>
                <span className="energy-label">Κατανάλωση</span>
                <span className="energy-value">-8 kW</span>
              </div>
              <div className="energy-card">
                <span className="energy-icon">💡</span>
                <span className="energy-label">Φωτισμός</span>
                <span className="energy-value">AUTO</span>
              </div>
            </div>
          </div>
        </div>

        <div className="orders-section">
          <h2>Παραγγελίες Επιβατών</h2>
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className={`order-card ${order.status}`}>
                <div className="order-header">
                  <span className="seat-number">Θέση {order.seat}</span>
                  <span className={`order-status status-${order.status}`}>
                    {order.status === 'pending' && '⏳ Σε Εκκρεμότητα'}
                    {order.status === 'ready' && '✅ Έτοιμη'}
                    {order.status === 'delivered' && '📦 Παραδόθηκε'}
                  </span>
                </div>
                <div className="order-body">
                  <p className="order-items">{order.items}</p>
                  <p className="order-stop">Παράδοση: <strong>{order.stop}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sensors-section">
        <h2>Αισθητήρες & Συστήματα</h2>
        <div className="sensors-grid">
          <div className="sensor-card">
            <span className="sensor-icon">🌤️</span>
            <span className="sensor-label">Καιρός</span>
            <span className="sensor-value">Αίθριος</span>
          </div>
          <div className="sensor-card">
            <span className="sensor-icon">💨</span>
            <span className="sensor-label">Κλιματισμός</span>
            <span className="sensor-value">AUTO 22°C</span>
          </div>
          <div className="sensor-card">
            <span className="sensor-icon">🔆</span>
            <span className="sensor-label">Φωτισμός</span>
            <span className="sensor-value">75%</span>
          </div>
          <div className="sensor-card">
            <span className="sensor-icon">🛡️</span>
            <span className="sensor-label">Συστήματα</span>
            <span className="sensor-value">OK</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverView
