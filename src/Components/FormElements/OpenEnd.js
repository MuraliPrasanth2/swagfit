const OpenEnd = ({ type, questionId, questionText, formik }) => {
	return (
		<label className="flex flex-col mb-12">
			<span className="font-semibold">{questionText}</span>
			<input
				type={type}
				name={questionId}
				id={questionId}
				className="rounded-md text-white bg-black focus-visible:ring-fuchsia-500 focus:ring-2"
				onChange={formik.handleChange}
				value={formik.values[questionId]}
				onBlur={formik.handleBlur}
			/>
			{formik.touched[questionId] && formik.errors[questionId] ? (
				<span className="text-red-400">{formik.errors[questionId]}</span>
			) : null}
		</label>
	);
};

export default OpenEnd;
