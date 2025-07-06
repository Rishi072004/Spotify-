import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';

const Library = () => {
  const { 
    playlists, 
    tracks, 
    currentTrack, 
    isPlaying, 
    playTrack,
    addToQueue,
    createPlaylist
  } = useContext(MusicContext);

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

  const handleCreatePlaylist = () => {
    const name = prompt('Enter playlist name:');
    if (name) {
      const description = prompt('Enter playlist description (optional):');
      createPlaylist(name, description || '');
    }
  };

  return (
    <div className="fade-in">
      {/* Library Header */}
      <div className="page-header">
        <h1 className="page-title">📚 YOUR LIBRARY 📚</h1>
        <p className="page-subtitle">Your music, playlists, and more ✨</p>
      </div>

      {/* Create Playlist Button */}
      <div style={{ marginBottom: '32px' }}>
        <button 
          onClick={handleCreatePlaylist}
          style={{
            background: '#1db954',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '24px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = '#1ed760'}
          onMouseLeave={(e) => e.target.style.background = '#1db954'}
        >
          ➕ Create Playlist
        </button>
      </div>

      {/* Your Playlists */}
      <div className="section-header">
        <h2 className="section-title">📚 YOUR PLAYLISTS 📚</h2>
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

      {/* Liked Songs */}
      <div className="section-header">
        <h2 className="section-title">❤️ LIKED SONGS ❤️</h2>
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

      {/* Recently Played */}
      <div className="section-header">
        <h2 className="section-title">⏰ RECENTLY PLAYED ⏰</h2>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library; 