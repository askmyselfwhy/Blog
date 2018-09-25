import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import scrollToComponent from 'react-scroll-to-component';
import * as actions from '../actions/index.js';
class Nav extends Component {
	loggedConfig = [
		{ path: '/', title: 'home', options: { exact: true, iconClass: 'fas fa-home' } },
		{ path: '/blog/', title: 'blog', options: { iconClass: 'far fa-newspaper' } },
		{ path: '/profile', title: 'profile', options: { iconClass: 'fas fa-user-alt' } }
	];
	unloggedConfig = [
		{ path: '/', title: 'home', options: { exact: true, iconClass: 'fas fa-home' } },
		{ path: '/blog/', title: 'blog', options: { iconClass: 'far fa-newspaper' } },
		{ path: '/registration', title: 'registration', options: { iconClass: 'fas fa-user-edit' } },
		{ path: '/login', title: 'login', options: { iconClass: 'fas fa-sign-in-alt' } }
	];
	scrollToAnchor() {
		scrollToComponent(this.props.anchor, { offset: 0, align: 'top', duration: 500 });
	}
	render() {
		return (
			<div className="nav-holder">
				{this.props.user.id ? (
					<nav className="nav navbar flex-column justify-content-start">
						{this.loggedConfig.map((item) => (
							<NavLink
								key={item.path}
								className="nav-item nav-link d-flex"
								to={item.path}
								exact={item.options.exact}
								onClick={this.scrollToAnchor.bind(this)}
							>
								{item.title}
								{item.options.iconClass && (
									<i className={`${item.options.iconClass} d-inline-block ml-auto`} />
								)}
							</NavLink>
						))}
						{this.props.user.priviliges === 1 && (
							<NavLink
								key={'/admin'}
								className="nav-item nav-link d-flex"
								to={'/admin'}
								onClick={this.scrollToAnchor.bind(this)}
							>
								admin panel
								<i className={`fas fa-screwdriver d-inline-block ml-auto`} />
							</NavLink>
						)}
						<a
							href=""
							className="nav-item nav-link logout-btn d-flex"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								this.props.logout();
								this.props.history.push('/');
								this.props.saveToStorage();
							}}
						>
							Logout
							<i className="fas fa-sign-out-alt d-inline-block ml-auto" />
						</a>
					</nav>
				) : (
					<nav className="nav navbar flex-column justify-content-start">
						{this.unloggedConfig.map((item) => (
							<NavLink
								key={item.path}
								className="nav-item nav-link d-flex"
								to={item.path}
								exact={item.options.exact}
								onClick={this.scrollToAnchor.bind(this)}
							>
								{item.title}
								{item.options.iconClass && (
									<i className={`${item.options.iconClass} d-inline-block ml-auto`} />
								)}
							</NavLink>
						))}
					</nav>
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	user: state.user
});
const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators(actions, dispatch)
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
