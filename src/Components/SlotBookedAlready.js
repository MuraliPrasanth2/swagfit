import PaymentInfo from "./PaymentInfo";

const SlotBookedAlreadyMessage = ({ paymentInfo }) => {
	const paymentInfoToPass = paymentInfo || [];
	return (
		<>
			<div className="text-center font-semibold bg-fuchsia-600 p-4 rounded-[3rem]">
				You have booked your slot for this program.
			</div>
			<h3 className="text-center mt-8 font-bold">Payment Details:</h3>
			<PaymentInfo paymentInfo={paymentInfoToPass} />
		</>
	);
};

export default SlotBookedAlreadyMessage;
