import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Albums from './pages/Albums';
import Genres from './pages/Genres';
import Player from './components/Player';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { MusicProvider } from './context/MusicContext';
import './App.css';

const App = () => {
  return (
    <MusicProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="main-content">
            <Topbar />
            <div className="content-area">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/genres" element={<Genres />} />
              </Routes>
            </div>
            <Player />
          </div>
        </div>
      </Router>
    </MusicProvider>
  );
};

export default App;
