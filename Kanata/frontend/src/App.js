import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChallengeList from './pages/ChallengeList';
import Challenge from './pages/Challenge';
import Theme from './theme/Theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';


function App() {

  // const [l]

  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <div className="App">
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
