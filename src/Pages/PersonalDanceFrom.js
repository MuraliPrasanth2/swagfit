// components
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
	// Personal Information
	name: Yup.string()
		.required("Please provide your full name.")
		.min(2, "Name should contain at least 2 characters.")
		.max(30, "Name should not have more than 30 characters."),
	email: Yup.string()
		.email("Please provide a valid email address.")
		.required("Please provide your email address."),
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
	gender: Yup.string().required("Please select your gender."),
	preferredContactMethod: Yup.string().required(
		"Please select your preferred contact method.",
	),

	// Fitness and Dance Background
	previousDanceTraining: Yup.string().required("Please provide your answer."),
	// danceStyles: Yup.string().when("previousDanceTraining", {
	//     is: "Yes",
	//     then: Yup.string().required("Please specify the dance styles."),
	// }),
	// yearsDancing: Yup.string().when("previousDanceTraining", {
	//     is: "Yes",
	//     then: Yup.string().required(
	//         "Please specify how long you have been dancing.",
	//     ),
	// }),
	currentFitnessLevel: Yup.string().required(
		"Please provide your current fitness level.",
	),
	experienceWithDanceFitness: Yup.string().required(
		"Please provide your answer.",
	),

	// Goals and Preferences
	fitnessGoals: Yup.array().min(1, "Please select your fitness goals."),
	danceStylesInterested: Yup.array().min(
		1,
		"Please select the dance styles you're interested in.",
	),
	specificDanceGoals: Yup.string(),
	preferredTrainingFrequency: Yup.string().required(
		"Please select your preferred training frequency.",
	),

	// Health and Safety
	medicalConditions: Yup.string().required("Please provide your answer."),
	// medicalConditionDetails: Yup.string().when("medicalConditions", {
	//     is: "Yes",
	//     then: Yup.string().required("Please specify your medical conditions."),
	// }),
	takingMedication: Yup.string().required("Please provide your answer."),
	// medicationDetails: Yup.string().when("takingMedication", {
	//     is: "Yes",
	//     then: Yup.string().required("Please specify your medication details."),
	// }),
	allergies: Yup.string().required("Please provide your answer."),
	// allergyDetails: Yup.string().when("allergies", {
	//     is: "Yes",
	//     then: Yup.string().required("Please specify your allergies."),
	// }),

	// Scheduling
	preferredTrainingDays: Yup.array()
		.min(1, "Please select at least one day.")
		.required("Please select your preferred training days."),
	preferredTrainingTimes: Yup.array()
		.min(1, "Please select at least one time.")
		.required("Please select your preferred training times."),
});

const initialValues = {
	// Personal Information
	name: "",
	email: "",
	dob: "",
	gender: "",
	preferredContactMethod: "",

	// Fitness and Dance Background
	previousDanceTraining: "",
	danceStyles: "",
	yearsDancing: "",
	currentFitnessLevel: "",
	experienceWithDanceFitness: "",

	// Goals and Preferences
	fitnessGoals: [],
	danceStylesInterested: [],
	specificDanceGoals: "",
	preferredTrainingFrequency: "",

	// Health and Safety
	medicalConditions: "",
	medicalConditionDetails: "",
	takingMedication: "",
	medicationDetails: "",
	allergies: "",
	allergyDetails: "",

	// Scheduling
	preferredTrainingDays: [],
	preferredTrainingTimes: [],
};

function PersonalDanceTrainingForm() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { user } = useAuth();
	const userPhoneNumber = user.phoneNumber;
	const [uploadError, setUploadError] = useState(null);
	const [slotBookedAlready, setSlotBookedAlready] = useState(false);
	const [haveProfileValues, setHaveProfileValues] = useState(false);

	const docRefDanceTraining = useRef(
		doc(db, "personalDanceTraining", userPhoneNumber),
	);
	const docRefProfileInfo = useRef(
		doc(db, "profileInformation", userPhoneNumber),
	);

	const [storedFormValues, loadingStoredFormValues] = useDocument(
		docRefDanceTraining.current,
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		},
	);

	const [storedProfileValues] = useDocument(docRefProfileInfo.current, {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

	const formik = useFormik({
		initialValues,

		onSubmit: (values) => {
			try {
				setDoc(doc(db, "personalDanceTraining", userPhoneNumber), values)
					.then(() => {})
					.catch((err) => {
						setUploadError(
							"Your slot is not booked yet, please try again after some time.",
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
						setUploadError(
							"Your slot is not booked yet, please try again after some time.",
						);
					});
			} catch (err) {
				setUploadError(
					"Your slot is not booked yet, please try again after some time.",
				);
			}
		},
		validationSchema: formSchema,
	});

	useEffect(() => {
		if (storedFormValues && storedFormValues.exists()) {
			setSlotBookedAlready(true);
		}
	}, [storedFormValues]);

	useEffect(() => {
		if (storedProfileValues && storedProfileValues.exists()) {
			if (!haveProfileValues) {
				const data = storedProfileValues.data();
				formik.setFieldValue("name", data.name);
				formik.setFieldValue("dob", data.dob);
				formik.setFieldValue("email", data.email);
				setHaveProfileValues(true);
			}
		}
	}, [storedProfileValues, haveProfileValues, formik]);

	const SlotBookedAlreadyMessage = () => (
		<div className="text-center font-semibold bg-fuchsia-600 p-4 rounded-[3rem]">
			You have booked your slot for this program.
		</div>
	);

	return (
		<div
			className="font-montserrat bg-black text-slate-50 bg-roundedStripesBlack min-h-screen"
			onSubmit={formik.handleSubmit}
		>
			<div className="max-w-4xl mx-auto pt-12 px-8">
				<section className="text-left mb-12">
					<h1 className="text-4xl font-bold">One-on-One Dance Training</h1>
					<p className="mt-10 font-semibold">
						Experience personalized dance training with expert instructors who
						will guide you through tailored sessions that align with your
						fitness and dance goals.
					</p>
				</section>
				{!slotBookedAlready && !loadingStoredFormValues && (
					<form className="mx-auto block max-w-[800px] p-2 pt-0">
						<h2 className="text-2xl font-bold text-gray-400 mb-6">
							Personal Information
						</h2>
						<OpenEnd
							type="text"
							questionId={"name"}
							questionText={"Full Name"}
							formik={formik}
							disabled={haveProfileValues}
						/>
						<OpenEnd
							type="email"
							questionId={"email"}
							questionText={"Email Address"}
							formik={formik}
							disabled={haveProfileValues}
						/>
						<OpenEnd
							type="date"
							questionId={"dob"}
							questionText={"Date of Birth"}
							formik={formik}
							disabled={haveProfileValues}
						/>
						<Radio
							questionId={"gender"}
							questionText={"Gender"}
							answers={["Male", "Female", "Other"]}
							formik={formik}
						/>
						<Radio
							questionId={"preferredContactMethod"}
							questionText={"Preferred Contact Method"}
							answers={["Email", "Phone"]}
							formik={formik}
						/>
						<h2 className="text-2xl font-bold text-gray-400 mb-6 mt-20">
							Fitness and Dance Background
						</h2>
						<Radio
							questionId={"previousDanceTraining"}
							questionText={"Have you had any previous dance training?"}
							answers={["Yes", "No"]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"danceStyles"}
							questionText={"If yes, what styles of dance have you practiced?"}
							formik={formik}
							hide={!(formik.values.previousDanceTraining === "Yes")}
						/>
						<OpenEnd
							type="number"
							questionId={"yearsDancing"}
							questionText={"How long have you been dancing?"}
							formik={formik}
							hide={!(formik.values.previousDanceTraining === "Yes")}
							min="0"
							max="30"
						/>
						<Radio
							questionId={"currentFitnessLevel"}
							questionText={
								"How would you describe your current fitness level?"
							}
							answers={["Beginner", "Intermediate", "Advanced"]}
							formik={formik}
						/>
						<Radio
							questionId={"experienceWithDanceFitness"}
							questionText={
								"Do you have any experience with dance fitness programs?"
							}
							answers={["Yes", "No"]}
							formik={formik}
						/>
						<h2 className="text-2xl font-bold text-gray-400 mb-6 mt-20">
							Goals and Preferences
						</h2>
						<Checkbox
							questionId={"fitnessGoals"}
							questionText={"What are your fitness goals?"}
							answers={[
								"Lose weight",
								"Build muscle",
								"Improve flexibility",
								"Increase endurance",
								"Other",
							]}
							formik={formik}
						/>
						<Checkbox
							questionId={"danceStylesInterested"}
							questionText={"What styles of dance are you interested in?"}
							answers={[
								"Hip-hop",
								"Ballet",
								"Salsa",
								"Zumba",
								"Contemporary",
								"Other",
							]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"specificDanceGoals"}
							questionText={
								"Do you have any specific dance goals you’d like to achieve?"
							}
							formik={formik}
						/>
						<Radio
							questionId={"preferredTrainingFrequency"}
							questionText={"How often would you like to train?"}
							answers={[
								"Once a week",
								"Twice a week",
								"Three times a week",
								"Other",
							]}
							formik={formik}
						/>
						<h2 className="text-2xl font-bold text-gray-400 mb-6 mt-20">
							Health and Safety
						</h2>
						<Radio
							questionId={"medicalConditions"}
							questionText={
								"Do you have any medical conditions we should be aware of?"
							}
							answers={["Yes", "No"]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"medicalConditionDetails"}
							questionText={"If yes, please provide details"}
							formik={formik}
							hide={!(formik.values.medicalConditions === "Yes")}
						/>
						<Radio
							questionId={"takingMedication"}
							questionText={"Are you currently taking any medication?"}
							answers={["Yes", "No"]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"medicationDetails"}
							questionText={"If yes, please provide details"}
							formik={formik}
							hide={!(formik.values.takingMedication === "Yes")}
						/>
						<Radio
							questionId={"allergies"}
							questionText={"Do you have any allergies?"}
							answers={["Yes", "No"]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"allergyDetails"}
							questionText={"If yes, please provide details"}
							formik={formik}
							hide={!(formik.values.allergies === "Yes")}
						/>
						<h2 className="text-2xl font-bold text-gray-400 mb-6 mt-20">
							Scheduling
						</h2>
						<Checkbox
							questionId={"preferredTrainingDays"}
							questionText={
								"What days of the week are you available for training?"
							}
							answers={[
								"Monday",
								"Tuesday",
								"Wednesday",
								"Thursday",
								"Friday",
								"Saturday",
								"Sunday",
							]}
							formik={formik}
						/>
						<Checkbox
							questionId={"preferredTrainingTimes"}
							questionText={"What times of day are you available for training?"}
							answers={["Morning", "Afternoon", "Evening"]}
							formik={formik}
						/>
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
				{uploadError && (
					<div className="text-center font-semibold bg-red-600 p-4 rounded-[3rem] mt-4">
						{uploadError}
					</div>
				)}
			</div>
		</div>
	);
}

export default PersonalDanceTrainingForm;
