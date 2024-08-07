import { useNavigate } from "react-router-dom";

const OnlineGroupFitnessProgramPricingSection = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-96 self-stretch flex flex-col justify-evenly">
            <h3 className="text-xl font-semibold mb-4">
                Online group fitness Program
            </h3>
            <p className="text-gray-400 mb-4">
                Perfect for weight loss, flexibility and stability
            </p>
            <p className="text-4xl font-bold mb-4">
                3000 ₹<span className="text-base">/mo</span>
            </p>
            <ul className="mb-8">
                <li className="mb-2">2 High intensity cardio sessions / week</li>
                <li className="mb-2">2 Plates sessions / week</li>
                <li className="mb-2">2 Dance sessions / week</li>
                <li className="mb-2">
                    Improves weight loss, flexibility and stability
                </li>
            </ul>
            <button
                className="bg-fuchsia-800 hover:bg-fuchsia-900 text-white font-semibold py-2 px-4 rounded"
                onclick={() => {
                    navigate("/groupfitness");
                }}
            >
                Get Started
            </button>
        </div>
    );
};

const PersonalFitnessTrainingPricingSection = () => {
    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-96 self-stretch flex flex-col justify-evenly">
            <h3 className="text-xl font-semibold mb-4">Personal fitness program</h3>
            <p className="text-gray-400 mb-4">
                Achieve your fitness goals with customized diet and workout plans and
                personal guidance
            </p>
            <p className="text-4xl font-bold mb-4">
                9000 ₹<span className="text-base">/mo</span>
            </p>
            <ul className="mb-8">
                <li className="mb-2">Personalized workout plans.</li>
                <li className="mb-2">Personalized diet plan</li>
                <li className="mb-2">
                    Personalized guidance as per your fitness goals
                </li>
                <li className="mb-2">One-on-one fitness sessions</li>
            </ul>
            <button className="bg-fuchsia-800 hover:bg-fuchsia-900 text-white font-semibold py-2 px-4 rounded">
                Get Started
            </button>
        </div>
    );
};

const PersonalDanceProgram = () => {
    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-96 self-stretch flex flex-col justify-evenly">
            <h3 className="text-xl font-semibold mb-4">Dance Fitness Program</h3>
            <p className="text-gray-400 mb-4">
                Stay fit and have fun with energetic dance workouts
            </p>
            <p className="text-4xl font-bold mb-4">
                4000 ₹<span className="text-base">/mo</span>
            </p>
            <ul className="mb-8">
                <li className="mb-2">5 Dance fitness sessions / week</li>
                <li className="mb-2">Includes Zumba, Hip Hop, and Salsa</li>
                <li className="mb-2">Boosts cardiovascular health and endurance</li>
                <li className="mb-2">Enhances coordination and rhythm</li>
            </ul>
            <button className="bg-fuchsia-800 hover:bg-fuchsia-900 text-white font-semibold py-2 px-4 rounded mt-auto">
                Get Started
            </button>
        </div>
    );
};

const PersonalPhysioProgram = () => {
    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-96 self-stretch flex flex-col justify-evenly">
            <h3 className="text-xl font-semibold mb-4">Personal Physio Program</h3>
            <p className="text-gray-400 mb-4">
                Recover and strengthen with tailored physiotherapy sessions
            </p>
            <p className="text-4xl font-bold mb-4">
                5000 ₹<span className="text-base">/mo</span>
            </p>
            <ul className="mb-8">
                <li className="mb-2">Personalized rehabilitation exercises</li>
                <li className="mb-2">Injury prevention and recovery plans</li>
                <li className="mb-2">Expert guidance for musculoskeletal health</li>
                <li className="mb-2">One-on-one physiotherapy sessions</li>
            </ul>
            <button className="bg-fuchsia-800 hover:bg-fuchsia-900 text-white font-semibold py-2 px-4 rounded mt-auto">
                Get Started
            </button>
        </div>
    );
};
const Book = () => {
    return (
        <div className="bg-gray-900 text-white py-16 ">
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
