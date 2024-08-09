import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnlineGroupFitnessProgramPricingSection = () => {
	// <button
	//     className="bg-fuchsia-800 hover:bg-fuchsia-900 text-white font-semibold py-2 px-4 rounded"
	//     onClick={() => {
	//         navigate("/groupfitness");
	//     }}
	// >
	//     Get Started
	// </button>

	const navigate = useNavigate();

	return (
		<div className="bg-neutral-900 p-8 rounded-lg shadow-lg w-full max-w-96 self-stretch flex flex-col justify-evenly">
			<h3 className="text-xl font-semibold mb-4">
				Online group fitness program
			</h3>
			<p className="text-gray-400 mb-4">📅 6 sessions per week</p>
			<p className="text-4xl font-bold mb-4">
				₹ 3000 <span className="text-base">/mo</span>
			</p>
			<ul className="mb-8">
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
		<div className="bg-neutral-900 p-8 rounded-lg shadow-lg w-full max-w-96 self-stretch flex flex-col justify-evenly">
			<h3 className="text-xl font-semibold mb-4">Personal fitness program</h3>
			<p className="text-gray-400 mb-4">
				Transform Your Fitness Journey with Personalized Online Training!
			</p>
			<p className="text-4xl font-bold mb-4">
				₹ 7000 <span className="text-base">/mo</span>
			</p>
			<ul className="mb-8">
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
	return (
		<div className="bg-neutral-900 bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-96 self-stretch flex flex-col justify-evenly">
			<h3 className="text-xl font-semibold mb-4">Dance Fitness Program</h3>
			<p className="text-gray-400 mb-4">
				Elevate your fitness journey with high-energy online dance sessions.
			</p>
			<p className="text-4xl font-bold mb-4">
				₹ 7000 <span className="text-base">/mo</span>
			</p>
			<ul className="mb-8">
				<li className="mb-2">🕺 Stay fit with freestyle and hip hop dance</li>
				<li className="mb-2">
					🫶 Tailored workouts that enhance flexibility Coordination, and
					Confidence.
				</li>
			</ul>
			<div className="button-rainbow-container mx-auto mt-9 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:block hover:before:blur-lg active:before:blur-lg z-[1] before:-z-10">
				<button className="button-rainbow z-[3] w-60">Get Started</button>
			</div>
		</div>
	);
};

const PersonalPhysioProgram = () => {
	return (
		<div className="bg-neutral-900 p-8 rounded-lg shadow-lg w-full max-w-96 self-stretch flex flex-col justify-evenly">
			<h3 className="text-xl font-semibold mb-4">Personal Physio Program</h3>
			<p className="text-gray-400 mb-4">
				Reclaim Your Strength with Online Physio Rehab Sessions!
			</p>
			<p className="text-4xl font-bold mb-4">
				₹ 7000 <span className="text-base">/mo</span>
			</p>
			<ul className="mb-8">
				<li className="mb-2">
					🏠 Personalized rehabilitation from the comfort of your home
				</li>
				<li className="mb-2">
					🦾 Expert physiotherapist with tailored treatment plans
				</li>
				<li className="mb-2">🤝 Dedicated support for faster recovery</li>
				<li className="mb-2">⏰ Flexible scheduling to fit your needs</li>
			</ul>
			<div className="button-rainbow-container mx-auto mt-9 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:block hover:before:blur-lg active:before:blur-lg z-[1] before:-z-10">
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
