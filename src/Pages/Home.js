import { useEffect } from "react";

const Home = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return <div className="">Home</div>;
};

export default Home;
