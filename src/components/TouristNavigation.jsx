import { useState, useEffect } from 'react'
import './TouristNavigation.css'

function TouristNavigation() {
  const [navigationMode, setNavigationMode] = useState('explore') // 'explore', 'navigate', 'nearbyBus'
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.9715, lng: 23.7257 }) // Ακρόπολη
  const [isNavigating, setIsNavigating] = useState(false)
  const [distance, setDistance] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [isMapZoomed, setIsMapZoomed] = useState(false)
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Mock locations - Αξιοθέατα
  const attractions = [
    {
      id: 1,
      name: 'Παρθενώνας',
      type: 'attraction',
      distance: '120m',
      distanceValue: 120,
      time: '2 λεπτά',
      category: 'Αρχαιολογικός Χώρος',
      coordinates: { lat: 37.9715, lng: 23.7266 },
      description: 'Ο πιο διάσημος ναός της αρχαίας Ελλάδας',
      hours: 'Ανοιχτά: 08:00 - 20:00',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Ερέχθειο',
      type: 'attraction',
      distance: '200m',
      distanceValue: 200,
      time: '3 λεπτά',
      category: 'Αρχαιολογικός Χώρος',
      coordinates: { lat: 37.9725, lng: 23.7265 },
      description: 'Ο ναός με τις Καρυάτιδες',
      hours: 'Ανοιχτά: 08:00 - 20:00',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Θέατρο Ηρώδου Αττικού',
      type: 'attraction',
      distance: '350m',
      distanceValue: 350,
      time: '5 λεπτά',
      category: 'Αρχαίο Θέατρο',
      coordinates: { lat: 37.9710, lng: 23.7238 },
      description: 'Αρχαίο θέατρο που χρησιμοποιείται ακόμα',
      hours: 'Επισκέψιμο κατά τις παραστάσεις',
      rating: 4.7
    }
  ]

  // Mock locations - Εστιατόρια
  const restaurants = [
    {
      id: 11,
      name: 'Taverna Plaka',
      type: 'restaurant',
      distance: '280m',
      distanceValue: 280,
      time: '4 λεπτά',
      category: 'Ταβέρνα',
      coordinates: { lat: 37.9732, lng: 23.7280 },
      description: 'Παραδοσιακή ελληνική κουζίνα',
      hours: 'Ανοιχτά: 12:00 - 23:00',
      cuisine: 'Ελληνική',
      rating: 4.6,
      priceRange: '€€'
    },
    {
      id: 12,
      name: 'Strofi Restaurant',
      type: 'restaurant',
      distance: '450m',
      distanceValue: 450,
      time: '6 λεπτά',
      category: 'Εστιατόριο',
      coordinates: { lat: 37.9690, lng: 23.7240 },
      description: 'Θέα στην Ακρόπολη',
      hours: 'Ανοιχτά: 13:00 - 00:00',
      cuisine: 'Μεσογειακή',
      rating: 4.7,
      priceRange: '€€€'
    },
    {
      id: 13,
      name: 'Kuzina',
      type: 'restaurant',
      distance: '520m',
      distanceValue: 520,
      time: '7 λεπτά',
      category: 'Fine Dining',
      coordinates: { lat: 37.9750, lng: 23.7290 },
      description: 'Σύγχρονη ελληνική κουζίνα',
      hours: 'Ανοιχτά: 13:00 - 01:00',
      cuisine: 'Μοντέρνα Ελληνική',
      rating: 4.8,
      priceRange: '€€€'
    }
  ]

  // Mock locations - Στάσεις Λεωφορείου
  const busStops = [
    {
      id: 21,
      name: 'Στάση Ακρόπολη',
      type: 'busStop',
      distance: '150m',
      distanceValue: 150,
      time: '2 λεπτά',
      coordinates: { lat: 37.9705, lng: 23.7245 },
      nextBus: '8 λεπτά',
      route: 'Γραμμή Τουριστική A',
      stops: 'Ακρόπολη → Μουσείο → Πλάκα → Σύνταγμα'
    },
    {
      id: 22,
      name: 'Στάση Μουσείο Ακρόπολης',
      type: 'busStop',
      distance: '850m',
      distanceValue: 850,
      time: '11 λεπτά',
      coordinates: { lat: 37.9689, lng: 23.7281 },
      nextBus: '15 λεπτά',
      route: 'Γραμμή Τουριστική A',
      stops: 'Μουσείο → Πλάκα → Σύνταγμα → Εθνικός Κήπος'
    }
  ]

  const allLocations = [...attractions, ...restaurants, ...busStops]

  useEffect(() => {
    if (isNavigating && selectedDestination) {
      const interval = setInterval(() => {
        setDistance(prev => Math.max(0, prev - 5))
        setEstimatedTime(prev => Math.max(0, prev - 1))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isNavigating, selectedDestination])

  const handleMouseDown = (e) => {
    if (isMapZoomed) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - mapPosition.x,
        y: e.clientY - mapPosition.y
      })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && isMapZoomed) {
      setMapPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const startNavigation = (location) => {
    setSelectedDestination(location)
    setDistance(location.distanceValue)
    setEstimatedTime(parseInt(location.time))
    setIsNavigating(true)
    setNavigationMode('navigate')
  }

  const stopNavigation = () => {
    setIsNavigating(false)
    setSelectedDestination(null)
    setNavigationMode('explore')
  }

  const getLocationsByType = (type) => {
    return allLocations.filter(loc => loc.type === type)
  }

  return (
    <div className="tourist-navigation">
      <div className="navigation-header">
        <h1>🗺️ Τουριστική Πλοήγηση</h1>
        <p className="current-location">
          📍 Βρίσκεστε στην περιοχή Ακρόπολης
        </p>
      </div>

      {/* Mode Selector */}
      <div className="mode-selector">
        <button 
          className={navigationMode === 'explore' ? 'mode-btn active' : 'mode-btn'}
          onClick={() => { stopNavigation(); setNavigationMode('explore'); }}
        >
          🔍 Εξερευνήστε
        </button>
        <button 
          className={navigationMode === 'nearbyBus' ? 'mode-btn active' : 'mode-btn'}
          onClick={() => { stopNavigation(); setNavigationMode('nearbyBus'); }}
        >
          🚌 Κοντινές Στάσεις
        </button>
      </div>

      {/* Navigation Active */}
      {isNavigating && selectedDestination && (
        <div className="active-navigation">
          <div className="nav-top">
            <button className="stop-nav-btn" onClick={stopNavigation}>
              ✕ Τερματισμός
            </button>
          </div>
          
          <div className="nav-map-view">
            <div className="nav-map-simulation">
              <div className="current-marker" title="Η θέση σας">📍</div>
              <div className="destination-marker" title={selectedDestination.name}>
                {selectedDestination.type === 'attraction' && '🏛️'}
                {selectedDestination.type === 'restaurant' && '🍽️'}
                {selectedDestination.type === 'busStop' && '🚌'}
              </div>
              <div className="route-line"></div>
            </div>
          </div>

          <div className="nav-instructions">
            <div className="nav-distance">
              <span className="distance-value">{distance}m</span>
              <span className="distance-label">απομένουν</span>
            </div>
            <div className="nav-time">
              <span className="time-icon">⏱️</span>
              <span>{estimatedTime} λεπτά</span>
            </div>
            <div className="nav-direction">
              <div className="direction-arrow">↑</div>
              <p className="direction-text">Συνεχίστε ευθεία για 100m</p>
            </div>
          </div>

          <div className="destination-info">
            <h3>{selectedDestination.name}</h3>
            <p className="destination-category">{selectedDestination.category}</p>
            <p className="destination-description">{selectedDestination.description}</p>
          </div>
        </div>
      )}

      {/* Explore Mode */}
      {!isNavigating && navigationMode === 'explore' && (
        <div className="explore-mode">
          <div className="explore-map">
            <div className="map-container-nav">
              <div className="map-zoom-controls">
                <button 
                  className="zoom-btn" 
                  onClick={() => setIsMapZoomed(!isMapZoomed)}
                  title={isMapZoomed ? "Zoom Out" : "Zoom In"}
                >
                  {isMapZoomed ? '−' : '+'}
                </button>
              </div>
              <div 
                className={`map-simulation-nav ${isMapZoomed ? 'zoomed' : ''}`}
                style={{
                  transform: isMapZoomed ? `scale(1.5) translate(${mapPosition.x / 1.5}px, ${mapPosition.y / 1.5}px)` : 'scale(1)',
                  cursor: isMapZoomed ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                <div className="user-position" title="Εσείς">
                  <div className="user-pulse"></div>
                  📍
                </div>
                
                {allLocations.map(location => (
                  <div
                    key={location.id}
                    className={`location-marker marker-${location.type}`}
                    onClick={() => setSelectedDestination(location)}
                    style={{
                      left: `${50 + (location.coordinates.lng - 23.7257) * 8000}%`,
                      top: `${50 - (location.coordinates.lat - 37.9715) * 16000}%`
                    }}
                    title={location.name}
                  >
                    {location.type === 'attraction' && '🏛️'}
                    {location.type === 'restaurant' && '🍽️'}
                    {location.type === 'busStop' && '🚌'}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="location-categories">
            <div className="category-section">
              <h3>🏛️ Κοντινά Αξιοθέατα</h3>
              <div className="location-list">
                {getLocationsByType('attraction').map(location => (
                  <div 
                    key={location.id} 
                    className={`location-card ${selectedDestination?.id === location.id ? 'selected' : ''}`}
                    onClick={() => setSelectedDestination(location)}
                  >
                    <div className="location-icon">🏛️</div>
                    <div className="location-info">
                      <h4>{location.name}</h4>
                      <p className="location-meta">
                        <span>{location.distance}</span>
                        <span>•</span>
                        <span>{location.time}</span>
                      </p>
                      <p className="location-category">{location.category}</p>
                    </div>
                    <button 
                      className="nav-btn"
                      onClick={(e) => { e.stopPropagation(); startNavigation(location); }}
                    >
                      →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="category-section">
              <h3>🍽️ Συνεργαζόμενα Εστιατόρια</h3>
              <div className="location-list">
                {getLocationsByType('restaurant').map(location => (
                  <div 
                    key={location.id} 
                    className={`location-card ${selectedDestination?.id === location.id ? 'selected' : ''}`}
                    onClick={() => setSelectedDestination(location)}
                  >
                    <div className="location-icon">🍽️</div>
                    <div className="location-info">
                      <h4>{location.name}</h4>
                      <p className="location-meta">
                        <span>{location.distance}</span>
                        <span>•</span>
                        <span>{location.time}</span>
                        <span>•</span>
                        <span>{location.priceRange}</span>
                      </p>
                      <p className="location-category">{location.cuisine} - ⭐ {location.rating}</p>
                    </div>
                    <button 
                      className="nav-btn"
                      onClick={(e) => { e.stopPropagation(); startNavigation(location); }}
                    >
                      →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Location Details */}
          {selectedDestination && !isNavigating && (
            <div className="location-details-panel">
              <button className="close-details" onClick={() => setSelectedDestination(null)}>✕</button>
              <div className="details-header">
                <div className="details-icon">
                  {selectedDestination.type === 'attraction' && '🏛️'}
                  {selectedDestination.type === 'restaurant' && '🍽️'}
                  {selectedDestination.type === 'busStop' && '🚌'}
                </div>
                <div>
                  <h3>{selectedDestination.name}</h3>
                  <p className="details-distance">{selectedDestination.distance} από εσάς</p>
                </div>
              </div>
              
              <div className="details-body">
                <p className="details-description">{selectedDestination.description}</p>
                
                <div className="details-info">
                  <div className="info-item">
                    <span className="info-icon">🕒</span>
                    <span>{selectedDestination.hours}</span>
                  </div>
                  {selectedDestination.rating && (
                    <div className="info-item">
                      <span className="info-icon">⭐</span>
                      <span>{selectedDestination.rating}/5.0</span>
                    </div>
                  )}
                  {selectedDestination.priceRange && (
                    <div className="info-item">
                      <span className="info-icon">💰</span>
                      <span>{selectedDestination.priceRange}</span>
                    </div>
                  )}
                </div>
              </div>

              <button 
                className="start-navigation-btn"
                onClick={() => startNavigation(selectedDestination)}
              >
                🧭 Ξεκινήστε Πλοήγηση
              </button>
            </div>
          )}
        </div>
      )}

      {/* Nearby Bus Stops Mode */}
      {!isNavigating && navigationMode === 'nearbyBus' && (
        <div className="nearby-bus-mode">
          <div className="bus-map">
            <div className="map-container-nav">
              <div className="map-zoom-controls">
                <button 
                  className="zoom-btn" 
                  onClick={() => setIsMapZoomed(!isMapZoomed)}
                  title={isMapZoomed ? "Zoom Out" : "Zoom In"}
                >
                  {isMapZoomed ? '−' : '+'}
                </button>
              </div>
              <div 
                className={`map-simulation-nav ${isMapZoomed ? 'zoomed' : ''}`}
                style={{
                  transform: isMapZoomed ? `scale(1.5) translate(${mapPosition.x / 1.5}px, ${mapPosition.y / 1.5}px)` : 'scale(1)',
                  cursor: isMapZoomed ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                <div className="user-position" title="Εσείς">
                  <div className="user-pulse"></div>
                  📍
                </div>
                
                {busStops.map(stop => (
                  <div
                    key={stop.id}
                    className="location-marker marker-busStop highlighted"
                    onClick={() => setSelectedDestination(stop)}
                    style={{
                      left: `${50 + (stop.coordinates.lng - 23.7257) * 8000}%`,
                      top: `${50 - (stop.coordinates.lat - 37.9715) * 16000}%`
                    }}
                    title={stop.name}
                  >
                    🚌
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bus-stops-list">
            <h3>Κοντινές Στάσεις Λεωφορείου</h3>
            <p className="bus-info-text">Επιλέξτε στάση για να επιστρέψετε στο τουριστικό λεωφορείο</p>
            
            {busStops.map(stop => (
              <div 
                key={stop.id} 
                className={`bus-stop-card ${selectedDestination?.id === stop.id ? 'selected' : ''}`}
                onClick={() => setSelectedDestination(stop)}
              >
                <div className="bus-stop-icon">🚌</div>
                <div className="bus-stop-info">
                  <h4>{stop.name}</h4>
                  <p className="bus-stop-meta">
                    <span>{stop.distance}</span>
                    <span>•</span>
                    <span>{stop.time} με τα πόδια</span>
                  </p>
                  <div className="bus-route-info">
                    <span className="route-badge">{stop.route}</span>
                    <span className="next-bus">Επόμενο: {stop.nextBus}</span>
                  </div>
                  <p className="bus-stops-preview">{stop.stops}</p>
                </div>
                <button 
                  className="nav-btn bus-nav"
                  onClick={(e) => { e.stopPropagation(); startNavigation(stop); }}
                >
                  →
                </button>
              </div>
            ))}
          </div>

          {selectedDestination && selectedDestination.type === 'busStop' && !isNavigating && (
            <div className="bus-stop-details">
              <button className="close-details" onClick={() => setSelectedDestination(null)}>✕</button>
              <h3>🚌 {selectedDestination.name}</h3>
              <div className="bus-details-content">
                <div className="bus-detail-item">
                  <span className="label">Απόσταση:</span>
                  <span className="value">{selectedDestination.distance}</span>
                </div>
                <div className="bus-detail-item">
                  <span className="label">Χρόνος:</span>
                  <span className="value">{selectedDestination.time}</span>
                </div>
                <div className="bus-detail-item">
                  <span className="label">Επόμενο Λεωφορείο:</span>
                  <span className="value highlight">{selectedDestination.nextBus}</span>
                </div>
                <div className="bus-detail-route">
                  <span className="label">Διαδρομή:</span>
                  <p className="route-text">{selectedDestination.stops}</p>
                </div>
              </div>
              <button 
                className="start-navigation-btn"
                onClick={() => startNavigation(selectedDestination)}
              >
                🧭 Πλοηγηθείτε στη Στάση
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TouristNavigation
