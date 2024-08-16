const OpenEnd = ({
    type,
    questionId,
    questionText,
    formik,
    disabled,
    hide,
    ...restProps
}) => {
    return (
        <label className={`flex flex-col mb-12 ${hide ? "hidden" : ""}`}>
            <span className="font-semibold mb-2">{questionText}</span>
            <input
                type={type}
                name={questionId}
                id={questionId}
                className="rounded-md text-white bg-black focus-visible:ring-fuchsia-500 focus:ring-2"
                onChange={formik.handleChange}
                value={formik.values[questionId]}
                onBlur={formik.handleBlur}
                disabled={disabled}
                {...restProps}
            />
            {formik.touched[questionId] && formik.errors[questionId] ? (
                <span className="text-red-400">{formik.errors[questionId]}</span>
            ) : null}
        </label>
    );
};

export default OpenEnd;
