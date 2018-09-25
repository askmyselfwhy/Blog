import React from 'react';
import { BrowserRouter, Router, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Blog from './Pages/Blog/Blog';
import Post from './Pages/Post/Post';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Admin from './Pages/Admin';
import Profile from './Pages/Profile';
import ErrorPage from './Pages/ErrorPage';
import Home from './Pages/Home';

const Main = withRouter(({ location }) => {
	return (
		<TransitionGroup component={null}>
			<CSSTransition key={location.pathname} classNames="fade" timeout={300}>
				<Switch location={location}>
					<Route exact path="/" component={Home} />
					<Route path="/blog">
						<Switch>
							<Route exact path="/blog" render={({ match }) => <Redirect to="/blog/1" />} />
							<Route exact path="/blog/:page" component={Blog} />
							<Route exact path="/blog/post/:id" component={Post} />
						</Switch>
					</Route>
					<Route path="/login" component={Login} />
					<Route path="/registration" component={Registration} />
					<Route path="/profile" component={Profile} />
					<Route path="/admin" component={Admin} />
					<Route component={ErrorPage} />
				</Switch>
			</CSSTransition>
		</TransitionGroup>
	);
});
export default Main;
