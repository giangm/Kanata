import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChallengeList from './pages/ChallengeList';
import Challenge from './pages/Challenge';
import Theme from './theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import Particles from 'react-tsparticles';
import { particlesConfig } from './particles-config';
import { loadSlim } from 'tsparticles-slim'
import SideHeader from './components/SideHeader';


function App() {
  const particlesInit = useCallback((engine) => {
    loadSlim(engine)
  }, []);

  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <div className="App">
          <Particles options={particlesConfig} init={particlesInit}/>
          {/* <SideHeader/> */}
          <Routes>
            <Route path="/" exact element={<ChallengeList />} />
            <Route path="/challenge/:id" element={<Challenge />} />
          </Routes>
        </div>
      </ThemeProvider>

    </Router>
  );
}

export default App;
