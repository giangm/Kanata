import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <div className="hero min-h-screen">
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="text-5xl font-bold">404 Not Found</h1>
						<p className="py-6">
							The page you are trying to access does not exist.
						</p>
						<div>
							<Link to="/">
								<button className="btn btn-error mx-2 my-2">Go home</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
    </>
  )
}

export default NotFound
