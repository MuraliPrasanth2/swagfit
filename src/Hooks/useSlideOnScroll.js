import { useEffect } from "react";

const useSlideInOnScroll = () => {
	useEffect(() => {
		const elements = document.querySelectorAll(".slideIn");
		const observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: 0.1,
		};

		const observerCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("animate-slideIn");
					observer.unobserve(entry.target);
				}
			});
		};

		const observer = new IntersectionObserver(
			observerCallback,
			observerOptions,
		);

		elements.forEach((element) => {
			observer.observe(element);
		});

		return () => {
			elements.forEach((element) => {
				observer.unobserve(element);
			});
		};
	}, []);
};

export default useSlideInOnScroll;
