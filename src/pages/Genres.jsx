import React, { useContext, useState } from 'react';
import { MusicContext } from '../context/MusicContext';

const Genres = () => {
  const { genres, tracks, currentTrack, isPlaying, playTrack, addToQueue } = useContext(MusicContext);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayTrack = (track) => {
    if (currentTrack?.id === track.id) {
      return;
    }
    playTrack(track);
  };

  const handleAddToQueue = (track) => {
    addToQueue(track);
  };

  // Get tracks for each genre
  const genresWithTracks = genres.map(genre => {
    const genreTracks = tracks.filter(track => track.genre === genre.name);
    const totalDuration = genreTracks.reduce((sum, track) => sum + track.duration, 0);
    
    return {
      ...genre,
      tracks: genreTracks,
      totalDuration,
      trackCount: genreTracks.length
    };
  });

  const currentGenreData = selectedGenre 
    ? genresWithTracks.find(g => g.id === selectedGenre.id)
    : null;

  return (
    <div className="fade-in">
      {/* Genres Header */}
      <div className="page-header">
        <h1 className="page-title">🎭 GENRES 🎭</h1>
        <p className="page-subtitle">Explore music by genre 🎵</p>
      </div>

      {!selectedGenre ? (
        /* Genre Grid View */
        <div className="grid-container grid-4">
          {genresWithTracks.map(genre => (
            <div 
              key={genre.id} 
              className="card"
              style={{ 
                background: `linear-gradient(135deg, ${genre.color}20, ${genre.color}10)`,
                border: `1px solid ${genre.color}30`,
                cursor: 'pointer'
              }}
              onClick={() => setSelectedGenre(genre)}
            >
              <div 
                className="card-image"
                style={{ 
                  background: `linear-gradient(45deg, ${genre.color}, ${genre.color}80)`
                }}
              >
                🎵
                <button className="play-button">▶️</button>
              </div>
              <div className="card-title">{genre.name}</div>
              <div className="card-subtitle">{genre.trackCount} tracks</div>
              <div className="card-description">
                {formatTime(genre.totalDuration)} total duration
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Genre Detail View */
        <div>
          {/* Back Button */}
          <button 
            onClick={() => setSelectedGenre(null)}
            style={{
              background: 'none',
              border: '1px solid #535353',
              color: '#b3b3b3',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '24px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#1db954';
              e.target.style.color = '#1db954';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#535353';
              e.target.style.color = '#b3b3b3';
            }}
          >
            ⬅️ Back to Genres
          </button>

          {/* Genre Header */}
          <div 
            style={{
              background: `linear-gradient(135deg, ${selectedGenre.color}20, ${selectedGenre.color}10)`,
              border: `1px solid ${selectedGenre.color}30`,
              borderRadius: '12px',
              padding: '32px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px'
            }}
          >
            <div 
              style={{
                width: '120px',
                height: '120px',
                background: `linear-gradient(45deg, ${selectedGenre.color}, ${selectedGenre.color}80)`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px'
              }}
            >
              🎵
            </div>
            <div>
              <h2 style={{ 
                fontSize: '32px', 
                fontWeight: '700', 
                color: '#ffffff',
                marginBottom: '8px'
              }}>
                {selectedGenre.name}
              </h2>
              <p style={{ 
                fontSize: '16px', 
                color: '#b3b3b3',
                marginBottom: '8px'
              }}>
                🎵 {currentGenreData?.trackCount || 0} tracks
              </p>
              <p style={{ 
                fontSize: '14px', 
                color: '#6b6b6b'
              }}>
                ⏱️ {formatTime(currentGenreData?.totalDuration || 0)} total duration
              </p>
            </div>
          </div>

          {/* Genre Tracks */}
          {currentGenreData && currentGenreData.tracks.length > 0 ? (
            <div>
              <div className="section-header">
                <h2 className="section-title">🎵 TRACKS</h2>
                <span style={{ color: '#b3b3b3', fontSize: '14px' }}>
                  {currentGenreData.tracks.length} tracks
                </span>
              </div>
              
              <div className="grid-container grid-4">
                {currentGenreData.tracks.map(track => (
                  <div key={track.id} className="card">
                    <div className="card-image">
                      🎵
                      <button 
                        className="play-button"
                        onClick={() => handlePlayTrack(track)}
                      >
                        {currentTrack?.id === track.id && isPlaying ? '⏸️' : '▶️'}
                      </button>
                    </div>
                    <div className="card-title">{track.title}</div>
                    <div className="card-subtitle">{track.artist}</div>
                    <div className="card-description">
                      {track.album} • {formatTime(track.duration)}
                    </div>
                    <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleAddToQueue(track)}
                        style={{
                          background: 'none',
                          border: '1px solid #535353',
                          color: '#b3b3b3',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderColor = '#1db954';
                          e.target.style.color = '#1db954';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderColor = '#535353';
                          e.target.style.color = '#b3b3b3';
                        }}
                      >
                        📋 Add to Queue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div>🎵</div>
              <h3>No tracks found</h3>
              <p>This genre doesn't have any tracks yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Genres; 