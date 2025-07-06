import React, { useContext, useState } from 'react';
import { MusicContext } from '../context/MusicContext';

const Topbar = () => {
  const { searchQuery, setSearchQuery, searchTracks } = useContext(MusicContext);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      searchTracks(query);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchTracks(searchQuery);
    }
  };

  return (
    <div className="topbar">
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for songs, artists, albums..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <div className="search-icon">
            🔍
          </div>
        </form>
      </div>
      
      <div className="user-menu">
        <button 
          style={{
            background: 'none',
            border: 'none',
            color: '#b3b3b3',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#ffffff'}
          onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
        >
          ⚙️
        </button>
        
        <div className="user-avatar">
          👤
        </div>
      </div>
    </div>
  );
};

export default Topbar;
