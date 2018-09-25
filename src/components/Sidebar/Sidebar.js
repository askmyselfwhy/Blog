import React from 'react';
import Blog from './BlogSection/Blog';
const Sidebar = (props) => {
	return (
		<section className="sidebar">
			<Blog />
			<section className="author text-center shadow-sm">
				<h4>About author</h4>
				<div className="avatar p-2">
					<img className="item-img" src="https://picsum.photos/300/300" />
				</div>
				<div className="content p-2">
					<h4>Roman Yefimov</h4>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem delectus modi provident sequi
						doloribus nesciunt facere nobis cupiditate adipisci, quos itaque eaque quae laudantium officiis
						totam reiciendis facilis ut necessitatibus?
					</p>
				</div>
			</section>
			<section className="socials text-center shadow-sm">
				<header>Socials</header>
				<nav className="nav navbar">
					<a href="https://instagram.com" target="_blank" className="nav-item nav-link">
						<i className="fab fa-instagram fa-3x" />
					</a>
					<a href="https://vk.com" target="_blank" className="nav-item nav-link">
						<i className="fab fa-vk fa-3x" />
					</a>
					<a href="https://twitter.com" target="_blank" className="nav-item nav-link">
						<i className="fab fa-twitter fa-3x" />
					</a>
				</nav>
			</section>
		</section>
	);
};

export default Sidebar;
