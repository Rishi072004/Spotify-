import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MusicContext } from '../context/MusicContext';

const Sidebar = () => {
  const { playlists, genres } = useContext(MusicContext);
  const location = useLocation();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        SPOTIFY 2.0
      </div>
      
      <nav className="sidebar-nav">
        <Link 
          to="/" 
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <i>🏠</i>
          Home
        </Link>
        
        <Link 
          to="/search" 
          className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}
        >
          <i>🔍</i>
          Search
        </Link>
        
        <Link 
          to="/library" 
          className={`nav-item ${location.pathname === '/library' ? 'active' : ''}`}
        >
          <i>📚</i>
          Your Library
        </Link>
        
        <Link 
          to="/albums" 
          className={`nav-item ${location.pathname === '/albums' ? 'active' : ''}`}
        >
          <i>💿</i>
          Albums
        </Link>
        
        <Link 
          to="/genres" 
          className={`nav-item ${location.pathname === '/genres' ? 'active' : ''}`}
        >
          <i>🎭</i>
          Genres
        </Link>
        
        <div style={{ marginTop: '32px', marginBottom: '16px' }}>
          <h3 style={{ color: '#b3b3b3', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Playlists
          </h3>
        </div>
        
        {playlists.map(playlist => (
          <Link 
            key={playlist.id}
            to={`/playlist/${playlist.id}`} 
            className={`nav-item ${location.pathname === `/playlist/${playlist.id}` ? 'active' : ''}`}
          >
            <i>🎵</i>
            {playlist.name}
          </Link>
        ))}
        
        <div style={{ marginTop: '32px', marginBottom: '16px' }}>
          <h3 style={{ color: '#b3b3b3', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Genres
          </h3>
        </div>
        
        {genres.slice(0, 6).map(genre => (
          <Link 
            key={genre.id}
            to={`/genre/${genre.id}`} 
            className={`nav-item ${location.pathname === `/genre/${genre.id}` ? 'active' : ''}`}
            style={{ 
              borderLeft: `3px solid ${genre.color}`,
              paddingLeft: '13px'
            }}
          >
            <i>🎵</i>
            {genre.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;