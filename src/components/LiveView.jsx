import { useState } from 'react'
import videoSrc from '../assets/City Center Athens Greece by bus. POV.mp4'
import './LiveView.css'

function LiveView() {
  const [videoError, setVideoError] = useState(false)

  return (
    <div className="live-view-container">
      <div className="view-controls">
        {/* minimal controls area (could host fullscreen toggle) */}
      </div>

      {/* Replace mockup with a muted looping video. Put the file at `/public/city-center-athens.mp4` */}
      <div className="video-container">
        {!videoError ? (
          <video
            src={videoSrc}
            muted
            controls
            autoPlay
            loop
            playsInline
            aria-label="Live view of city center Athens"
            onError={(e) => {
              console.warn('LiveView video failed to load', e)
              setVideoError(true)
            }}
            onLoadedData={() => {
              // clear any previous error state
              setVideoError(false)
            }}
          />
        ) : (
          <div className="video-fallback">
            <div>
              <p style={{ fontWeight: 700, marginBottom: 8 }}>Video not available</p>
              <p style={{ marginBottom: 8 }}>Put the file <code>/public/city-center-athens.mp4</code> into the project.</p>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.6)' }}>Check browser console for load errors (404 or network).</p>
            </div>
          </div>
        )}
      </div>

      {/* view-description removed per user request */}
    </div>
  )
}

export default LiveView
