import { Link } from "react-router";

const Header = () => {
	return (
		<header className="top-nav">
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
		</header>
	);
};

export default Header;
