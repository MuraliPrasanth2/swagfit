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
	// Personal Information
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

	// Medical History
	preexistingMedicalCondition: Yup.string().required(
		"Please provide your answer.",
	),
	takingMedication: Yup.string().required("Please provide your answer."),

	// Current Fitness Level
	currentFitnessLevel: Yup.string().required("Please provide your answer."),
	regularExerciseRoutine: Yup.string().required("Please provide your answer."),

	// Fitness Goals
	fitnessGoals: Yup.array().min(1, "Please select your fitness goals."),
	specifitAreaToFocuesFitnessGoals: Yup.string().required(
		"Please provide your answer.",
	),
	upcomingEventOrMilestone: Yup.string().required(
		"Please provide your answer.",
	),

	// Lifestyle and preferences
	preferedTrainingTime: Yup.string().required("Please provide your answer."),
	daysAvailableForTraining: Yup.number("Please provide a number")
		.min(1, "Must be at least 1.")
		.max(6, "Maximum is 6")
		.required("Please provide your answer."),
	preferedTrainingType: Yup.string().required("Please provide your answer."),
	preferedSessionType: Yup.string().required("Please provide your answer."),

	// Additional Information
	workedWithPersonalTrainer: Yup.string().required(
		"Please provide your answer.",
	),
	informationToTailorTrainingProgram: Yup.string().required(
		"Please provide your answer.",
	),

	// Consent
	termsAndConditions: Yup.array().min(
		1,
		"Please agree to the terms and conditions to proceed.",
	),
	consentForStoringPersonalInformation: Yup.array().min(
		1,
		"Please provide your concent to storing your information",
	),
});

const initialValues = {
	// Personal Information
	name: "",
	gender: "",
	dob: "",
	email: "",
	occupation: "",
	address: "",

	// Medical History
	preexistingMedicalCondition: "",
	preexistingMedicalConditionDetails: "",
	takingMedication: "",
	takingMedicationDetails: "",

	// Current Fitness Level
	currentFitnessLevel: "",
	regularExerciseRoutine: "",
	regularExerciseRoutineDescribe: "",

	// Fitness Goals
	fitnessGoals: [],
	specifitAreaToFocuesFitnessGoals: "",
	upcomingEventOrMilestone: "",

	// Lifestyle and prefernece
	preferedTrainingTime: "",
	daysAvailableForTraining: "",
	preferedTrainingType: "",
	preferedSessionType: "",

	// Additional Information
	workedWithPersonalTrainer: "",
	workedWithPersonalTrainerExperience: "",
	informationToTailorTrainingProgram: "",

	// consent
	termsAndConditions: [],
	consentForStoringPersonalInformation: [],
};

function PhysioFitnessForm() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// uncomment the below lines to upload the form data to firebase once the submit button is clicked and the responses passes all the validation rules.
	// const { user } = useAuth();
	// const userPhoneNumber = user.phoneNumber;

	const userPhoneNumber = "+917010962631";
	const [uploadError, setUplaodError] = useState(null);
	const [slotBookedAlready, setSlotBookedAlready] = useState(false);
	const [haveProfileValues, setHaveProfileValues] = useState(false);

	// uncomment the below lines to upload the form data to firebase once the submit button is clicked and the responses passes all the validation rules.
	const docRefFitness = useRef(doc(db, "physioFitness", userPhoneNumber));
	const docRefProfileInfo = useRef(
		doc(db, "profileInformation", userPhoneNumber),
	);

	// un comment the below line to hide the form for already filled in users
	const [storedFormValues] = useDocument(docRefFitness.current, {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

	const [storedProfileValues] = useDocument(docRefProfileInfo.current, {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

	const formik = useFormik({
		initialValues,

		onSubmit: (values) => {
			// console.log(values);
			// console.log(JSON.stringify(values));
			try {
				// uncomment the below lines to upload the form data to firebase once the submit button is clicked and the responses passes all the validation rules.
				setDoc(doc(db, "personalFitness", userPhoneNumber), values)
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

	// uncomment the below line to hide the form for already filled in users
	useEffect(() => {
		if (storedFormValues) {
			if (storedFormValues.exists()) {
				setSlotBookedAlready(true);
			}
		}
	}, [storedFormValues]);

	useEffect(() => {
		if (storedProfileValues) {
			if (storedProfileValues.exists()) {
				const data = storedProfileValues.data();
				// console.log(data);
				formik.setFieldValue("name", data.name);
				formik.setFieldValue("dob", data.dob);
				formik.setFieldValue("email", data.email);
				setHaveProfileValues(true);
			}
		}
	}, [storedProfileValues]);

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
				<section className="text-center mb-12">
					<h1 className="text-4xl font-bold">
						Online Personal Fitness Program
					</h1>
					<p className="mt-10 font-semibold">
						Elevate your fitness journey with our Online Personal Fitness
						Program, tailored specifically for you. Experience one-on-one
						training sessions with expert coach who are dedicated to helping you
						reach your unique fitness goals.
					</p>
					<p className="mt-7 font-semibold">
						Get a customized workout plan that suits your lifestyle, along with
						personalized nutrition guidance to maximize your results. Whether
						you're aiming to build muscle💪, lose weight🏃, or improve your
						overall health, we’ve got you covered —all from the comfort of your
						home. .
					</p>
				</section>
				{!slotBookedAlready && (
					<form className="mx-auto block max-w-[800px] p-2 pt-0">
						<h2
							className="text-2xl font-bold text-gray-400
                            mb-6"
						>
							Personal Information
						</h2>
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
						<h2
							className="text-2xl font-bold text-gray-400
                            mb-6 mt-20"
						>
							Medical History
						</h2>
						<OpenEnd
							type="text"
							questionId={"pastInjuriesOrMedicalConditions"}
							questionText={
								"Do you have any current or past injuries or medical conditions? Please describe:"
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"surgeriesRelatedToMuscloskeletal"}
							questionText={
								"Have you had any surgeries related to musculoskeletal issues? If yes, please specify:"
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"currentMedication"}
							questionText={
								"Are you currently taking any medications? If yes, please list them:"
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"knownAllergies"}
							questionText={
								"Do you have any known allergies? If yes, please specify:"
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"previouslyAttendedPhysicalTherapyOrRehab"}
							questionText={
								"Have you previously attended physical therapy or rehab for any conditions? If yes, please provide details:"
							}
							formik={formik}
						/>
						<h2
							className="text-2xl font-bold text-gray-400
                            mb-6 mt-20"
						>
							Pain and Discomfort
						</h2>
						<OpenEnd
							type="text"
							questionId={"painOrDiscomfortAreas"}
							questionText={
								"What specific areas are you experiencing pain or discomfort in? (e.g., lower back, neck, knees, shoulders, etc.):"
							}
							formik={formik}
						/>
						<Radio
							questionId={"currentPainLevel"}
							questionText={
								"On a scale of 1-10, how would you rate your current pain level?"
							}
							answers={[
								"1 - No Pain",
								"2 - Very Mild Pain",
								"3 - Mild Pain",
								"4 - Discomforting",
								"5 - Moderate Pain",
								"6 - Moderately Severe Pain",
								"7 - Severe Pain",
								"8 - Very Severe Pain",
								"9 - Excruciating Pain",
								"10 - Unbearable Pain",
							]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"painInteruptionInDailyActivity"}
							questionText={
								"Does the pain affect your daily activities? If yes, please explain:"
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"movementsThatExacerbatePain"}
							questionText={
								"What activities or movements exacerbate your pain?"
							}
							formik={formik}
						/>
						<h2
							className="text-2xl font-bold text-gray-400
                            mb-6 mt-20"
						>
							Current Fitness Level
						</h2>
						<Radio
							questionId={"currentFitnessLevel"}
							questionText={"How would you rate your current fitness level?"}
							answers={["Beginner", "Intermediate", "Advanced"]}
							formik={formik}
						/>
						<Radio
							questionId={"regularExerciseRoutine"}
							questionText={"Do you currently have a regular exercise routine?"}
							answers={["Yes", "No"]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"regularExerciseRoutineDescribe"}
							questionText={
								"If yes, please describe your current exercise routine:"
							}
							formik={formik}
							hide={!(formik.values.regularExerciseRoutine === "Yes")}
						/>
						<h2
							className="text-2xl font-bold text-gray-400
                            mb-6 mt-20"
						>
							Fitness Goals
						</h2>
						<Checkbox
							questionId={"fitnessGoals"}
							questionText={"What are your primary fitness goals?"}
							answers={[
								"Weight loss",
								"muscle gain",
								"improved endurance",
								"flexibility",
							]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"specifitAreaToFocuesFitnessGoals"}
							questionText={
								"Do you have any specific areas you want to focus on? (e.g., core strength, cardiovascular health, upper body strength, etc.)"
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"upcomingEventOrMilestone"}
							questionText={
								"Are there any upcoming events or milestones you are training for? (e.g., sports competition, athletic)"
							}
							formik={formik}
						/>
						<h2
							className="text-2xl font-bold text-gray-400
                            mb-6 mt-20"
						>
							Lifestyle and Preferences
						</h2>
						<Radio
							questionId={"preferedTrainingTime"}
							questionText={"What is your preferred training time?"}
							answers={["Morning", "Afternoon", "Evening"]}
							formik={formik}
						/>
						<OpenEnd
							type="number"
							questionId={"daysAvailableForTraining"}
							questionText={
								"How many days per week are you available for training sessions?"
							}
							formik={formik}
						/>
						<Radio
							questionId={"preferedTrainingType"}
							questionText={
								"Do you have any preferences for the type of training?"
							}
							answers={["HIIT", "Pilates", "CrossFit", "Dance Fitness"]}
							formik={formik}
						/>
						<Radio
							questionId={"preferedSessionType"}
							questionText={
								"Do you prefer virtual sessions, in-person sessions, or a mix of both?"
							}
							answers={["in-person", "sessions", "mix of both"]}
							formik={formik}
						/>
						<h2
							className="text-2xl font-bold text-gray-400
                            mb-6 mt-20"
						>
							Additional Information
						</h2>
						<Radio
							questionId={"workedWithPersonalTrainer"}
							questionText={"Have you worked with a personal trainer before?"}
							answers={["Yes", "No"]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"workedWithPersonalTrainerExperience"}
							questionText={"If yes, please share your experience:"}
							formik={formik}
							hide={!(formik.values.workedWithPersonalTrainer === "Yes")}
						/>
						<OpenEnd
							type="text"
							questionId={"informationToTailorTrainingProgram"}
							questionText={
								"Is there anything else we should know to help tailor your training program?"
							}
							formik={formik}
						/>
						<h2
							className="text-2xl font-bold text-gray-400
                            mb-6 mt-20"
						>
							Consent
						</h2>
						<Checkbox
							questionId={"termsAndConditions"}
							questionText={""}
							answers={[
								"I agree to the terms and conditions of the personal training program.",
							]}
							formik={formik}
						/>
						<Checkbox
							questionId={"consentForStoringPersonalInformation"}
							questionText={""}
							answers={[
								"I consent to having my personal information stored for the purpose of receiving training services. ",
							]}
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

export default PhysioFitnessForm;
