import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';

const Home = () => {
  const { 
    tracks, 
    playlists, 
    albums, 
    genres, 
    playTrack, 
    addToQueue,
    currentTrack,
    isPlaying 
  } = useContext(MusicContext);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayTrack = (track) => {
    if (currentTrack?.id === track.id) {
      // If same track, toggle play/pause
      return;
    }
    playTrack(track);
  };

  const handleAddToQueue = (track) => {
    addToQueue(track);
  };

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="page-header">
        <h1 className="page-title">🎵 WELCOME TO SPOTIFY 2.0 🎵</h1>
        <p className="page-subtitle">Discover your next favorite song ✨</p>
      </div>

      {/* Featured Tracks */}
      <div className="section-header">
        <h2 className="section-title">🔥 FEATURED TRACKS 🔥</h2>
        <a href="#" className="see-all">See All</a>
      </div>
      
      <div className="grid-container grid-4">
        {tracks.slice(0, 8).map(track => (
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

      {/* Featured Playlists */}
      <div className="section-header">
        <h2 className="section-title">📚 FEATURED PLAYLISTS 📚</h2>
        <a href="#" className="see-all">See All</a>
      </div>
      
      <div className="grid-container grid-3">
        {playlists.map(playlist => (
          <div key={playlist.id} className="card">
            <div className="card-image">
              🎵
              <button className="play-button">▶️</button>
            </div>
            <div className="card-title">{playlist.name}</div>
            <div className="card-subtitle">{playlist.tracks.length} tracks</div>
            <div className="card-description">{playlist.description}</div>
          </div>
        ))}
      </div>

      {/* Recent Albums */}
      <div className="section-header">
        <h2 className="section-title">💿 RECENT ALBUMS 💿</h2>
        <a href="#" className="see-all">See All</a>
      </div>
      
      <div className="grid-container grid-4">
        {albums.map(album => (
          <div key={album.id} className="card">
            <div className="card-image">
              🎵
              <button className="play-button">▶️</button>
            </div>
            <div className="card-title">{album.title}</div>
            <div className="card-subtitle">{album.artist}</div>
            <div className="card-description">{album.year}</div>
          </div>
        ))}
      </div>

      {/* Browse by Genre */}
      <div className="section-header">
        <h2 className="section-title">🎭 BROWSE BY GENRE 🎭</h2>
        <a href="#" className="see-all">See All</a>
      </div>
      
      <div className="grid-container grid-5">
        {genres.map(genre => (
          <div 
            key={genre.id} 
            className="card"
            style={{ 
              background: `linear-gradient(135deg, ${genre.color}20, ${genre.color}10)`,
              border: `1px solid ${genre.color}30`
            }}
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
            <div className="card-subtitle">Genre</div>
          </div>
        ))}
      </div>

      {/* Recently Played */}
      <div className="section-header">
        <h2 className="section-title">⏰ RECENTLY PLAYED ⏰</h2>
        <a href="#" className="see-all">See All</a>
      </div>
      
      <div className="grid-container grid-4">
        {tracks.slice(0, 4).map(track => (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
