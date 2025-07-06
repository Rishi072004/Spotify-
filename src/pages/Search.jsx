import React, { useContext, useEffect } from 'react';
import { MusicContext } from '../context/MusicContext';

const Search = () => {
  const { 
    searchQuery, 
    searchResults, 
    isSearching, 
    tracks, 
    albums, 
    genres,
    playTrack,
    currentTrack,
    isPlaying,
    addToQueue
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

  // Filter data based on search query
  const filteredTracks = searchQuery 
    ? tracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tracks;

  const filteredAlbums = searchQuery
    ? albums.filter(album =>
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : albums;

  const filteredGenres = searchQuery
    ? genres.filter(genre =>
        genre.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : genres;

  if (isSearching) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span style={{ marginLeft: '16px' }}>🔍 Searching...</span>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Search Header */}
      <div className="page-header">
        <h1 className="page-title">🔍 SEARCH</h1>
        <p className="page-subtitle">
          {searchQuery 
            ? `Results for "${searchQuery}"` 
            : 'Search for your favorite music 🎵'
          }
        </p>
      </div>

      {searchQuery ? (
        <div className="search-results">
          {/* Tracks Results */}
          {filteredTracks.length > 0 && (
            <div className="result-section">
              <h3>🎵 Tracks ({filteredTracks.length})</h3>
              <div className="grid-container grid-4">
                {filteredTracks.map(track => (
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
          )}

          {/* Albums Results */}
          {filteredAlbums.length > 0 && (
            <div className="result-section">
              <h3>💿 Albums ({filteredAlbums.length})</h3>
              <div className="grid-container grid-4">
                {filteredAlbums.map(album => (
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
            </div>
          )}

          {/* Genres Results */}
          {filteredGenres.length > 0 && (
            <div className="result-section">
              <h3>🎭 Genres ({filteredGenres.length})</h3>
              <div className="grid-container grid-5">
                {filteredGenres.map(genre => (
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
            </div>
          )}

          {/* No Results */}
          {filteredTracks.length === 0 && filteredAlbums.length === 0 && filteredGenres.length === 0 && (
            <div className="empty-state">
              <div>🔍</div>
              <h3>No results found</h3>
              <p>Try searching for something else or browse our featured content</p>
            </div>
          )}
        </div>
      ) : (
        /* Browse Categories when no search query */
        <div>
          <div className="section-header">
            <h2 className="section-title">🎭 BROWSE CATEGORIES 🎭</h2>
          </div>
          
          <div className="grid-container grid-4">
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

          <div className="section-header">
            <h2 className="section-title">🔥 POPULAR TRACKS 🔥</h2>
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
      )}
    </div>
  );
};

export default Search;