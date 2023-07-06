import React from 'react'

const Footer = () => {
	return (
		<>
			<footer className="footer footer-center p-4 text-base-content">
				<div>
					<p>Copyright {String.fromCodePoint(0x00A9)} {(new Date().getFullYear())} - All right reserved by Kanata</p>
				</div>
			</footer>
		</>
	)
}

export default Footer
