import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';

class CommentContainer extends Component {
	state = {
		isEdit: false,
		commentText: ''
	};
	toggleEdit = () => {
		this.setState(function(prevState, props) {
			return { isEdit: !prevState.isEdit };
		});
	};

	deleteComment = () => {
		fetch(`/comments/${this.props.data.comment_id}`, {
			method: 'delete'
		}).then((response) => this.props.onDeleteCallback());
	};
	render() {
		return (
			<Comment
				data={this.props.data}
				user={this.props}
				editable={this.state.isEdit}
				actions={{
					deleteComment: this.deleteComment,
					toggleEdit: this.toggleEdit
				}}
			/>
		);
	}
}
const mapStateToProps = (state) => ({
	user: state.user
});
export default connect(mapStateToProps, null)(CommentContainer);
