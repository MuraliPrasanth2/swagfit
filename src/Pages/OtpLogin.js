import { auth } from "../firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useEffect, useState, useTransition } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "../Components/ui/input-otp";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "libphonenumber-js/mobile";
// import { collection, doc } from "firebase/firestore";
// import { useCollection, useDocument } from "react-firebase-hooks/firestore";

//inside project imports
// import { db } from "../firebase/config";
import { useAuth } from "../Contexts/AuthProvider";

function OtpLogin() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // const [value, loading, collectionError] = useCollection(
    //     collection(db, "booking"),
    // );
    // console.log("value", value);
    // console.log("loading", loading);
    // console.log("collectinError", collectionError);
    // if (value) {
    //     console.log("value.docs", value.docs);
    //     value.forEach((doc) => {
    //         console.log(doc.id);
    //         console.log(doc.data());
    //     });
    // }

    // const [value, loading, docError] = useDocument(doc(db, "booking", "gokila"));
    // console.log("value", value);
    // console.log("loading", loading);
    // console.log("docError", docError);
    // if (value) {
    //     console.log("value.exists()", value.exists());
    //     console.log({ id: value.id, ...value.data() });
    // }

    //handling routing from login to other pages if the user is already logged in.
    const { user } = useAuth();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("redirect");
    const navigate = useNavigate();

    if (user && redirectPath) {
        navigate(redirectPath);
    }

    if (user && !redirectPath) {
        navigate("/");
    }

    //actial login logic and its code
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isValidNumber, setIsValidNumber] = useState(null);
    const [isPhoneNubmerTouched, setIsPhoneNubmerTouched] = useState(false);
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const [resendCountdown, setResendCountdown] = useState(0);

    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

    const [confirmationResult, setConfirmationResult] = useState(null);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        let timer;
        if (resendCountdown > 0) {
            timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendCountdown]);

    useEffect(() => {
        let recaptchaVerifier;
        if (!user) {
            recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
            });

            setRecaptchaVerifier(recaptchaVerifier);
        }

        return () => {
            if (!user) {
                recaptchaVerifier.clear();
            }
        };
    }, [setRecaptchaVerifier, user]);

    useEffect(() => {
        const verifyOtp = async () => {
            startTransition(async () => {
                setError("");

                if (!confirmationResult) {
                    setError("Please request OTP first.");
                    return;
                }

                try {
                    await confirmationResult?.confirm(otp);
                    // navigate("/");
                } catch (error) {
                    console.log(error);
                    setError("Failed to verify OTP. Please check the OTP.");
                }
            });
        };

        const hasEnteredAllDigits = otp.length === 6;
        if (hasEnteredAllDigits) {
            verifyOtp();
        }
    }, [otp, confirmationResult, navigate, setError]);

    const requestOtp = async (e) => {
        if (e) {
            e.preventDefault();
        }

        setResendCountdown(60);

        startTransition(async () => {
            setError("");

            if (!recaptchaVerifier) {
                return setError("RecaptchaVerifier is not initialized.");
            }

            try {
                const confirmationResult = await signInWithPhoneNumber(
                    auth,
                    phoneNumber,
                    recaptchaVerifier,
                );

                setConfirmationResult(confirmationResult);
                setSuccess("OTP sent successfully.");
            } catch (err) {
                console.log(err);
                setResendCountdown(0);

                if (err.code === "auth/invalid-phone-number") {
                    setError("Invalid phone number. Please check the number.");
                } else if (err.code === "auth/too-many-requests") {
                    setError("Too many requests. Please try again later.");
                } else {
                    setError("Failed to send OTP. Please try again.");
                }
            }
        });
    };

    const handlePhoneNumberInputBlur = () => {
        setIsPhoneNubmerTouched(true);
    };
    const loadingIndicator = (
        <div role="status" className="flex justify-center">
            <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );

    useEffect(() => {
        try {
            if (isValidPhoneNumber(phoneNumber)) {
                setIsValidNumber(true);
            } else {
                setIsValidNumber(false);
            }
        } catch (err) {
            console.log("Please enter a number not a string");
        }
    }, [phoneNumber, isPhoneNubmerTouched]);

    const isButtonDisabled =
        !phoneNumber || isPending || resendCountdown > 0 || !isValidNumber;
    if (user) {
        return (
            <div>
                You will be redirected to {redirectPath ? redirectPath : "home"}.
            </div>
        );
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center bg-black h-screen text-white font-montserrat bg-roundedStripesBlack">
                {!confirmationResult && (
                    <form onSubmit={requestOtp}>
                        <PhoneInput
                            className="[&>input]:color-white [&>input]:bg-black [&>input]:rounded-md [&_select]:bg-black"
                            defaultCountry="IN"
                            placeholder="Enter mobile number"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                            onBlur={handlePhoneNumberInputBlur}
                        />
                        {!isValidNumber && isPhoneNubmerTouched ? (
                            <div className="text-red-700 text-center">
                                Invalid phone number
                            </div>
                        ) : null}
                    </form>
                )}

                {confirmationResult && (
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                )}

                <button
                    disabled={isButtonDisabled}
                    onClick={() => requestOtp()}
                    className={
                        "mt-5 font-semibold bg-cyan-950 px-5 py-2 rounded-md disabled:bg-slate-700 "
                    }
                >
                    {resendCountdown > 0
                        ? `Resend OTP in ${resendCountdown}`
                        : isPending
                            ? "Sending OTP"
                            : "Send OTP"}
                </button>

                <div className="p-10 text-center">
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                </div>

                <div id="recaptcha-container" />

                {isPending && loadingIndicator}
            </div>
        </>
    );
}

export default OtpLogin;
