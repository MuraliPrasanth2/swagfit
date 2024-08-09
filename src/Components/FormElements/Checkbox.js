import { useId } from "react";

const Checkbox = ({ questionId, questionText, answers, formik }) => {
	const id = useId();
	return (
		<span className="block mb-9 p-3 border-slate-800 border-2 rounded-md bg-black">
			<span className="font-semibold block mb-2">
				{questionText}
				<span className="block font-normal">
					{formik.touched[questionId] && formik.errors[questionId] ? (
						<span className="text-red-400">{formik.errors[questionId]}</span>
					) : null}
				</span>
			</span>
			{answers.map((answer, index) => {
				const answerId = id + index;
				return (
					<span className="block mb-1" key={index}>
						<input
							type="checkbox"
							id={answerId}
							name={questionId}
							value={answer}
							className="mr-2 text-fuchsia-500 bg-black"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor={answerId} className="cursor-pointer">
							{answer}
						</label>
					</span>
				);
			})}
		</span>
	);
};

export default Checkbox;
