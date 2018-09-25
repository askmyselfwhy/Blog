import React, { Component } from 'react';
import AddPost from './AddPost';
import EditPost from './EditPost';
import Tables from './Tables';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Admin extends Component {
	state = {};
	render() {
		return (
			<section className="sub-section bg-white shadow-sm">
				{this.props.user.id && this.props.user.priviliges === 1 ? (
					<div className="admin p-2">
						<ul className="nav flex-column ">
							<li className="nav-item">
								<a
									className="nav-link active"
									id="add-tab"
									data-toggle="tab"
									href="#add_post"
									role="tab"
									aria-controls="home"
									aria-selected="true"
								>
									Add post
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link"
									id="edit-tab"
									data-toggle="tab"
									href="#edit_post"
									role="tab"
									aria-controls="profile"
									aria-selected="false"
								>
									Edit post
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link"
									id="tables-tab"
									data-toggle="tab"
									href="#tables"
									role="tab"
									aria-controls="home"
									aria-selected="true"
								>
									Review tables
								</a>
							</li>
						</ul>
						<div className="tab-content p-4" id="myTabContent">
							<div
								className="tab-pane fade show active"
								id="add_post"
								role="tabpanel"
								aria-labelledby="add_post-tab"
							>
								<AddPost />
							</div>
							<div
								className="tab-pane fade"
								id="edit_post"
								role="tabpanel"
								aria-labelledby="edit_post-tab"
							>
								<EditPost />
							</div>
							<div className="tab-pane fade" id="tables" role="tabpanel" aria-labelledby="edit_post-tab">
								<Tables />
							</div>
						</div>
					</div>
				) : (
					<Redirect to="/" />
				)}
			</section>
		);
	}
}
const mapStateToProps = (state) => ({
	user: state.user
});
export default connect(mapStateToProps, null)(Admin);
