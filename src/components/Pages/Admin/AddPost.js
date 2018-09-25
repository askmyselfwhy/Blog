import React, { Component } from 'react';

import $ from 'jquery';
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

function _randomInt(min, max) {
	let number = Math.random();
	return Math.round(min + number * (max - min));
}

class AddPost extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleModelChange = this.handleModelChange.bind(this);
	}
	state = {
		title: '',
		text: '',
		image: ''
	};
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleModelChange(model) {
		this.setState({
			text: model
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		let { title, pre_text, text, image } = this.state;
		text = text.trim();

		fetch('/posts/add', {
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				title,
				pre_text,
				text,
				image
			})
		}).then((response) => console.log(response));
	}
	render() {
		return (
			<form id="add_post_form" onSubmit={this.handleSubmit} className="d-flex flex-column">
				<div className="form-group">
					<label htmlFor="title">Post title</label>
					<input id="title" name="title" type="text" className="form-control" onChange={this.handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="pre-text">Post pre-text</label>
					<textarea
						id="pre-text"
						name="pre_text"
						type="text"
						className="form-control"
						onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="image">Post image</label>
					<input id="image" type="text" className="form-control" name="image" onChange={this.handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="text">Post text</label>
					<FroalaEditor
						config={{
							placeholder: 'Type here',
							heightMin: 400
						}}
						model={this.state.text}
						tag="textarea"
						onModelChange={this.handleModelChange}
					/>
				</div>
				<button className="btn btn-success" type="submit">
					Submit
				</button>
			</form>
		);
	}
}
export default AddPost;
