import GroupFitnessForm from "./Pages/GroupFitnessForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthProvider";
import OtpLogin from "./Pages/OtpLogin";
import PrivateRoute from "./RouterHelpers/PrivateRoute";

function App() {
    const { user, authReady } = useAuth();

    const wrapPrivateRoute = (element, redirect) => {
        return <PrivateRoute redirect={redirect}>{element}</PrivateRoute>;
    };

    return (
        authReady && (
            <BrowserRouter>
                <Routes>
                    <Route path="/login/*" element={<OtpLogin />} />
                    <Route
                        path="/book"
                        exact
                        element={wrapPrivateRoute(<GroupFitnessForm />, "/book")}
                    />
                </Routes>
            </BrowserRouter>
        )
    );
}

export default App;
