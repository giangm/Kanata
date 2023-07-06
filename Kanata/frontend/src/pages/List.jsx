import React, { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

import Navbar from '@/components/Navbar'
import Table from '@/components/list/Table'
import Footer from '@/components/Footer'

const List = () => {
	const particlesInit = useCallback((engine) => {
		loadSlim(engine)
	}, [])

	return (
		<>
			{/* <Particles options={ParticleConfig} init={particlesInit} /> */}
			<Navbar />
			<Table />
			<Footer />
		</>
	)
}

export default List
