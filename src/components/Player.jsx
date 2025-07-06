import React, { useContext, useRef, useEffect } from 'react';
import { MusicContext } from '../context/MusicContext';

const Player = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isShuffled,
    isRepeated,
    queue,
    togglePlayPause,
    skipToNext,
    skipToPrevious,
    seekTo,
    setVolumeLevel,
    setIsShuffled,
    setIsRepeated
  } = useContext(MusicContext);

  const progressRef = useRef(null);
  const volumeRef = useRef(null);

  const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    if (!progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };

  const handleVolumeClick = (e) => {
    if (!volumeRef.current) return;
    
    const rect = volumeRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newVolume = Math.max(0, Math.min(1, percentage));
    setVolumeLevel(newVolume);
  };

  if (!currentTrack) {
    return (
      <div className="player" style={{ justifyContent: 'center', color: '#b3b3b3' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '16px', marginBottom: '4px' }}>🎧</div>
          <div style={{ fontSize: '12px' }}>No track selected</div>
        </div>
      </div>
    );
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const volumePercentage = volume * 100;

  return (
    <div className="player">
      {/* Left section - Track info */}
      <div className="player-left">
        <div className="track-image">
          🎵
        </div>
        <div className="track-info">
          <div className="track-title">{currentTrack.title}</div>
          <div className="track-artist">{currentTrack.artist}</div>
        </div>
      </div>

      {/* Center section - Player controls */}
      <div className="player-center">
        <div className="player-controls">
          <button 
            className="control-button"
            onClick={() => setIsShuffled(!isShuffled)}
            style={{ color: isShuffled ? '#1db954' : '#b3b3b3' }}
          >
            🔀
          </button>
          
          <button className="control-button" onClick={skipToPrevious}>
            ⏮️
          </button>
          
          <button className="play-pause-button" onClick={togglePlayPause}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <button className="control-button" onClick={skipToNext}>
            ⏭️
          </button>
          
          <button 
            className="control-button"
            onClick={() => setIsRepeated(!isRepeated)}
            style={{ color: isRepeated ? '#1db954' : '#b3b3b3' }}
          >
            🔁
          </button>
        </div>

        <div className="progress-container">
          <span className="time-display">{formatTime(currentTime)}</span>
          <div 
            ref={progressRef}
            className="progress-bar" 
            onClick={handleProgressClick}
          >
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="time-display">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right section - Volume and queue */}
      <div className="player-right">
        <div className="volume-control">
          <span className="volume-icon">🔊</span>
          <div 
            ref={volumeRef}
            className="volume-slider" 
            onClick={handleVolumeClick}
          >
            <div 
              className="volume-fill" 
              style={{ width: `${volumePercentage}%` }}
            />
          </div>
        </div>
        
        <div style={{ color: '#b3b3b3', fontSize: '12px' }}>
          📋 Queue ({queue.length})
        </div>
      </div>
    </div>
  );
};

export default Player;
