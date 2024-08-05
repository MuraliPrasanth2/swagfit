// external Libraries
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js/mobile";

// react hooks
import { useEffect, useState } from "react";

export default function LoginForm() {
	const [number, setNumber] = useState("");
	const [isValidNumber, setIsValidNumber] = useState(null);
	const [isPhoneNubmerTouched, setIsPhoneNubmerTouched] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isValidNumber) {
			console.log("show captcha screen");
		}
	};

	const handlePhoneNumberInputBlur = () => {
		setIsPhoneNubmerTouched(true);
	};

	useEffect(() => {
		try {
			if (isValidPhoneNumber(number)) {
				setIsValidNumber(true);
			} else {
				setIsValidNumber(false);
			}
		} catch (err) {
			console.log("Please enter a number not a string");
		}
	}, [number, isPhoneNubmerTouched]);

	return (
		<div className="font-montserrat flex flex-col h-screen w-screen justify-center items-center bg-black text-white bg-roundedStripesBlack">
			<h1 className="fixed top-20 text-center font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
				Swag fit
			</h1>
			<div className="max-w-60">
				<h2 className="sr-only">Login with phone number</h2>
				<form onSubmit={handleSubmit}>
					<PhoneInput
						className="[&>input]:color-white [&>input]:bg-black [&_select]:bg-black"
						defaultCountry="IN"
						placeholder="Enter mobile number"
						value={number}
						onChange={setNumber}
						onBlur={handlePhoneNumberInputBlur}
					/>

					{!isValidNumber && isPhoneNubmerTouched ? (
						<div className="text-red-500 mt-2 text-center">
							Invalid phone number
						</div>
					) : null}
					<button className="px-4 py-2 text-center w-full bg-fuchsia-800 mt-4 text-white font-semibold hover:bg-fuchsia-900 active:bg-fuchsia-900 cursor-pointer">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
