// components
import Dropdown from "../Components/FormElements/Dropdown";
import OpenEnd from "../Components/FormElements/OpenEnd";
import Radio from "../Components/FormElements/Radio";
import Checkbox from "../Components/FormElements/Checkbox";

// external Libraries
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../Contexts/AuthProvider";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useRef, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import dayjs from "dayjs";

const formSchema = Yup.object().shape({
	name: Yup.string()
		.required("Please provide a name.")
		.min(2, "name should contain at least 2 characters.")
		.max(30, "name sshould not have more than 30 characters."),
	gender: Yup.string().required("Please select your gender."),
	dob: Yup.date("Please provide a valid date")
		.required("Please provide your date of birth")
		.min(
			dayjs().subtract(120, "year"),
			"Come on, you can't be 120 years old, buddy! Let's keep it real.",
		)
		.max(
			dayjs().add(0, "day"),
			"Whoa, time traveler! You can't pick a date from the future. Try again!",
		),
	email: Yup.string("Please provide a valid email id.")
		.email("Please provide a valid email id.")
		.required("Please provide an email"),
	occupation: Yup.string().required("Please specify your occupation."),
	address: Yup.string().required("Please provide your answer."),
	timing: Yup.string().required("Please select a slot"),
	fitnessProgramNames: Yup.string().required("Please provide an answer."),
	fitnessGoals: Yup.array().min(1, "Please select your fitness goals."),
	priorFitnessExperience: Yup.string().required("Please provide your answer."),
	medicalConditions: Yup.string().required("Please provide your answer."),
	basicEquipment: Yup.string().required("Please provide your answer."),
});

const initialValues = {
	name: "",
	gender: "",
	dob: "",
	email: "",
	occupation: "",
	address: "",
	timing: "",
	fitnessProgramNames: "",
	fitnessGoals: [],
	priorFitnessExperience: "",
	medicalConditions: "",
	basicEquipment: "",
};

function GroupFitnessForm() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// uncomment the below lines to upload the form data to firebase once the submit button is clicked and the responses passes all the validation rules.
	const { user } = useAuth();
	const userPhoneNumber = user.phoneNumber;

	// const userPhoneNumber = "+917010962631";
	const [uploadError, setUplaodError] = useState(null);
	const [slotBookedAlready, setSlotBookedAlready] = useState(false);
	const [haveProfileValues, setHaveProfileValues] = useState(false);

	// uncomment the below lines to upload the form data to firebase once the submit button is clicked and the responses passes all the validation rules.
	const docRefGroupFitness = useRef(doc(db, "groupFitness", userPhoneNumber));
	const docRefProfileInfo = useRef(
		doc(db, "profileInformation", userPhoneNumber),
	);

	// un comment the below line to hide the form for already filled in users
	const [storedFormValues, loadingStoredFormValues] = useDocument(
		docRefGroupFitness.current,
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		},
	);

	const [storedProfileValues] = useDocument(docRefProfileInfo.current, {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

	// uncomment the below line to hide the form for already filled in users
	useEffect(() => {
		if (storedFormValues) {
			if (storedFormValues.exists()) {
				setSlotBookedAlready(true);
			}
		}
	}, [storedFormValues]);

	const formik = useFormik({
		initialValues,

		onSubmit: (values) => {
			// console.log(values);
			// console.log(JSON.stringify(values));
			try {
				// uncomment the below lines to upload the form data to firebase once the submit button is clicked and the responses passes all the validation rules.
				setDoc(doc(db, "groupFitness", userPhoneNumber), values)
					.then(() => {})
					.catch((err) => {
						// console.log(err);
						setUplaodError(
							"Your slot is not booked yet, please try again after sometime,",
						);
					});
				const personalInfo = (({ name, dob, email, gender }) => ({
					name,
					dob,
					email,
					gender,
				}))(values);
				setDoc(doc(db, "profileInformation", userPhoneNumber), personalInfo)
					.then(() => {})
					.catch((err) => {
						// console.log(err);
						setUplaodError(
							"Your slot is not booked yet, please try again after sometime,",
						);
					});
			} catch (err) {
				// uncomment the below lines to upload the form data to firebase once the submit button is clicked and the responses passes all the validation rules.
				setUplaodError(
					"Your slot is not booked yet, please try again after sometime,",
				);
			}
		},
		validationSchema: formSchema,
	});

	useEffect(() => {
		if (storedProfileValues) {
			if (storedProfileValues.exists()) {
				if (!haveProfileValues) {
					const data = storedProfileValues.data();
					// console.log(data);
					formik.setFieldValue("name", data.name);
					formik.setFieldValue("dob", data.dob);
					formik.setFieldValue("email", data.email);
					setHaveProfileValues(true);
				}
			}
		}
	}, [storedProfileValues, haveProfileValues, formik]);

	const SlotBookedAlreadyMessage = () => {
		return (
			<>
				<div className="text-center font-semibold bg-fuchsia-600 p-4 rounded-[3rem]">
					You have booked your slot for this program.
				</div>
			</>
		);
	};

	return (
		<div
			className="font-montserrat bg-black text-slate-50 bg-roundedStripesBlack min-h-screen"
			onSubmit={formik.handleSubmit}
		>
			<div className="max-w-4xl mx-auto pt-12 px-8">
				<section className="mb-16">
					<h1 className="text-3xl font-bold mb-4">
						Unlock the Ultimate in Fitness
					</h1>
					<p className="text-lg mb-6">
						Experience our budget-friendly 6-day weekly program designed to
						cater to all your fitness needs:
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
						<div className="bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 text-white p-2 rounded-lg shadow-md flex flex-col items-center text-center">
							<h2 className="text-sm font-semibold mb-1">Monday</h2>
							<p className="text-xs font-medium">Intense HIIT</p>
						</div>
						<div className="bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 text-white p-2 rounded-lg shadow-md flex flex-col items-center text-center">
							<h2 className="text-sm font-semibold mb-1">Tuesday</h2>
							<p className="text-xs font-medium">Energizing Dance Fitness</p>
						</div>
						<div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-2 rounded-lg shadow-md flex flex-col items-center text-center">
							<h2 className="text-sm font-semibold mb-1">Wednesday</h2>
							<p className="text-xs font-medium">Core-Stabilizing Pilates</p>
						</div>
						<div className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white p-2 rounded-lg shadow-md flex flex-col items-center text-center">
							<h2 className="text-sm font-semibold mb-1">Thursday</h2>
							<p className="text-xs font-medium">Vibrant Dance Fitness</p>
						</div>
						<div className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 text-white p-2 rounded-lg shadow-md flex flex-col items-center text-center">
							<h2 className="text-sm font-semibold mb-1">Friday</h2>
							<p className="text-xs font-medium">Power-Packed HIIT</p>
						</div>
						<div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white p-2 rounded-lg shadow-md flex flex-col items-center text-center">
							<h2 className="text-sm font-semibold mb-1">Saturday</h2>
							<p className="text-xs font-medium">
								Flexibility-Enhancing Pilates
							</p>
						</div>
					</div>

					<div className="text-center mb-6">
						<h2 className="text-2xl font-bold mb-2">Choose Your Ideal Time</h2>
						<p className="text-md font-medium">Morning / Afternoon / Evening</p>
					</div>
					<div className="text-center">
						<h2 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 shadow-2xl">
							All for Only <span className="text-6xl">₹3000</span> per person!
						</h2>
					</div>
				</section>
				{!slotBookedAlready && !loadingStoredFormValues && (
					<form className="mx-auto block max-w-[800px] p-2 pt-0">
						<Dropdown
							formik={formik}
							questionId={"timing"}
							questionText={"Select your preferred slot"}
							answers={[
								"Morning 9.30am to 10.30am",
								"Afternoon 2.00 pm to 3.00 pm",
								"Evening 5.00 pm to 6.00 pm",
							]}
						/>
						<OpenEnd
							type="text"
							questionId={"name"}
							questionText={"Full name"}
							formik={formik}
							disabled={haveProfileValues}
						/>
						<OpenEnd
							type="date"
							questionId={"dob"}
							questionText={"Date of birth"}
							formik={formik}
							disabled={haveProfileValues}
						/>
						<OpenEnd
							type="email"
							questionId={"email"}
							questionText={"Email"}
							formik={formik}
							disabled={haveProfileValues}
						/>
						<Radio
							questionId={"gender"}
							questionText={"Gender"}
							answers={["Male", "Female", "Other"]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"occupation"}
							questionText={"Occupation"}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"address"}
							questionText={"Your location(city, area name)."}
							formik={formik}
						/>
						<Checkbox
							questionId={"fitnessGoals"}
							questionText={"Primary fitness goals?"}
							answers={[
								"Weight loss",
								"Increased strength ",
								"Cardiovascular health ",
								"General fitness",
							]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"fitnessProgramNames"}
							questionText={
								"Have you participated in any fitness programs before? If so, which ones"
							}
							formik={formik}
						/>
						<Radio
							questionId={"priorFitnessExperience"}
							questionText={
								"Do you have any prior experience with CrossFit or high-intensity workouts?"
							}
							answers={["yes", "no"]}
							formik={formik}
						/>
						<Radio
							questionId={"medicalConditions"}
							questionText={
								"Do you have any existing medical conditions or injuries ?"
							}
							answers={["yes", "no"]}
							formik={formik}
						/>
						<Radio
							questionId={"basicEquipment"}
							questionText={
								"Do you have access to basic workout equipment (e.g., dumbbells, stepper, yoga mat)?"
							}
							answers={["yes", "no"]}
							formik={formik}
						/>
						{uploadError && (
							<span className="text-red-600 text-center">{uploadError}</span>
						)}
						{Object.keys(formik.errors).length &&
						Object.keys(formik.touched).length ===
							Object.keys(initialValues).length ? (
							<span className="text-red-600 text-center">
								Some of the information provided is incorrect. Please review and
								correct the highlighted fields before submitting the form.{" "}
							</span>
						) : null}

						<div className="text-center">
							<div className="button-rainbow-container mx-auto mt-9 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:block hover:before:blur-lg active:before:blur-lg z-[1] before:-z-10">
								<button type="submit" className="button-rainbow z-[3]">
									Book a slot
								</button>
							</div>
						</div>
					</form>
				)}
				{slotBookedAlready && <SlotBookedAlreadyMessage />}
			</div>
		</div>
	);
}

export default GroupFitnessForm;
