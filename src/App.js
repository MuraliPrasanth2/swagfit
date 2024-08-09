import GroupFitnessForm from "./Pages/GroupFitnessForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./Contexts/AuthProvider";
import OtpLogin from "./Pages/OtpLogin";
import PrivateRoute from "./RouterHelpers/PrivateRoute";
import Home from "./Pages/Home";
import Book from "./Pages/Book";
import PersonalFitnessForm from "./Pages/PersonalFitnessForm";
import PhysioFitnessForm from "./Pages/PhysioFitnessForm";

function App() {
	const { authReady } = useAuth();

	const wrapPrivateRoute = (element, redirect) => {
		return <PrivateRoute redirect={redirect}>{element}</PrivateRoute>;
	};

	// <Route
	// 	path="/book"
	// 	exact
	// 	element={wrapPrivateRoute(<Book />, "/book")}
	// />
	return (
		authReady && (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login/*" element={<OtpLogin />} />
					<Route path="/book" exact element={<Book />} />
					<Route path="/groupfitness" exact element={<GroupFitnessForm />} />
					<Route
						path="/personalfitness"
						exact
						element={<PersonalFitnessForm />}
					/>
					<Route path="/physiofitness" exact element={<PhysioFitnessForm />} />
				</Routes>
			</BrowserRouter>
		)
	);
}

export default App;
