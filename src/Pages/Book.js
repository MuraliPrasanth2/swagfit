import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSlideInOnScroll from "../Hooks/useSlideOnScroll";

const OnlineGroupFitnessProgramPricingSection = () => {
	useSlideInOnScroll();
	const navigate = useNavigate();

	return (
		<div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-8 rounded-lg shadow-lg w-full max-w-96 self-stretch flex flex-col justify-evenly slideIn">
			<h3 className="text-xl font-semibold mb-4 text-white">
				ONLINE GROUP FITNESS
			</h3>
			<p className="text-gray-200 mb-4">📅 6 sessions per week</p>
			<p className="text-4xl font-bold text-white mb-4">
				₹ 3000 <span className="text-base">/mo</span>
			</p>
			<ul className="mb-8 text-white">
				<li className="mb-2 font-bold">3 in one combo session</li>
				<li className="mb-2 ml-3">🏃 High intensity interval training</li>
				<li className="mb-2 ml-3">🕺 Pilates and dance fitness</li>
				<li className="mb-2 italic">⏰ Flexible schedule</li>
			</ul>
			<div
				className="button-rainbow-container mx-auto mt-9 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:block hover:before:blur-lg active:before:blur-lg z-[1] before:-z-10"
				onClick={() => {
					navigate("/groupfitness");
				}}
			>
				<button className="button-rainbow z-[3] w-60">Get Started</button>
			</div>
		</div>
	);
};

const PersonalFitnessTrainingPricingSection = () => {
	const navigate = useNavigate();

	return (
		<div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 p-8 rounded-lg shadow-lg w-full max-w-96 self-stretch flex flex-col justify-evenly slideIn">
			<h3 className="text-xl font-semibold mb-4 text-white">
				PERSONAL FITNESS TRAINING
			</h3>
			<p className="text-gray-200 mb-4">
				Transform Your Fitness Journey with Personalized Online Training!
			</p>
			<p className="text-4xl font-bold text-white mb-4">
				₹ 6000 <span className="text-base">/mo</span>
			</p>
			<ul className="mb-8 text-white">
				<li className="mb-2 font-bold">Benefits of tailored workouts</li>
				<li className="mb-2 ml-3">
					💪 Expert guidance, and Flexible scheduling
				</li>
				<li className="mb-2 ml-3">🏠 All from the comfort of your home</li>
				<li className="mb-2 italic text-sm mt-3">
					Our 26-session package is designed to help you achieve your fitness
					goals efficiently and effectively.
				</li>
			</ul>
			<div
				className="button-rainbow-container mx-auto mt-9 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:block hover:before:blur-lg active:before:blur-lg z-[1] before:-z-10"
				onClick={() => {
					navigate("/personalfitness");
				}}
			>
				<button className="button-rainbow z-[3] w-60">Get Started</button>
			</div>
		</div>
	);
};
const PersonalDanceProgram = () => {
	const navigate = useNavigate();
	return (
		<div className="bg-gradient-to-r from-violet-950 via-indigo-950 to-fuchsia-950 p-8 rounded-lg shadow-lg w-full max-w-96 self-stretch flex flex-col justify-evenly slideIn">
			<h3 className="text-xl font-semibold mb-4 text-white">
				ONE-ON-ONE DANCE TRAINING
			</h3>
			<p className="text-gray-200 mb-4">
				Elevate your fitness journey with high-energy online dance sessions.
			</p>
			<p className="text-4xl font-bold text-white mb-4">
				₹ 6000 <span className="text-base">/mo</span>
			</p>
			<ul className="mb-8 text-white">
				<li className="mb-2">🕺 Stay fit with freestyle and hip hop dance</li>
				<li className="mb-2">
					🫶 Tailored workouts that enhance flexibility, coordination, and
					confidence.
				</li>
			</ul>
			<div
				className="button-rainbow-container mx-auto mt-9 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:block hover:before:blur-lg active:before:blur-lg z-[1] before:-z-10"
				onClick={() => {
					navigate("/dancefitness");
				}}
			>
				<button className="button-rainbow z-[3] w-60">Get Started</button>
			</div>
		</div>
	);
};

const PersonalPhysioProgram = () => {
	const navigate = useNavigate();

	return (
		<div className="bg-gradient-to-r from-teal-500 via-green-400 to-lime-500 p-8 rounded-lg shadow-lg w-full max-w-96 self-stretch flex flex-col justify-evenly slideIn">
			<h3 className="text-xl font-semibold mb-4 text-white">
				PHYSIOTHERAPY PERSONAL TRAINING
			</h3>
			<p className="text-gray-200 mb-4">
				Reclaim Your Strength with Online Physio Rehab Sessions!
			</p>
			<p className="text-4xl font-bold text-white mb-4">
				₹ 6000 <span className="text-base">/mo</span>
			</p>
			<ul className="mb-8 text-white">
				<li className="mb-2">
					🏠 Personalized rehabilitation from the comfort of your home
				</li>
				<li className="mb-2">
					🦾 Expert physiotherapist with tailored treatment plans
				</li>
				<li className="mb-2">🤝 Dedicated support for faster recovery</li>
				<li className="mb-2">⏰ Flexible scheduling to fit your needs</li>
			</ul>
			<div
				className="button-rainbow-container mx-auto mt-9 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:block hover:before:blur-lg active:before:blur-lg z-[1] before:-z-10"
				onClick={() => {
					navigate("/physiofitness");
				}}
			>
				<button className="button-rainbow z-[3] w-60">Get Started</button>
			</div>
		</div>
	);
};
const Book = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="bg-gray-900 text-white py-16 bg-roundedStripesBlack">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-8">
					Available Programs
				</h2>
				<div className="flex flex-wrap justify-center items-center gap-8">
					<OnlineGroupFitnessProgramPricingSection />
					<PersonalFitnessTrainingPricingSection />
					<PersonalPhysioProgram />
					<PersonalDanceProgram />
				</div>
			</div>
		</div>
	);
};

export default Book;
