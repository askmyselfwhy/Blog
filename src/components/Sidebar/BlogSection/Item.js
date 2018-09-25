import React from 'react';
import tempImg from '../../../resources/images/placeholder.jpg';

import { Link } from 'react-router-dom';
const Item = (props) => {
	let { data } = props;
	console.log(props);
	return (
		<div className="row align-items-center text-left p-1">
			<div className="col-5 text-center">
				<img className="item-img" src={data.image ? data.image : tempImg} alt="TEMP IMAGE" />
			</div>
			<div className="col-7 flex-column content">
				<Link to={'/blog/post/' + data.id}>{data.title}</Link>
				<span className="date">date</span>
				<div className="stats">
					<span className="badge badge-light">
						<i className="fas fa-heart" />
						12
					</span>
					<span className="badge badge-light">
						<i className="fas fa-eye" />
						30
					</span>
				</div>
			</div>
		</div>
	);
};

export default Item;
