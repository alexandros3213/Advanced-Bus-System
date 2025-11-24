import { useState } from 'react'
import './Attractions.css'

function Attractions() {
  const [selectedAttraction, setSelectedAttraction] = useState(null)
  const [isReading, setIsReading] = useState(false)
  const [viewMode, setViewMode] = useState('list') // 'list' or 'map'

  const attractions = [
    {
      id: 1,
      name: 'Ακρόπολη',
      distance: '500m',
      description: 'Η Ακρόπολη των Αθηνών είναι ένας αρχαίος βραχώδης λόφος που υψώνεται στην καρδιά της σύγχρονης πόλης. Φιλοξενεί μερικά από τα σημαντικότερα αρχιτεκτονικά και καλλιτεχνικά μνημεία της αρχαίας Ελλάδας, με πιο διάσημο τον Παρθενώνα.',
      category: 'Αρχαιολογικός Χώρος',
      rating: 4.8,
      coordinates: { lat: 37.9715, lng: 23.7257 }
    },
    {
      id: 2,
      name: 'Μουσείο Ακρόπολης',
      distance: '800m',
      description: 'Το Νέο Μουσείο της Ακρόπολης είναι ένα αρχαιολογικό μουσείο που εστιάζει στα ευρήματα από τον αρχαιολογικό χώρο της Ακρόπολης των Αθηνών. Το μουσείο σχεδιάστηκε από τον Ελβετό αρχιτέκτονα Bernard Tschumi.',
      category: 'Μουσείο',
      rating: 4.7,
      coordinates: { lat: 37.9689, lng: 23.7281 }
    },
    {
      id: 3,
      name: 'Πλάκα',
      distance: '1.2km',
      description: 'Η Πλάκα είναι η παλιά ιστορική γειτονιά της Αθήνας, συγκεντρωμένη γύρω από τις βόρειες και ανατολικές πλαγιές της Ακρόπολης. Διατηρεί τον παραδοσιακό χαρακτήρα με στενά δρομάκια, ταβέρνες και καταστήματα.',
      category: 'Γειτονιά',
      rating: 4.6,
      coordinates: { lat: 37.9732, lng: 23.7273 }
    },
    {
      id: 4,
      name: 'Θέατρο Διονύσου',
      distance: '600m',
      description: 'Το Θέατρο του Διονύσου είναι ένα από τα αρχαιότερα θέατρα στον κόσμο. Κτίστηκε στη νότια πλαγιά της Ακρόπολης και αποτελεί το χώρο όπου εκτελέστηκαν για πρώτη φορά οι τραγωδίες των μεγάλων αρχαίων Ελλήνων δραματουργών.',
      category: 'Αρχαίο Θέατρο',
      rating: 4.5,
      coordinates: { lat: 37.9707, lng: 23.7275 }
    }
  ]

  const handleReadAloud = (text) => {
    setIsReading(true)
    
    // Προσομοίωση text-to-speech (στην πραγματικότητα θα χρησιμοποιούσαμε Web Speech API)
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'el-GR'
      utterance.onend = () => setIsReading(false)
      window.speechSynthesis.speak(utterance)
    } else {
      // Fallback για browsers που δεν υποστηρίζουν
      setTimeout(() => setIsReading(false), 3000)
      alert('Η λειτουργία ανάγνωσης δεν υποστηρίζεται σε αυτό το browser')
    }
  }

  const stopReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsReading(false)
  }

  return (
    <div className="attractions-container">
      <div className="attractions-header">
        <h2>Κοντινά Αξιοθέατα</h2>
        <div className="view-toggle">
          <button 
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            📋 Λίστα
          </button>
          <button 
            className={viewMode === 'map' ? 'active' : ''}
            onClick={() => setViewMode('map')}
          >
            🗺️ Χάρτης
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="attractions-list">
          {attractions.map(attraction => (
            <div 
              key={attraction.id} 
              className={`attraction-card ${selectedAttraction?.id === attraction.id ? 'selected' : ''}`}
              onClick={() => setSelectedAttraction(attraction)}
            >
              <div className="attraction-header">
                <h3>{attraction.name}</h3>
                <span className="distance">{attraction.distance}</span>
              </div>
              <div className="attraction-meta">
                <span className="category">{attraction.category}</span>
                <span className="rating">⭐ {attraction.rating}</span>
              </div>
              {selectedAttraction?.id === attraction.id && (
                <div className="attraction-details">
                  <p className="description">{attraction.description}</p>
                  <div className="attraction-actions">
                    <button 
                      className="action-btn read-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (isReading) {
                          stopReading()
                        } else {
                          handleReadAloud(attraction.description)
                        }
                      }}
                    >
                      {isReading ? '⏸️ Παύση' : '🔊 Άκουσε'}
                    </button>
                    <button 
                      className="action-btn map-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        setViewMode('map')
                      }}
                    >
                      🗺️ Δες στο Χάρτη
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="map-view">
          <div className="map-container">
            <div className="map-simulation">
              {attractions.map(attraction => (
                <div 
                  key={attraction.id}
                  className="map-marker"
                  style={{
                    left: `${((attraction.coordinates.lng - 23.72) * 5000)}px`,
                    top: `${((37.975 - attraction.coordinates.lat) * 10000)}px`
                  }}
                  onClick={() => setSelectedAttraction(attraction)}
                  title={attraction.name}
                >
                  📍
                </div>
              ))}
              <div className="bus-marker" title="Η θέση σας">
                🚌
              </div>
            </div>
          </div>
          
          {selectedAttraction && (
            <div className="map-info-panel">
              <button 
                className="close-btn"
                onClick={() => setSelectedAttraction(null)}
              >
                ✕
              </button>
              <h3>{selectedAttraction.name}</h3>
              <p className="distance">{selectedAttraction.distance} από εσάς</p>
              <p className="category">{selectedAttraction.category}</p>
              <p className="description">{selectedAttraction.description}</p>
              <div className="map-actions">
                <button 
                  className="action-btn"
                  onClick={() => {
                    if (isReading) {
                      stopReading()
                    } else {
                      handleReadAloud(selectedAttraction.description)
                    }
                  }}
                >
                  {isReading ? '⏸️ Παύση' : '🔊 Άκουσε'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Attractions
