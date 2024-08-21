import React from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const PaymentInfo = ({ paymentInfo }) => {
	const isCurrent = (from, to) =>
		dayjs().isBetween(dayjs(from), dayjs(to), "day", "[]");

	const isFuture = (date) => dayjs().isBefore(dayjs(date), "day");

	const sortedPayments = [...paymentInfo].sort((a, b) =>
		dayjs(a.from).isBefore(dayjs(b.from)) ? -1 : 1,
	);

	return (
		<div>
			{!sortedPayments.length && (
				<div className="text-gray-400 mt-2 text-center">
					No payment info available for this slot.
				</div>
			)}
			{sortedPayments.length > 0 && (
				<ul className="mt-1 space-y-1 text-center p-4 bg-black">
					<li
						className={`rounded-sm text-white text-sm mt-2 flex justify-between items-center`}
					>
						<span className="inline-block font-semibold">From</span>
						<span className="inline-block font-semibold">To</span>
						<span className="inline-block font-semibold">Amount</span>
					</li>
					{sortedPayments.map((payment, index) => {
						let textColor = "text-gray-500"; // default for past dates
						if (isCurrent(payment.from, payment.to)) {
							textColor = "text-green-400";
						} else if (isFuture(payment.from)) {
							textColor = "text-green-100";
						}

						return (
							<li
								key={index}
								className={`rounded-sm ${textColor} text-sm mt-2 flex justify-between items-center`}
							>
								<span className="inline-block">
									{dayjs(payment.from).format("YY-MMM-D")}
								</span>
								<span className="inline-block">
									{dayjs(payment.to).format("YY-MMM-D")}
								</span>

								<span className="inline-block"> {payment.amount}</span>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default PaymentInfo;
