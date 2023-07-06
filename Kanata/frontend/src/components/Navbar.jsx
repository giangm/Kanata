import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
	const names = window.location.pathname.split('/');

	return (
		<>
			<div className="navbar">
				<div className="flex-1">
					<p className="btn btn-ghost normal-case text-xl">
						Kanata | <span className="capitalize">{names[names.length - 1]}</span>
					</p>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1">
						{names[1] === "challenge" ? <li><Link to="/emulate" className="btn-ghost text-info">Emulate</Link></li> : <li></li>}
						<li><Link to="/" className="btn-ghost">Go home</Link></li>
					</ul>
				</div>
			</div>
		</>
	)
}

export default Navbar
