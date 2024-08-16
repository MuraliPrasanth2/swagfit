// components
import OpenEnd from "../Components/FormElements/OpenEnd";
import Radio from "../Components/FormElements/Radio";
// import Checkbox from "../Components/FormElements/Checkbox";

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
		.min(2, "Name should contain at least 2 characters.")
		.max(30, "Name should not have more than 30 characters."),
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
	email: Yup.string("Please provide a valid email id.")
		.email("Please provide a valid email id.")
		.required("Please provide an email"),

	// Medical History
	currentMedicalConditions: Yup.string().required(
		"Please provide your answer.",
	),
	pastInjuries: Yup.string().required("Please provide your answer."),
	surgeries: Yup.string().required("Please provide your answer."),
	takingMedication: Yup.string().required("Please provide your answer."),
	medications: Yup.string().required("Please provide your answer."),
	knownAllergies: Yup.string().required("Please provide your answer."),
	previousPhysicalTherapy: Yup.string().required("Please provide your answer."),

	// Pain and Discomfort
	areasOfPain: Yup.string().required("Please provide your answer."),
	currentPainLevel: Yup.number()
		.min(1)
		.max(10)
		.required("Please rate your pain."),
	painAffectingDailyActivities: Yup.string().required(
		"Please provide your answer.",
	),
	exacerbatingActivities: Yup.string().required("Please provide your answer."),

	// Fitness Background
	priorFitnessExperience: Yup.string().required("Please provide your answer."),
	specificRehabExercises: Yup.string().required("Please provide your answer."),
	currentFitnessGoals: Yup.string().required("Please provide your answer."),
	exerciseFrequency: Yup.number()
		.min(1)
		.max(7)
		.required("Please provide your answer."),
	typesOfExercises: Yup.string().required("Please provide your answer."),

	// Specific Needs and Preferences
	specificAreasToRehabilitate: Yup.string().required(
		"Please provide your answer.",
	),
	challengingExercises: Yup.string().required("Please provide your answer."),
	trainingPreferences: Yup.string().required("Please provide your answer."),
	preferredTrainingDaysAndTimes: Yup.string().required(
		"Please provide your answer.",
	),

	// Lifestyle and Daily Activities
	occupation: Yup.string().required("Please provide your occupation."),
	occupationInvolvesPhysicalLabor: Yup.string().required(
		"Please provide your answer.",
	),
	hobbiesAndActivities: Yup.string().required("Please provide your answer."),

	// Additional Information
	additionalInformation: Yup.string().required("Please provide your answer."),
	concernsOrQuestions: Yup.string().required("Please provide your answer."),
});

const initialValues = {
	// Personal Information
	name: "",
	dob: "",
	gender: "",
	email: "",

	// Medical History
	currentMedicalConditions: "",
	pastInjuries: "",
	surgeries: "",
	takingMedication: "",
	medications: "",
	knownAllergies: "",
	previousPhysicalTherapy: "",

	// Pain and Discomfort
	areasOfPain: "",
	currentPainLevel: "",
	painAffectingDailyActivities: "",
	exacerbatingActivities: "",

	// Fitness Background
	priorFitnessExperience: "",
	specificRehabExercises: "",
	currentFitnessGoals: "",
	exerciseFrequency: "",
	typesOfExercises: "",

	// Specific Needs and Preferences
	specificAreasToRehabilitate: "",
	challengingExercises: "",
	trainingPreferences: "",
	preferredTrainingDaysAndTimes: "",

	// Lifestyle and Daily Activities
	occupation: "",
	occupationInvolvesPhysicalLabor: "",
	hobbiesAndActivities: "",

	// Additional Information
	additionalInformation: "",
	concernsOrQuestions: "",
};

function PhysioFitnessForm() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { user } = useAuth();
	const userPhoneNumber = user.phoneNumber;
	// const userPhoneNumber = "+917010962631";
	const [uploadError, setUplaodError] = useState(null);
	const [slotBookedAlready, setSlotBookedAlready] = useState(false);
	const [haveProfileValues, setHaveProfileValues] = useState(false);

	const docRefFitness = useRef(doc(db, "psysioFitness", userPhoneNumber));
	const docRefProfileInfo = useRef(
		doc(db, "profileInformation", userPhoneNumber),
	);

	const [storedFormValues, loadingStoredFormValues] = useDocument(
		docRefFitness.current,
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
			console.log(values);
			try {
				setDoc(doc(db, "psysioFitness", userPhoneNumber), values)
					.then(() => {})
					.catch((err) => {
						setUplaodError(
							"Your slot is not booked yet, please try again after sometime.",
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
						setUplaodError(
							"Your slot is not booked yet, please try again after sometime.",
						);
					});
			} catch (err) {
				setUplaodError(
					"Your slot is not booked yet, please try again after sometime.",
				);
			}
		},
		validationSchema: formSchema,
	});

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
				if (!haveProfileValues) {
					const data = storedProfileValues.data();
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
			<div className="text-center font-semibold bg-fuchsia-600 p-4 rounded-[3rem]">
				You have booked your slot for this program.
			</div>
		);
	};

	return (
		<div
			className="font-montserrat bg-black text-slate-50 bg-roundedStripesBlack min-h-screen"
			onSubmit={formik.handleSubmit}
		>
			<div className="max-w-4xl mx-auto pt-12 px-8">
				<section className="text-left mb-12">
					<h1 className="text-4xl font-bold">
						Physiotherapy personal training
					</h1>
					<p className="mt-10 font-semibold">
						Receive a tailored rehabilitation plan that aligns with your medical
						history, current condition, and future goals. Whether you're
						recovering from an injury, managing chronic pain, or looking to
						improve mobility, we’re here to support you every step of the
						way—all from the comfort of your home.
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
							type="date"
							questionId={"dob"}
							questionText={"Date of birth"}
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
							type="email"
							questionId={"email"}
							questionText={"Email Address"}
							formik={formik}
							disabled={haveProfileValues}
						/>
						{/* Medical History */}
						<h2 className="text-2xl font-bold text-gray-400 mb-6">
							Medical History
						</h2>
						<OpenEnd
							type="text"
							questionId={"currentMedicalConditions"}
							questionText={
								"Do you have any current medical conditions? (e.g., diabetes, hypertension, asthma, etc.)"
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"pastInjuries"}
							questionText={
								"Have you had any past injuries? If yes, please describe them."
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"surgeries"}
							questionText={
								"Have you had any surgeries? If yes, please describe them."
							}
							formik={formik}
						/>
						<Radio
							questionId={"takingMedication"}
							questionText={"Are you currently taking any medication?"}
							answers={["Yes", "No"]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"medications"}
							questionText={"If yes, please list the medications."}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"knownAllergies"}
							questionText={
								"Do you have any known allergies? If yes, please list them."
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"previousPhysicalTherapy"}
							questionText={
								"Have you ever undergone physical therapy or rehabilitation? If yes, please describe the reason and outcome."
							}
							formik={formik}
						/>
						{/* Pain and Discomfort */}
						<h2 className="text-2xl font-bold text-gray-400 mb-6">
							Pain and Discomfort
						</h2>
						<OpenEnd
							type="text"
							questionId={"areasOfPain"}
							questionText={
								"Are you experiencing any areas of pain or discomfort? If yes, please describe them."
							}
							formik={formik}
						/>
						<OpenEnd
							type="number"
							questionId={"currentPainLevel"}
							questionText={
								"On a scale of 1 to 10, how would you rate your current pain level?"
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"painAffectingDailyActivities"}
							questionText={
								"Is your pain affecting your daily activities? If yes, please describe how."
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"exacerbatingActivities"}
							questionText={
								"Are there any activities that exacerbate your pain? If yes, please describe them."
							}
							formik={formik}
						/>
						{/* Fitness Background */}
						<h2 className="text-2xl font-bold text-gray-400 mb-6">
							Fitness Background
						</h2>
						<OpenEnd
							type="text"
							questionId={"priorFitnessExperience"}
							questionText={
								"Do you have any prior fitness experience? If yes, please describe it."
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"specificRehabExercises"}
							questionText={
								"Are you currently doing any specific rehabilitation exercises? If yes, please describe them."
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"currentFitnessGoals"}
							questionText={
								"What are your current fitness goals? (e.g., weight loss, muscle gain, improve endurance, etc.)"
							}
							formik={formik}
						/>
						<OpenEnd
							type="number"
							questionId={"exerciseFrequency"}
							questionText={"How many days per week do you currently exercise?"}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"typesOfExercises"}
							questionText={
								"What types of exercises do you typically do? (e.g., running, weightlifting, yoga, etc.)"
							}
							formik={formik}
						/>
						{/* Specific Needs and Preferences */}
						<h2 className="text-2xl font-bold text-gray-400 mb-6">
							Specific Needs and Preferences
						</h2>
						<OpenEnd
							type="text"
							questionId={"specificAreasToRehabilitate"}
							questionText={
								"Are there any specific areas of your body you would like to rehabilitate or strengthen? If yes, please describe them."
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"challengingExercises"}
							questionText={
								"Are there any exercises that you find particularly challenging or uncomfortable? If yes, please describe them."
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"trainingPreferences"}
							questionText={
								"Do you have any preferences for your training sessions? (e.g., type of training, location, etc.)"
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"preferredTrainingDaysAndTimes"}
							questionText={
								"What are your preferred days and times for training sessions?"
							}
							formik={formik}
						/>
						{/* Lifestyle and Daily Activities */}
						<h2 className="text-2xl font-bold text-gray-400 mb-6">
							Lifestyle and Daily Activities
						</h2>
						<OpenEnd
							type="text"
							questionId={"occupation"}
							questionText={"What is your occupation?"}
							formik={formik}
						/>
						<Radio
							questionId={"occupationInvolvesPhysicalLabor"}
							questionText={"Does your occupation involve physical labor?"}
							answers={["Yes", "No"]}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"hobbiesAndActivities"}
							questionText={
								"What are your hobbies and recreational activities?"
							}
							formik={formik}
						/>
						{/* Additional Information */}
						<h2 className="text-2xl font-bold text-gray-400 mb-6">
							Additional Information
						</h2>
						<OpenEnd
							type="text"
							questionId={"additionalInformation"}
							questionText={
								"Is there any additional information you would like to provide?"
							}
							formik={formik}
						/>
						<OpenEnd
							type="text"
							questionId={"concernsOrQuestions"}
							questionText={
								"Do you have any concerns or questions about the program?"
							}
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
					<p className="text-red-500 text-center">{uploadError}</p>
				)}
			</div>
		</div>
	);
}

export default PhysioFitnessForm;
