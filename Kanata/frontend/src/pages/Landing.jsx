import React from 'react'
import { Link } from 'react-router-dom'

import { TypeAnimation } from 'react-type-animation';

const Landing = () => {
	return (
		<>
			<div className="hero min-h-screen">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<TypeAnimation
							sequence={[
								'Hello, World!',
								1000
							]}
							speed={50}
							className="text-5xl font-bold"
						/>
						<p className="py-6">
							Welcome to <span className="font-bold text-secondary">Kanata</span>,
							a training platform for <span className="text-info">white-box</span> testing.
						</p>
						<div>
							<Link to="/challenges">
								<button className="btn btn-primary mx-2 my-2">Challenge Lists</button>
							</Link>
							<Link to="https://github.com/giangm/Kanata/tree/main" className="btn btn-ghost mx-2 my-2">
								Learn more &rarr;
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Landing
