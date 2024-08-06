import GroupFitnessForm from "./Pages/GroupFitnessForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthProvider";
import OtpLogin from "./Pages/OtpLogin";

function App() {
	const { user, authReady } = useAuth();

	return (
		authReady && (
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						exact
						element={
							user ? (
								<GroupFitnessForm />
							) : (
								<Navigate to="/login" state={{ from: "/" }} replace />
							)
						}
					/>
					<Route
						path="/login"
						element={
							!user ? (
								<OtpLogin />
							) : (
								<Navigate to="/" state={{ from: "/login" }} replace />
							)
						}
					/>
				</Routes>
			</BrowserRouter>
		)
	);
}

export default App;
