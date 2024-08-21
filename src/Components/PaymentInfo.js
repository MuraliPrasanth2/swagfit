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
		<div className="overflow-x-auto">
			{!sortedPayments.length ? (
				<div className="text-gray-400 mt-2 text-center">
					No payment info available for this slot.
				</div>
			) : (
				<table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
					<thead className="bg-gray-100">
						<tr className="text-left border-b">
							<th className="py-3 px-6 font-semibold text-gray-600">From</th>
							<th className="py-3 px-6 font-semibold text-gray-600">To</th>
							<th className="py-3 px-6 font-semibold text-gray-600">Amount</th>
						</tr>
					</thead>
					<tbody>
						{sortedPayments.map((payment, index) => {
							let textColor = "text-gray-600"; // default for past dates
							if (isCurrent(payment.from, payment.to)) {
								textColor = "text-green-500";
							} else if (isFuture(payment.from)) {
								textColor = "text-green-300";
							}

							return (
								<tr
									key={index}
									className={`border-b hover:bg-gray-50 ${textColor} font-semibold`}
								>
									<td className="py-3 px-6">
										{dayjs(payment.from).format("DD/MM/YY")}
									</td>
									<td className="py-3 px-6">
										{dayjs(payment.to).format("DD/MM/YY")}
									</td>
									<td className="py-3 px-6">{payment.amount}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default PaymentInfo;
