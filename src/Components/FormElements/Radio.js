import { useId } from "react";

const Radio = ({ questionId, questionText, answers, formik }) => {
	const id = useId();

	return (
		<span
			className={"block mb-8 p-3 border-slate-800 border-2 rounded-md bg-black"}
		>
			<span className="font-semibold block">{questionText}</span>
			{formik.touched[questionId] && formik.errors[questionId] ? (
				<span className="text-red-400">{formik.errors[questionId]}</span>
			) : null}
			<span className="block mb-3"></span>
			{answers.map((answer, index) => {
				const elementId = id + index;
				return (
					<span className="flex mb-1 items-center" key={index}>
						<input
							type="radio"
							id={elementId}
							name={questionId}
							value={answer}
							className="mr-2 text-fuchsia-500 bg-black"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<label
							htmlFor={elementId}
							className="flex-grow cursor-pointer text-base"
						>
							{answer}
						</label>
					</span>
				);
			})}
		</span>
	);
};

export default Radio;
