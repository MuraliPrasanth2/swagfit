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
    const [storedFormValues] = useDocument(docRefGroupFitness.current, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

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

    const formik = useFormik({
        initialValues,

        onSubmit: (values) => {
            // console.log(values);
            // console.log(JSON.stringify(values));
            try {
                // uncomment the below lines to upload the form data to firebase once the submit button is clicked and the responses passes all the validation rules.
                setDoc(doc(db, "groupFitness", userPhoneNumber), values)
                    .then(() => { })
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
                    .then(() => { })
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
                    <h1 className="text-4xl font-bold">Online Group Fitness Program!</h1>
                    <p className="mt-10 font-semibold">
                        Join us to transform your fitness journey with the best in the
                        industry. Our expert trainers bring passion and experience to every
                        session, ensuring you achieve your fitness goals.
                    </p>
                    <p className="mt-7 font-semibold">
                        Enjoy a diverse range of workouts, including high-intensity
                        CrossFit🏋, Pilates🧎, and dance🕺 fitness, all designed to enhance
                        your strength, flexibility, and overall well-being.
                    </p>
                </section>
                {!slotBookedAlready && (
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
