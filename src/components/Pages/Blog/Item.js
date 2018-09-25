import React, { Component } from 'react';
import tempImg from '../../../resources/images/placeholder.jpg';
import { Link } from 'react-router-dom';
import Sharer from 'sharer.npm.js';

class Item extends Component {
	handleClick(e) {
		const sharer = new Sharer(e.currentTarget);
		sharer.share();
	}
	render() {
		let { id, title, pre_text, text, added, image } = this.props.data;
		return (
			<article className="shadow-sm item p-2 text-left">
				<div className="p-2">
					<div className="item-img-link">
						<div className="item-img-container">
							<img className="item-img" src={image ? image : tempImg} alt="blog-post image" />
						</div>
						<div className="item-img-link__content">
							<div className="hidden">
								<nav className="nav navbar">
									<button
										onClick={this.handleClick}
										data-sharer="googleplus"
										className="nav-item nav-link mr-1"
										data-title={`Checkout post '${title}'`}
										data-url={`http://localhost:3000/blog/post/${id}`}
									>
										<i className="fab fa-google-plus-g" />
									</button>
									<button
										onClick={this.handleClick}
										data-sharer="vk"
										className="nav-item nav-link mr-1"
										data-title={`Checkout post '${title}'`}
										data-url={`http://localhost:3000/blog/post/${id}`}
									>
										<i className="fab fa-vk" />
									</button>
									<button
										onClick={this.handleClick}
										data-sharer="twitter"
										className="nav-item nav-link mr-1"
										data-title={`Checkout post '${title}'`}
										data-url={`http://localhost:3000/blog/post/${id}`}
									>
										<i className="fab fa-twitter" />
									</button>
								</nav>
							</div>
						</div>
						<div className="overlay" />
					</div>
					<div className="item-body p-2">
						<h4 className="item-header">
							<b>{title}</b>
						</h4>
						<time>{added}</time>
						<div className="text-right">
							<Link className="btn item-btn" to={'/blog/post/' + id}>
								Read full
							</Link>
						</div>
					</div>
				</div>
			</article>
		);
	}
}

export default Item;
