import React, { createContext, useState, useRef, useEffect } from 'react';

export const MusicContext = createContext();

// Sample data for the music app
const sampleTracks = [
  {
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    genre: 'Pop',
    cover: '🎵',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 2,
    title: 'Dance Monkey',
    artist: 'Tones and I',
    album: 'The Kids Are Coming',
    duration: 210,
    genre: 'Pop',
    cover: '🎵',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 3,
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: 235,
    genre: 'Pop',
    cover: '🎵',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 4,
    title: 'Uptown Funk',
    artist: 'Mark Ronson ft. Bruno Mars',
    album: 'Uptown Special',
    duration: 270,
    genre: 'Funk',
    cover: '🎵',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 5,
    title: 'Despacito',
    artist: 'Luis Fonsi ft. Daddy Yankee',
    album: 'Vida',
    duration: 229,
    genre: 'Latin',
    cover: '🎵',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  },
  {
    id: 6,
    title: 'Someone Like You',
    artist: 'Adele',
    album: '21',
    duration: 285,
    genre: 'Pop',
    cover: '🎵',
    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
  }
];

const samplePlaylists = [
  {
    id: 1,
    name: 'Today\'s Top Hits',
    description: 'The hottest tracks right now',
    cover: '🎵',
    tracks: [1, 2, 3]
  },
  {
    id: 2,
    name: 'Chill Vibes',
    description: 'Relaxing music for your day',
    cover: '🎵',
    tracks: [4, 5, 6]
  },
  {
    id: 3,
    name: 'Workout Mix',
    description: 'High energy tracks to keep you moving',
    cover: '🎵',
    tracks: [1, 4, 5]
  }
];

const sampleAlbums = [
  {
    id: 1,
    title: 'After Hours',
    artist: 'The Weeknd',
    cover: '🎵',
    tracks: [1],
    year: 2020
  },
  {
    id: 2,
    title: 'The Kids Are Coming',
    artist: 'Tones and I',
    cover: '🎵',
    tracks: [2],
    year: 2019
  },
  {
    id: 3,
    title: '÷ (Divide)',
    artist: 'Ed Sheeran',
    cover: '🎵',
    tracks: [3],
    year: 2017
  }
];

const sampleGenres = [
  { id: 1, name: 'Pop', color: '#1db954' },
  { id: 2, name: 'Rock', color: '#ff6b35' },
  { id: 3, name: 'Hip Hop', color: '#ffd23f' },
  { id: 4, name: 'Electronic', color: '#7209b7' },
  { id: 5, name: 'Jazz', color: '#f72585' },
  { id: 6, name: 'Classical', color: '#4cc9f0' }
];

export const MusicProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [queue, setQueue] = useState([]);
  const [playlists, setPlaylists] = useState(samplePlaylists);
  const [albums, setAlbums] = useState(sampleAlbums);
  const [genres, setGenres] = useState(sampleGenres);
  const [tracks, setTracks] = useState(sampleTracks);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const audioRef = useRef(null);

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (isRepeated) {
      // Repeat current track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (queue.length > 0) {
      // Play next track in queue
      const nextTrack = queue[0];
      setQueue(queue.slice(1));
      setCurrentTrack(nextTrack);
      setIsPlaying(true);
    } else {
      // Stop playing
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  // Playback controls
  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  const skipToNext = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setQueue(queue.slice(1));
      setCurrentTrack(nextTrack);
      setIsPlaying(true);
    }
  };

  const skipToPrevious = () => {
    // Implementation for previous track
    if (currentTime > 3) {
      // If more than 3 seconds into track, restart it
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else {
      // Go to previous track (would need to implement track history)
    }
  };

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolumeLevel = (level) => {
    setVolume(level);
    if (audioRef.current) {
      audioRef.current.volume = level;
    }
  };

  // Search functionality
  const searchTracks = (query) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    // Simulate search delay
    setTimeout(() => {
      const results = tracks.filter(track => 
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()) ||
        track.album.toLowerCase().includes(query.toLowerCase()) ||
        track.genre.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  // Playlist management
  const createPlaylist = (name, description) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      description,
      cover: '🎵',
      tracks: []
    };
    setPlaylists([...playlists, newPlaylist]);
    return newPlaylist;
  };

  const addTrackToPlaylist = (playlistId, trackId) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, tracks: [...playlist.tracks, trackId] }
        : playlist
    ));
  };

  const removeTrackFromPlaylist = (playlistId, trackId) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, tracks: playlist.tracks.filter(id => id !== trackId) }
        : playlist
    ));
  };

  // Queue management
  const addToQueue = (track) => {
    setQueue([...queue, track]);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  // Audio effects
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const contextValue = {
    // Current track state
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    volume,
    setVolume,
    
    // Playback controls
    isShuffled,
    setIsShuffled,
    isRepeated,
    setIsRepeated,
    playTrack,
    pauseTrack,
    togglePlayPause,
    skipToNext,
    skipToPrevious,
    seekTo,
    setVolumeLevel,
    
    // Queue management
    queue,
    setQueue,
    addToQueue,
    clearQueue,
    
    // Data
    tracks,
    setTracks,
    playlists,
    setPlaylists,
    albums,
    setAlbums,
    genres,
    setGenres,
    
    // Search
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    searchTracks,
    
    // Playlist management
    createPlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    
    // Audio ref
    audioRef
  };

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}
    </MusicContext.Provider>
  );
};