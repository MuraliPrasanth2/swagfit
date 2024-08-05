import GroupFitnessForm from "./Pages/GroupFitnessForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Pages/LoginForm";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<GroupFitnessForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
