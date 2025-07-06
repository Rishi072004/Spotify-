import React, { useContext, useState } from 'react';
import { MusicContext } from '../context/MusicContext';

const Albums = () => {
  const { albums, tracks, currentTrack, isPlaying, playTrack } = useContext(MusicContext);
  const [sortBy, setSortBy] = useState('title');
  const [filterBy, setFilterBy] = useState('all');

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

  // Get tracks for each album
  const albumsWithTracks = albums.map(album => {
    const albumTracks = tracks.filter(track => 
      track.album === album.title && track.artist === album.artist
    );
    const totalDuration = albumTracks.reduce((sum, track) => sum + track.duration, 0);
    
    return {
      ...album,
      tracks: albumTracks,
      totalDuration,
      trackCount: albumTracks.length
    };
  });

  // Filter albums
  const filteredAlbums = albumsWithTracks.filter(album => {
    if (filterBy === 'all') return true;
    if (filterBy === 'recent') return album.year >= 2020;
    if (filterBy === 'classic') return album.year < 2020;
    return true;
  });

  // Sort albums
  const sortedAlbums = [...filteredAlbums].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'artist':
        return a.artist.localeCompare(b.artist);
      case 'year':
        return b.year - a.year;
      case 'tracks':
        return b.trackCount - a.trackCount;
      default:
        return 0;
    }
  });

  return (
    <div className="fade-in">
      {/* Albums Header */}
      <div className="page-header">
        <h1 className="page-title">💿 ALBUMS 💿</h1>
        <p className="page-subtitle">Discover and explore albums 🎵</p>
      </div>

      {/* Filters and Sort */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
        <select 
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          style={{
            background: '#242424',
            border: '1px solid #535353',
            color: '#ffffff',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        >
          <option value="all">📚 All Albums</option>
          <option value="recent">🆕 Recent (2020+)</option>
          <option value="classic">🏛️ Classic (Pre-2020)</option>
        </select>

        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            background: '#242424',
            border: '1px solid #535353',
            color: '#ffffff',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        >
          <option value="title">📝 Sort by Title</option>
          <option value="artist">👤 Sort by Artist</option>
          <option value="year">📅 Sort by Year</option>
          <option value="tracks">🎵 Sort by Track Count</option>
        </select>
      </div>

      {/* Albums Grid */}
      <div className="grid-container grid-4">
        {sortedAlbums.map(album => (
          <div key={album.id} className="card">
            <div className="card-image">
              🎵
              <button 
                className="play-button"
                onClick={() => album.tracks.length > 0 && handlePlayTrack(album.tracks[0])}
              >
                {album.tracks.length > 0 && currentTrack?.id === album.tracks[0].id && isPlaying ? '⏸️' : '▶️'}
              </button>
            </div>
            <div className="card-title">{album.title}</div>
            <div className="card-subtitle">{album.artist}</div>
            <div className="card-description">
              {album.year} • {album.trackCount} tracks • {formatTime(album.totalDuration)}
            </div>
            
            {/* Album tracks preview */}
            {album.tracks.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#b3b3b3', 
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  🎵 Tracks:
                </div>
                {album.tracks.slice(0, 3).map((track, index) => (
                  <div 
                    key={track.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '4px 0',
                      fontSize: '12px',
                      color: '#b3b3b3',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                    onMouseLeave={(e) => e.target.style.color = '#b3b3b3'}
                    onClick={() => handlePlayTrack(track)}
                  >
                    <span>{index + 1}. {track.title}</span>
                    <span>{formatTime(track.duration)}</span>
                  </div>
                ))}
                {album.tracks.length > 3 && (
                  <div style={{ 
                    fontSize: '11px', 
                    color: '#6b6b6b',
                    fontStyle: 'italic',
                    marginTop: '4px'
                  }}>
                    ➕ {album.tracks.length - 3} more tracks
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedAlbums.length === 0 && (
        <div className="empty-state">
          <div>💿</div>
          <h3>No albums found</h3>
          <p>Try adjusting your filters or search for something else</p>
        </div>
      )}
    </div>
  );
};

export default Albums; 