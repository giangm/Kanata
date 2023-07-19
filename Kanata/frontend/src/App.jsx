import React, { useCallback, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

import { ThemeProvider } from '@mui/material/styles'

import Landing from '@/pages/Landing'
import List from '@/pages/List'
import Challenge from '@/pages/Challenge'
import NotFound from '@/pages/NotFound'

import Theme from '@/configs/MuiTheme'
import { ParticlesConfig } from '@/configs/ParticleConfig'

const App = () => {
  const [renderParticles, setParticles] = useState(false)

  const particlesInit = useCallback((engine) => {
    loadSlim(engine)
  }, [])

  const location = useLocation();

  React.useEffect(() => {
    setParticles(location.pathname !== "/" && location.pathname !== "/404")
  }, [location]);

  return (
    <>
      <ThemeProvider theme={Theme}>
          {renderParticles && <Particles options={ParticlesConfig} init={particlesInit} />}
          <Routes location={location} key={location.pathname}>
            <Route exact path="/" element={<Landing />} />
            <Route path="/challenges" element={<List />} />
            <Route path="/challenge/:name" element={<Challenge />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/*" element={<Navigate to="/404" />} />
          </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
