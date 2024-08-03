import "./App.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import Dropdown from "./Components/FormElements/Dropdown";
import OpenEnd from "./Components/FormElements/OpenEnd";
import Checkbox from "./Components/FormElements/Checkbox";
import Radio from "./Components/FormElements/Radio";

const formSchema = Yup.object().shape({
    name: Yup.string()
        .required("Please provide a name.")
        .min(2, "name should contain at least 2 characters.")
        .max(30, "name sshould not have more than 30 characters."),
    gender: Yup.string().required("Please select your gender."),
    age: Yup.number("Age must be a number")
        .positive("age must be a positive value.")
        .required("Please provide your age.")
        .min(1, "Age must be greater than or equal to 1"),
    email: Yup.string("Please provide a valid email id.")
        .email("Please provide a valid email id.")
        .required("Please provide an email"),
    phoneNumber: Yup.number("Phone number must be a number")
        .required("Please provide a phone number")
        .test("len", "Phone number should be 10 digits long", (val) => {
            return val.toString().length === 10;
        }),
    occupation: Yup.string().required("Please specify your occupation."),
    address: Yup.string().required("Please provide your answer."),
    timing: Yup.string().required("Please select a slot"),
    fitnessProgramNames: Yup.string().required("Please provide an answer."),
    fitnessGoals: Yup.array().min(1, "Please select your fitness goals."),
    priorFitnessExperience: Yup.string().required("Please provide your answer."),
    medicalConditions: Yup.string().required("Please provide your answer."),
    basicEquipment: Yup.string().required("Please provide your answer."),
});

function App() {
    const formik = useFormik({
        initialValues: {
            name: "",
            gender: "",
            age: "",
            email: "",
            phoneNumber: "",
            occupation: "",
            address: "",
            timing: "",
            fitnessProgramNames: "",
            fitnessGoals: [],
            priorFitnessExperience: "",
            medicalConditions: "",
            basicEquipment: "",
        },
        onSubmit: (values) => {
            console.log(values);
            console.log(JSON.stringify(values, null, 2));
        },
        validationSchema: formSchema,
    });
    return (
        <div
            className="font-montserrat bg-black text-slate-50 "
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
            </div>
            <form className="mx-auto block max-w-[800px] p-8 pt-0">
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
                    questionText={"What is your name?"}
                    formik={formik}
                />
                <Radio
                    questionId={"gender"}
                    questionText={"What is your gender?"}
                    answers={["Male", "Female", "Other"]}
                    formik={formik}
                />
                <OpenEnd
                    type="number"
                    questionId={"age"}
                    questionText={"What is your age?"}
                    formik={formik}
                />
                <OpenEnd
                    type="email"
                    questionId={"email"}
                    questionText={"What is your email id?"}
                    formik={formik}
                />
                <OpenEnd
                    type="number"
                    questionId={"phoneNumber"}
                    questionText={"What is your phone number?"}
                    formik={formik}
                />
                <OpenEnd
                    type="text"
                    questionId={"occupation"}
                    questionText={"What is your current occupation?"}
                    formik={formik}
                />
                <OpenEnd
                    type="text"
                    questionId={"address"}
                    questionText={"Please specify your location(city, area name)."}
                    formik={formik}
                />
                <Checkbox
                    questionId={"fitnessGoals"}
                    questionText={"What are your primary fitness goals?"}
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
                <div className="text-center">
                    <div className="button-rainbow-container mx-auto mt-9 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:block hover:before:blur-lg active:before:blur-lg z-[1] before:-z-10">
                        <button type="submit" className="button-rainbow z-[3]">
                            Book a slot
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default App;
