import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Registration extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.clearForm = this.clearForm.bind(this);
	}
	state = {
		email: '',
		name: '',
		password1: '',
		password2: '',
		modalIsOpen: false,
		modalText: ''
	};
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	toggleModal() {
		this.setState({
			modalIsOpen: !this.state.modalIsOpen
		});
	}
	clearForm() {
		this.setState({
			email: '',
			name: '',
			password1: '',
			password2: ''
		});
	}
	onSubmit(e) {
		e.preventDefault();
		let { email, name, password1, password2 } = this.state;
		if (password1 === password2) {
			fetch(`/users/add`, {
				headers: {
					Accept: 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify({
					name,
					email,
					password1
				})
			})
				.then((response) => response.json())
				.then((json) => {
					this.setState({ modalIsOpen: true, modalText: json.text });
					this.clearForm();
				});
		}
	}
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
				<form onSubmit={this.onSubmit}>
					<div className="form-row">
						<div className="form-group col-md-6 col-sm-12">
							<label htmlFor="email">Email address</label>
							<input
								id="email"
								name="email"
								required
								type="email"
								placeholder="Enter email"
								onChange={this.handleChange}
								className="form-control"
								value={this.state.email}
							/>
							<small id="emailHelp" className="form-text text-muted">
								We'll never share your email with anyone else.
							</small>
						</div>
						<div className="form-group col-md-6 col-sm-12">
							<label htmlFor="name">Your name</label>
							<input
								id="name"
								name="name"
								required
								type="text"
								placeholder="Enter name"
								onChange={this.handleChange}
								className="form-control"
								value={this.state.name}
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6 col-sm-12">
							<label htmlFor="pass1">Password</label>
							<input
								id="pass1"
								name="password1"
								required
								type="password"
								placeholder="Enter password"
								onChange={this.handleChange}
								className="form-control"
								value={this.state.password1}
							/>
							<small id="passwordHelp" className="form-text text-muted">
								We'll never ask for your password.
							</small>
						</div>
						<div className="form-group col-md-6 col-sm-12">
							<label htmlFor="pass2">Repeat password</label>
							<input
								id="pass2"
								name="password2"
								required
								type="password"
								placeholder="Repeat password"
								onChange={this.handleChange}
								className="form-control"
								value={this.state.password2}
							/>
						</div>
					</div>

					<button className="btn btn-success" type="submit">
						Register
					</button>
				</form>
			</section>
		);
	}
}
export default Registration;
