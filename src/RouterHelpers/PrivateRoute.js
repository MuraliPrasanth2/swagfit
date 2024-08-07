import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthProvider";

const PrivateRoute = ({ children, redirect }) => {
	const { user } = useAuth();
	const authenticate = user ? true : false;
	const location = useLocation();

	return authenticate ? (
		children
	) : (
		<Navigate
			to={`/login?redirect=${encodeURIComponent(redirect || location.pathname)}`}
		/>
	);
};

export default PrivateRoute;
