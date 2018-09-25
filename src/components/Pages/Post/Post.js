import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentContainer from './Comment/CommentContainer';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { Redirect } from 'react-router-dom';
class Post extends Component {
	state = {
		post: {},
		comments: [],
		comment: '',
		image: ''
	};
	componentDidMount() {
		fetch('/posts/' + this.props.match.params.id)
			.then((response) => response.json())
			.then(({ data }) => this.setState({ post: data[0] }));
		this.getComments();
		if (this.props.user) {
			fetch(`/users/${this.props.user.id}`, {
				method: 'GET'
			})
				.then((response) => response.json())
				.then((json) => {
					this.setState({
						image: json.image
					});
				});
		}
	}
	getComments = () => {
		fetch('/comments/' + this.props.match.params.id)
			.then((response) => response.json())
			.then(({ data }) => this.setState({ comments: data }));
	};
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	onSubmit = (e) => {
		e.preventDefault();
		let { comment } = this.state;
		let obj = {
			post_id: this.props.match.params.id,
			user_id: this.props.user.id,
			comment: comment
		};
		fetch(`/comments/`, {
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(obj)
		}).then((response) => this.getComments());
	};
	onDeleteComment = () => {
		this.forceUpdate(() => this.getComments());
	};
	render() {
		console.log(this.props);
		let { post, comments, image } = this.state;
		let { user } = this.props;
		return (
			<div>
				{post ? (
					<div className="shadow-sm post p-4">
						<h1 className="post__header">{post.title}</h1>
						<FroalaEditorView model={post.text} />
						<div className="comments mt-2">
							<h3>Comments</h3>
							<div className="comments-container d-flex flex-column">
								{comments.map((item) => (
									<CommentContainer
										onDeleteCallback={this.onDeleteComment}
										key={item.comment_id}
										data={{ ...item }}
									/>
								))}
							</div>
							{user.id ? (
								<div className="comment-form">
									<div className="info">
										<div className="avatar">
											<img src={image} />
										</div>
										<h2>{user.name}</h2>
									</div>
									<div>
										<form onSubmit={this.onSubmit}>
											<textarea
												name="comment"
												id="comment"
												cols="30"
												rows="5"
												className="form-control"
												onChange={this.handleChange}
											>
												Leave a comment here
											</textarea>
											<button type="submit" className="btn btn-success">
												Send
											</button>
										</form>
									</div>
								</div>
							) : (
								<div>You must be signed in to leave a comment</div>
							)}
						</div>
					</div>
				) : (
					<Redirect to="/" />
				)}
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	user: state.user
});
export default connect(mapStateToProps, null)(Post);
