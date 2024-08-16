import React, { useState, useRef } from "react";

const FAQAccordion = () => {
	const [activeIndex, setActiveIndex] = useState(null);
	const contentRefs = useRef([]);

	const toggleAccordion = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	const getContentHeight = (index) => {
		return contentRefs.current[index]?.scrollHeight + "px";
	};

	const accordionData = [
		{
			question: "What equipment do I need?",
			answer:
				"To get started, you'll need a pair of dumbbells and a reliable internet connection. These basic items will allow you to participate fully in our workouts.",
		},
		{
			question: "Do I need prior experience with CrossFit?",
			answer:
				"No prior experience is necessary. Our program caters to all fitness levels, from beginners to advanced athletes. Our instructors will provide modifications and guidance to ensure everyone can participate safely and effectively.",
		},
		{
			question: "What if I have existing medical conditions or injuries?",
			answer:
				"Please consult with your healthcare provider before starting any new fitness program. If you have existing medical conditions or injuries, inform our instructors so they can provide appropriate modifications to exercises.",
		},
	];

	return (
		<div className="accordion-container mt-24 slideIn">
			<div className="accordion__wrapper mx-auto">
				<h3 className="accordion__title">Frequently Asked Questions</h3>
				<div className="gradient-line h-1 bg-gradient-to-r from-purple-400 to-fuchsia-500 mb-6"></div>
				{accordionData.map((item, index) => (
					<div key={index} className="accordion">
						<div
							className="accordion__header"
							onClick={() => toggleAccordion(index)}
						>
							<h2 className="accordion__question">{item.question}</h2>
							<span className="accordion__icon">
								<i
									id="accordion-icon"
									className={`${
										activeIndex === index ? "ri-subtract-fill" : "ri-add-line"
									} text-white`}
								></i>
							</span>
						</div>
						<div
							ref={(el) => (contentRefs.current[index] = el)}
							className={"accordion__content"}
							style={{
								height: activeIndex === index ? getContentHeight(index) : "0px",
							}}
						>
							<p className="accordion__answer">{item.answer}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FAQAccordion;
