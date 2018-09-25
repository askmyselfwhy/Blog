import React, { Component } from 'react';
import Item from './Item';
const numberOfPosts = 3;
class Blog extends Component {
	state = {
		posts_new: [],
		posts_popular: []
	};
	componentDidMount() {
		fetch(`/posts/new/${numberOfPosts}`, {
			method: 'get'
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					posts_new: json.data
				});
			});
	}
	render() {
		let { posts_new, posts_popular } = this.state;
		console.log(posts_new);
		return (
			<section className="blogs shadow-sm">
				<nav className="nav justify-content-center p-2" id="nav-tab" role="tablist">
					<a
						className="nav-item nav-link active"
						id="nav-home-tab"
						data-toggle="tab"
						href="#nav-home"
						role="tab"
						aria-controls="nav-home"
						aria-selected="true"
					>
						new
					</a>
					<a
						className="nav-item nav-link"
						id="nav-profile-tab"
						data-toggle="tab"
						href="#nav-profile"
						role="tab"
						aria-controls="nav-profile"
						aria-selected="false"
					>
						popular
					</a>
				</nav>
				<div className="tab-content" id="nav-tabContent">
					<div
						className="tab-pane fade show active"
						id="nav-home"
						role="tabpanel"
						aria-labelledby="nav-new-tab"
					>
						{posts_new.map((item, index) => <Item data={item} key={index} />)}
					</div>
					<div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-popular-tab">
						{/* {Array.apply(null, Array(2)).map((item, index) => <Item id={index} key={index} />)} */}
					</div>
				</div>
			</section>
		);
	}
}

export default Blog;
