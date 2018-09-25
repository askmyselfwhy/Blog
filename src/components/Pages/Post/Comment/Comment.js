import React from 'react';

const Comment = (props) => {
	let { name, comment, added, image, user_id } = props.data;
	let { user, editable } = props;
	let { toggleEdit, deleteComment } = props.actions;
	return (
		<article className="comment mt-2 p-2">
			<div className="main d-flex ">
				<div className="avatar">
					<img src={image} alt="user avatar" />
				</div>
				<h4 className="align-self-center pl-2">
					<i>{name}</i>
				</h4>
				{user.id &&
				user.id === user_id && (
					<div className="controls btn-group btn-group-toggle">
						<button className="btn btn-info" onClick={toggleEdit}>
							<i className="fas fa-edit" />
						</button>
						<button className="btn btn-danger" onClick={deleteComment}>
							<i className="fas fa-trash-alt" />
						</button>
					</div>
				)}
			</div>
			<div className="content p-2">
				{editable ? (
					<textarea name="" id="" rows="10" className="form-control" defaultValue={comment} />
				) : (
					<p>{comment}</p>
				)}
				<time>{added}</time>
				{user.id &&
				user.id !== user_id && (
					<div>
						<button className="btn btn-info">
							Reply <i className="fas fa-reply" />
						</button>
					</div>
				)}
			</div>
		</article>
	);
};
export default Comment;
