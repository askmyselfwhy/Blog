import React, { Component } from 'react';

export default class Header extends Component {
	render() {
		return (
			<header className="header">
				<nav className="nav navbar">
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarToggleExternalContent"
						aria-controls="navbarToggleExternalContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
						onClick={this.props.onClick}
					>
						<i className="fas fa-bars" />
					</button>
					<nav className="nav navbar">
						<a href="https://instagram.com" target="_blank" className="nav-item nav-link">
							<i className="fab fa-instagram fa-2x" />
						</a>
						<a href="https://vk.com" target="_blank" className="nav-item nav-link">
							<i className="fab fa-vk fa-2x" />
						</a>
						<a href="https://twitter.com" target="_blank" className="nav-item nav-link">
							<i className="fab fa-twitter fa-2x" />
						</a>
					</nav>
				</nav>
			</header>
		);
	}
}
