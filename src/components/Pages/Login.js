import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { saveToStorage, login } from '../../actions/index.js';

class Login extends Component {
	state = {
		email: '',
		password: '',
		modalIsOpen: false,
		modalText: ''
	};
	toggleModal = () => {
		this.setState({
			modalIsOpen: !this.state.modalIsOpen
		});
	};
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	onSubmit = (e) => {
		e.preventDefault();
		let { email, password } = this.state;
		fetch(`/login`, {
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			})
		})
			.then((response) => response.json())
			.then((res) => {
				if (res.status === 404) {
					this.setState({
						modalIsOpen: true,
						modalText: res.text
					});
				} else {
					this.props.login({ ...res.data });
					this.props.saveToStorage();
					this.props.history.push('/profile');
				}
			});
	};
	render() {
		return (
			<section className="sub-section bg-white shadow-sm p-4 d-flex justify-content-center">
				<Modal
					isOpen={this.state.modalIsOpen}
					toggle={this.toggleModal}
					className={this.props.className}
					backdrop={'static'}
				>
					<ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
					<ModalBody>{this.state.modalText}</ModalBody>
					<ModalFooter>
						<Button color="success" onClick={this.toggleModal}>
							Okay
						</Button>{' '}
					</ModalFooter>
				</Modal>
				<form action="" className="d-flex flex-column">
					<div className="input-group mb-2 mr-sm-2">
						<input
							required
							name="email"
							type="email"
							placeholder="Email"
							className="form-control"
							onChange={this.handleChange}
						/>
						<div className="input-group-append">
							<div className="input-group-text">
								<i className="fas fa-at" />
							</div>
						</div>
					</div>
					<div className="input-group mb-2 mr-sm-2">
						<input
							required
							name="password"
							type="password"
							placeholder="Password"
							className="form-control"
							onChange={this.handleChange}
						/>
						<div className="input-group-append">
							<div className="input-group-text">
								<i className="fas fa-key" />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="custom-control custom-checkbox my-0">
							<input type="checkbox" className="custom-control-input" id="customControlInline" />
							<label className="custom-control-label" htmlFor="customControlInline">
								Remember my password
							</label>
						</div>
					</div>
					<button type="submit" className="btn btn-success" onClick={this.onSubmit}>
						Login
					</button>
				</form>
			</section>
		);
	}
}
const mapStateToProps = (state) => ({
	user: state.user
});
const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators({ saveToStorage, login }, dispatch)
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
