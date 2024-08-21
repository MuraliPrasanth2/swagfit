import React, { useState } from "react";
import logo from "../images/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase/config";
import { useAuth } from "../Contexts/AuthProvider";

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const { user } = useAuth();

	const getLinkClasses = (path) => {
		return `block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:p-0 ${
			location.pathname === path
				? "bg-purple-700 text-white md:p-2"
				: "text-gray-300 hover:text-purple-300"
		}`;
	};

	// Function to handle link click and close the menu
	const handleLinkClick = () => {
		setIsOpen(false);
	};

	const handleLogout = async () => {
		try {
			await auth.signOut();
		} catch (error) {
			console.error("Error signing out: ", error);
		}
	};

	return (
		<nav className="bg-black border-gray-200 dark:bg-black sticky z-20 w-screen">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link
					to="/"
					className="flex items-center space-x-3 rtl:space-x-reverse"
				>
					<img src={logo} className="h-8" alt="Logo" />

					<span className="text-white font-montserrat font-semibold">
						Swagfit
					</span>
				</Link>
				<button
					onClick={() => setIsOpen(!isOpen)}
					type="button"
					className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					aria-controls="navbar-default"
					aria-expanded={isOpen}
				>
					<span className="sr-only">Open main menu</span>
					<svg
						className="w-5 h-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 17 14"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 1h15M1 7h15M1 13h15"
						/>
					</svg>
				</button>
				<div
					className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
					id="navbar-default"
				>
					<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:items-center">
						<li>
							<Link
								to="/"
								className={getLinkClasses("/")}
								onClick={handleLinkClick}
							>
								Home
							</Link>
						</li>
						{!user && (
							<li>
								<Link
									to="/login"
									className={getLinkClasses("/login")}
									onClick={handleLinkClick}
								>
									Login
								</Link>
							</li>
						)}
						<li>
							<Link
								to="/book"
								className={getLinkClasses("/book")}
								onClick={handleLinkClick}
							>
								Book Slot
							</Link>
						</li>
						<li>
							<Link
								to="/groupfitness"
								className={getLinkClasses("/groupfitness")}
								onClick={handleLinkClick}
							>
								Group Fitness
							</Link>
						</li>
						<li>
							<Link
								to="/personalfitness"
								className={getLinkClasses("/personalfitness")}
								onClick={handleLinkClick}
							>
								Personal Training
							</Link>
						</li>
						<li>
							<Link
								to="/physiofitness"
								className={getLinkClasses("/physiofitness")}
								onClick={handleLinkClick}
							>
								Physio PT
							</Link>
						</li>
						<li>
							<Link
								to="/dancefitness"
								className={getLinkClasses("/dancefitness")}
								onClick={handleLinkClick}
							>
								Dance PT
							</Link>
						</li>
						{user && (
							<li>
								<button
									className="text-gray-300 px-2 py-2 bg-red-700 ml-2 rounded-md mt-2 md:mt-0"
									onClick={handleLogout}
								>
									Logout
								</button>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
