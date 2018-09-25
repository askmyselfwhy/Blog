import React, { Component } from 'react';
import { connect } from 'react-redux';
class Profile extends Component {
	state = {
		isEdit: false,
		userData: {},
		about: '',
		password1: '',
		password2: '',
		image: ''
	};
	toggleEdit = () => {
		this.setState((prevState, props) => {
			return {
				isEdit: !prevState.isEdit
			};
		});
	};
	componentDidMount() {
		this.setState({
			password1: this.props.user.password,
			password2: this.props.user.password
		});
	}
	getUserData = () => {
		if (this.props.user) {
			fetch(`/users/${this.props.user.id}`, {
				method: 'GET'
			})
				.then((response) => response.json())
				.then((json) => {
					this.setState({
						userData: {
							...json
						},
						about: json.about,
						image: json.image
					});
				});
		}
	};
	componentWillMount() {
		this.getUserData();
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	onSubmit = (e) => {
		e.preventDefault();
		let { userData, about, image, password1, password2 } = this.state;
		if (password1 === password2) {
			fetch(`/users/${userData.id}`, {
				headers: {
					Accept: 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
				method: 'PATCH',
				body: JSON.stringify({
					about,
					image,
					password1
				})
			}).then(() => {
				this.props.change({ password: password1 });
				this.toggleEdit();
				this.getUserData();
			});
		}
	};
	render() {
		let { userData, isEdit, about, image, password1, password2 } = this.state;
		return (
			<section className="sub-section bg-white shadow-sm shadow-sm p-4">
				{userData && isEdit ? (
					<div className="profile text-center">
						<div className="user-avatar">
							<img src={userData.image} />
						</div>
						<h1>{userData.name}</h1>
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label htmlFor="info">Enter information about you</label>
								<textarea
									name="about"
									id="info"
									className="form-control"
									placeholder="Information about user"
									onChange={this.handleChange}
									value={about}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="image">Change image</label>
								<input
									name="image"
									type="text"
									id="image"
									className="form-control"
									onChange={this.handleChange}
									value={image}
								/>
							</div>
							<div className="form-row">
								<div className="form-group col-md-6 col-sm-12">
									<label htmlFor="pass1">Password</label>
									<input
										id="pass1"
										name="password1"
										type="password"
										placeholder="Enter password"
										onChange={this.handleChange}
										className="form-control"
										value={password1}
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
										type="password"
										placeholder="Repeat password"
										onChange={this.handleChange}
										className="form-control"
										value={password2}
									/>
								</div>
							</div>
							<button type="submit" className="btn btn-success">
								Accept
							</button>
						</form>
					</div>
				) : (
					<div className="profile text-center">
						<div className="user-avatar">
							<img src={userData.image} />
						</div>
						<h1>{userData.name}</h1>
						<p>{userData.about}</p>
						<button className="btn btn-success" onClick={this.toggleEdit}>
							Edit
						</button>
					</div>
				)}
			</section>
		);
	}
}
const mapStateToProps = (state) => ({
	user: state.user
});
const mapDispatchToProps = (dispatch) => ({
	change: (obj) =>
		dispatch({
			type: 'CHANGE',
			payload: { ...obj }
		})
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
