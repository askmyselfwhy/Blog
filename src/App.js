import React, { Component } from 'react';
import Nav from './components/Nav';
import Main from './components/Main';
import Header from './components/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from 'react-offcanvas';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
	componentWillMount() {
		// sets the initial state
		this.setState({
			isMenuOpened: false
		});
	}
	handleClick() {
		this.setState({ isMenuOpened: !this.state.isMenuOpened });
	}
	render() {
		console.log(this.props.location);
		return (
			<OffCanvas
				className="App"
				transitionDuration={300}
				isMenuOpened={this.state.isMenuOpened}
				position={'left'}
			>
				<OffCanvasMenu className="app-nav">
					<Nav anchor={this.ElementToScroll} />
				</OffCanvasMenu>
				<OffCanvasBody className="App">
					<Header
						onClick={this.handleClick.bind(this)}
						ref={(element) => {
							this.ElementToScroll = element;
						}}
					/>
					<main className="grid p-2">
						<section className="main relative">
							<Main />
						</section>
						<Sidebar />
					</main>
				</OffCanvasBody>
			</OffCanvas>
		);
	}
}

export default withRouter(connect(null, null)(App));
