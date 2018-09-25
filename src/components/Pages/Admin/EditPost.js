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

class EditPost extends Component {
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
		let { title, text, image } = this.state;
		text = text.trim();
		console.log(text);

		// fetch('http://localhost:4000/posts/add_post', {
		// 	headers: {
		// 		Accept: 'application/json, text/plain, */*',
		// 		'Content-Type': 'application/json'
		// 	},
		// 	method: 'POST',
		// 	body: JSON.stringify({
		// 		id: _randomInt(50, 100),
		// 		title,
		// 		text
		// 	})
		// }).then((response) => console.log(response));
	}
	render() {
		return (
			<form id="add_post_form" onSubmit={this.handleSubmit} className="d-flex flex-column">
				<div className="form-group">
					<label htmlFor="title">Post title</label>
					<select name="title" type="text" className="form-control" onChange={this.handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="title">Post title</label>
					<input name="title" type="text" className="form-control" onChange={this.handleChange} />
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
				<div className="form-group">
					<label htmlFor="image">Post image</label>
					<input type="file" className="form-control-file" name="image" onChange={this.handleChange} />
				</div>
				<button className="btn btn-success" type="submit">
					Submit
				</button>
			</form>
		);
	}
}
export default EditPost;
