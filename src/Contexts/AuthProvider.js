import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

const AuthContext = createContext({ user: null });

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthReady(true);
            setUser(user || null);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, authReady }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context) {
        return useContext(AuthContext);
    }

    throw new Error(
        "Auth context should only be accessed by the components that is inside the auth provider",
    );
};
