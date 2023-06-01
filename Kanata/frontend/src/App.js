import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChallengeList from './components/ChallengeList';

import './App.css';


function App() {
  
  // const [l]
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<ChallengeList />} />
          {/* <Route path="/challenge/:id" element={} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
