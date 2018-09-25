import React, { Component } from 'react';
import Item from './Item';
import { Redirect, Link } from 'react-router-dom';

class Blog extends Component {
	constructor(props) {
		super(props);
		let page = props.match.params.page ? props.match.params.page : 1;
		this.state = {
			posts: [],
			postsNumber: 0,
			page: page,
			loading: true
		};
	}
	componentDidMount() {
		fetch('/posts/count', {
			method: 'get'
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				return this.setState({ postsNumber: data.count });
			})
			.then(() => {
				this.getPosts((this.state.page - 1) * 6, 6);
			});
	}
	getPosts(start, end) {
		this.setState({ loading: true });
		fetch(`/posts/${start}/${end}`)
			.then((response) => response.json())
			.then(({ data }) => this.setState({ posts: data, loading: false }));
	}
	render() {
		let { posts, postsNumber, page, loading } = this.state;
		let pages = Math.ceil(postsNumber / 6);
		return (
			<section>
				{loading ? (
					<div className="p-4 bg-white text-center">LOADING...</div>
				) : (
					<div>
						<div id="feed" className="feed grid-feed p-0">
							{posts.length === 0 ? (
								<Redirect to="/" />
							) : (
								posts.map((post, index) => <Item key={post.id} data={post} />)
							)}
						</div>
						<nav className="mt-2 d-flex justify-content-center" aria-label="Page navigation">
							<ul className="pagination">
								{Array.apply(null, Array(pages)).map((item, index) => (
									<li key={index} className={`page-item ${page - 1 === index ? 'active' : ''}`}>
										<Link
											className="page-link"
											to={'/blog/' + (index + 1)}
											onClick={(e) => {
												this.setState({ page: index + 1 });
												this.getPosts(index * 6, 6);
											}}
										>
											{index + 1}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>
				)}
			</section>
		);
	}
}

export default Blog;
