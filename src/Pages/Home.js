// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FAQAccordion from "../Components/FAQAccordian";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
// import expertTrainersImage from "../images/expertTrainers.jpg";
import flexibleShedulingImage from "../images/flexibleSheduling.jpg";
// import communitySupportImage from "../images/community support.jpg";
import heroImage from "../images/heroImage.png";
import useSlideInOnScroll from "../Hooks/useSlideOnScroll";
import Disclaimer from "../Components/Disclaimer";

const Home = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

    useSlideInOnScroll();
    useGSAP(() => {
        gsap.fromTo(
            ".reveal-from-below",
            {
                y: 100,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                stagger: 0.4,
                duration: 1,
                ease: "power4.out",
            },
        );

        // gsap.fromTo(
        //     ".hidden-reveal",
        //     {
        //         visibility: "hidden",
        //     },
        //     {
        //         visibility: "visible",
        //         duration: 7,
        //     },
        // );
        //
        // gsap.fromTo(
        //     ".reveal-from-left",
        //     {
        //         x: -700,
        //         opacity: 0,
        //     },
        //     {
        //         x: 0,
        //         opacity: 1,
        //         stagger: 0.05,
        //         duration: 0.2,
        //         ease: "power4.out",
        //     },
        // );
    });

    return (
        <main className="bg-black text-white show4" id="main">
            <div className="max-w-7xl mx-auto">
                <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen max-h-screen max-w-screen overflow-x-hidden font-montserrat hero">
                    <div className="col-start-1 row-start-1 md:col-start-2 max-w-screen z-[6] bg-black background-image">
                        <img
                            alt=""
                            src={heroImage}
                            className="h-full max-h-screen object-cover"
                        />
                    </div>
                    <div className="col-start-1 row-start-1 max-w-screen z-[7] bg-[rgba(0,_0,_0,_0.8)] background-overlay"></div>
                    <div
                        className="col-start-1 row-start-1 max-w-screen z-[8] content p-8 pt-0"
                        id="#content"
                    >
                        <h1 className="text-[3rem] md:text-[4rem] lg:text-[5rem] text-[rgba(255,_255,_255,_0.6)] mb-12 leading-[0.8] font-normal main-text reveal-from-below">
                            Unleash Your{" "}
                            <span className="font-semibold no-underline whitespace-nowrap bg-clip-text animate-gradientText bg-[linear-gradient(to_right,_#4d4d4d_0,_white_10%,_#4d4d4d_20%)] text-transparent [animation-fill-mode:forwards] shining-text">
                                Potential!
                            </span>
                        </h1>
                        <h2 className="text-[1.5rem] md:text-[2.5rem] lg:text-[3rem] text-[rgba(255_,255,_255,_0.6)] mb-12 font-normal main-sub-text clip-text-full reveal-from-below leading-7 md:leading-[2.5rem] lg:leading-[3rem]">
                            Elevate Your Fitness Routine with Expert-Led{" "}
                            <span className="text-[rgba(255_,255,_255,_0.8)] bright-text gradient-text font-semibold">
                                HIIT
                            </span>
                            , {""}
                            <span className="text-[rgba(255_,255,_255,_0.8)] bright-text gradient-text font-semibold">
                                Dance
                            </span>
                            , and{" "}
                            <span className="text-[rgba(255_,255,_255,_0.8)] bright-text gradient-text font-semibold">
                                Pilates
                            </span>
                            –{" "}
                            <span className="text-[rgba(255_,255,_255,_0.8)] bright-text gradient-text font-semibold">
                                Anytime
                            </span>
                            ,{" "}
                            <span className="text-[rgba(255_,255,_255,_0.8)] bright-text gradient-text font-semibold">
                                Anywhere!
                            </span>
                        </h2>
                        <p className="text-[1rem] md:text-[1.1rem] lg:text-[1.3rem] mb-10 text-[rgba(255_,255,_255,_0.8)] sub-text bright-text reveal-from-below leading-6">
                            {" "}
                            Welcome to Swag Fit, where fitness meets flexibility. Our online
                            program provides a diverse range of live classes led by top-notch
                            trainers. Whether you want to torch calories with HIIT, groove to
                            energizing dance beats, or build core strength with Pilates, we’ve
                            got you covered.{" "}
                        </p>
                        <div
                            className="button-rainbow-container reveal-from-below"
                            onClick={() => {
                                navigate("/book");
                            }}
                        >
                            <button className="button-rainbow">
                                Start Your Fitness Journey Today!
                            </button>
                        </div>
                    </div>
                </section>
                <section className="font-montserrat text-[rgba(255,_255,_255,_0.8)] p-8 all-sections">
                    <section className="what-we-do mb-20 slideIn">
                        <h3 className="text-[2rem] italic uppercase text-center mt-6 mb-8 font-bold section-title">
                            What we do
                        </h3>
                        <div className="gradient-line"></div>
                        <p className="mt-[1.3rem] font-medium leading-6 text-left mb-9 section-info md:text-left">
                            At Swag Fit, we revolutionize your fitness journey by combining
                            expert guidance, flexibility, and community support. Our
                            comprehensive online program offers a dynamic mix of live and
                            on-demand classes, featuring high-intensity HIIT, exhilarating
                            dance fitness, and core-strengthening Pilates—all designed to fit
                            seamlessly into your busy lifestyle.
                        </p>
                        <div
                            className="block mx-auto center-block"
                            onClick={() => {
                                navigate("/book");
                            }}
                        >
                            <button className="mx-auto border-white border-2 join-now-button">
                                Join now
                            </button>
                        </div>
                    </section>

                    <section className="workout-structure mb-20 slideIn">
                        <h3 className="text-[2rem] italic uppercase text-center mt-6 mb-8 font-bold section-title">
                            Workout Structure
                        </h3>
                        <div className="gradient-line"></div>
                        <p className="mt-[1.3rem] font-medium leading-6 text-left mb-9 section-info">
                            Your program includes 6 sessions per week, offering a diverse mix
                            of exercises to keep you engaged and help you achieve balanced
                            fitness. Each week, you'll participate in:
                        </p>
                        <ul className="list-disc pl-8 text-left mb-9">
                            <li className="mb-6">
                                <span className="font-semibold text-[1.2rem]">
                                    2 High-Intensity Interval Training (HIIT) Sessions:
                                </span>
                                <span className="block mt-2 text-[1rem] sr-only">
                                    Designed to maximize calorie burn and build endurance through
                                    short bursts of intense exercise.
                                </span>
                            </li>
                            <li className="mb-6">
                                <span className="font-semibold text-[1.2rem]">
                                    2 Pilates Sessions:
                                </span>
                                <span className="block mt-2 text-[1rem] sr-only">
                                    Focused on improving core strength, flexibility, and overall
                                    body conditioning.
                                </span>
                            </li>
                            <li className="mb-6">
                                <span className="font-semibold text-[1.2rem]">
                                    2 Dance Fitness Sessions:
                                </span>
                                <span className="block mt-2 text-[1rem] sr-only">
                                    A fun and energetic way to enhance cardiovascular health and
                                    tone muscles while enjoying upbeat music.
                                </span>
                            </li>
                        </ul>
                        <div
                            className="block mx-auto center-block"
                            onClick={() => {
                                navigate("/book");
                            }}
                        >
                            <button className="mx-auto border-white border-2 join-now-button">
                                Join now
                            </button>
                        </div>
                    </section>
                    <section className="relative mb-12 benifit-item slideIn">
                        <div className="w-full overflow-hidden benifit-item-image-container sr-only">
                            <img
                                src={flexibleShedulingImage}
                                alt="muscle toning"
                                className="w-full h-auto"
                            />
                        </div>
                        <h4 className="text-[2rem] italic uppercase text-center mt-6 mb-8 font-bold section-title">
                            Flexible Scheduling
                        </h4>

                        <div className="gradient-line"></div>
                        <p className="mt-5 font-medium leading-6 mb-9 benifit-item-content">
                            Missed the morning session? No worries! With our flexible
                            scheduling, you can easily join an afternoon or evening class. Our
                            program runs 6 days a week with 2 days each of Pilates, HIIT, and
                            Dance Fitness, so you never miss a workout and can effortlessly
                            fit fitness into your busy lifestyle.
                        </p>
                        <div
                            className="block mx-auto center-block"
                            onClick={() => {
                                navigate("/book");
                            }}
                        >
                            <button className="mx-auto border-white border-2 join-now-button">
                                Join now
                            </button>
                        </div>
                    </section>
                    <section className="featured-workouts slideIn">
                        <h2 className="text-[2rem] italic uppercase text-center mt-6 mb-8 font-bold section-title">
                            Featured Workouts
                        </h2>
                        <div className="gradient-line"></div>
                        <div className="workout-container grid grid-cols-1 mt-12 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
                            <div
                                className="workout-item p-6 rounded-lg shadow-lg slideIn"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
                                }}
                            >
                                <h3 className="workout-title text-[1.5rem] font-semibold mb-4 text-white">
                                    HIIT Workouts
                                </h3>
                                <p className="workout-description text-[1rem] text-gray-100 leading-6">
                                    HIIT (High-Intensity Interval Training) delivers maximum
                                    results in minimal time. Alternate between intense bursts of
                                    exercise and brief recovery periods to boost metabolism, burn
                                    calories, and build endurance, making it perfect for an
                                    effective and efficient workout.
                                </p>
                            </div>

                            <div
                                className="workout-item p-6 rounded-lg shadow-lg slideIn"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                                }}
                            >
                                <h3 className="workout-title text-[1.5rem] font-semibold mb-4 text-white">
                                    Pilates
                                </h3>
                                <p className="workout-description text-[1rem] text-gray-100 leading-6">
                                    Pilates provides a low-impact workout focused on core
                                    strength, flexibility, and overall body conditioning. Through
                                    controlled movements and mindful breathing, it enhances
                                    posture, balance, and muscle tone, suitable for all fitness
                                    levels.
                                </p>
                            </div>

                            <div
                                className="workout-item p-6 rounded-lg shadow-lg md:col-span-2 lg:col-span-1 slideIn"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
                                }}
                            >
                                <h3 className="workout-title text-[1.5rem] font-semibold mb-4 text-white">
                                    Dance Fitness
                                </h3>
                                <p className="workout-description text-[1rem] text-gray-100 leading-6">
                                    Dance Fitness blends fun, energetic routines with a full-body
                                    workout. Perfect for all skill levels, it improves
                                    cardiovascular health, tones muscles, and lifts your mood,
                                    transforming exercise into an exciting and enjoyable
                                    experience.
                                </p>
                            </div>
                        </div>
                    </section>
                    <div
                        className="button-rainbow-container center-block mt-8 !block w-fit mx-auto"
                        onClick={() => {
                            navigate("/book");
                        }}
                    >
                        <button className="button-rainbow">
                            Start Your Fitness Journey Today!
                        </button>
                    </div>
                    <section className="meet-experts py-12 text-white slideIn">
                        <h3 className="text-[2rem] italic uppercase text-center mt-6 mb-8 font-bold section-title">
                            Meet Our Experts:
                        </h3>
                        <div className="gradient-line"></div>
                        <div className="experts-container grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                            <div className="expert-item bg-gray-950 p-6 rounded-lg shadow-lg border border-gray-700 slideIn">
                                <h3 className="expert-name text-[1.5rem] font-semibold mb-4 text-white">
                                    Gokilaselvam
                                </h3>
                                <p className="expert-description text-[1rem] text-gray-300 mb-6">
                                    Gokilaselvam, our certified trainer, excels in high-intensity
                                    CrossFit workouts. Her dynamic sessions are designed to
                                    enhance cardio and strength endurance while managing weight
                                    effectively. With Gokilaselvam’s expert guidance, you'll push
                                    your limits and achieve peak fitness.
                                </p>
                                <h4 className="text-white text-[1.2rem] font-semibold mb-2">
                                    Why Train with Gokilaselvam?
                                </h4>
                                <ul className="list-disc pl-6 text-gray-300 text-[1rem] leading-6">
                                    <li>
                                        Personalized Attention: Tailored workouts to meet your
                                        unique needs.
                                    </li>
                                    <li>
                                        One-on-One Sessions: Private training available for a more
                                        customized approach.
                                    </li>
                                    <li>
                                        Motivation: Stay inspired with Gokilaselvam’s enthusiastic
                                        coaching.
                                    </li>
                                    <li>
                                        Correct Form: Ensure safe and effective exercise with
                                        professional guidance.
                                    </li>
                                    <li>
                                        Progress Tracking: Monitor improvements and stay on track
                                        with your fitness journey.
                                    </li>
                                </ul>
                                <div
                                    className="block mx-auto center-block mt-12"
                                    onClick={() => {
                                        navigate("/book");
                                    }}
                                >
                                    <button className="mx-auto border-white border-2 join-now-button !bg-gray-950">
                                        Join now
                                    </button>
                                </div>
                            </div>

                            <div className="expert-item bg-gray-950 p-6 rounded-lg shadow-lg border border-gray-700 slideIn">
                                <h3 className="expert-name text-[1.5rem] font-semibold mb-4 text-white">
                                    Sowndharya
                                </h3>
                                <p className="expert-description text-[1rem] text-gray-300 mb-6">
                                    Sowndhraya, our dedicated physiotherapist, specializes in
                                    Pilates to help you enhance flexibility, strengthen your core,
                                    and recover from injuries. Her expert guidance ensures
                                    personalized attention to achieve your fitness and
                                    rehabilitation goals.
                                </p>
                                <h4 className="text-white text-[1.2rem] font-semibold mb-2">
                                    Sowndharya's Specialties:
                                </h4>
                                <ul className="list-disc pl-6 text-gray-300 text-[1rem] leading-6">
                                    <li>
                                        Improved Flexibility: Enhance muscle strength and tone,
                                        especially in core areas.
                                    </li>
                                    <li>
                                        Personalized Sessions: One-on-one training tailored to your
                                        needs.
                                    </li>
                                    <li>
                                        Musculoskeletal Rehabilitation: Comprehensive treatments to
                                        regain strength and mobility.
                                    </li>
                                    <li>
                                        Injury Management: Supportive training to aid recovery and
                                        restore full function.
                                    </li>
                                </ul>
                                <div
                                    className="block mx-auto center-block mt-12 lg:mt-[6.5rem]"
                                    onClick={() => {
                                        navigate("/book");
                                    }}
                                >
                                    <button className="mx-auto border-white border-2 join-now-button !bg-gray-950">
                                        Join now
                                    </button>
                                </div>
                            </div>

                            <div className="expert-item bg-gray-950 p-6 rounded-lg shadow-lg border border-gray-700 slideIn">
                                <h3 className="expert-name text-[1.5rem] font-semibold mb-4 text-white">
                                    Rohit Varma
                                </h3>
                                <p className="expert-description text-[1rem] text-gray-300 mb-6">
                                    Rohit Varma, our expert dance fitness instructor, specializes
                                    in hip hop, freestyle, and dance fitness. Join his classes to
                                    boost cardiovascular health, muscle strength, balance, and
                                    coordination.
                                </p>
                                <h4 className="text-white text-[1.2rem] font-semibold mb-2">
                                    Rohit Specialties:
                                </h4>
                                <ul className="list-disc pl-6 text-gray-300 text-[1rem] leading-6">
                                    <li>
                                        Hip Hop: Encourages self-expression and creativity with
                                        fluid movements.
                                    </li>
                                    <li>
                                        Freestyle Dancing: Improves body awareness, rhythm, and
                                        stamina.
                                    </li>
                                    <li>
                                        Dance Fitness: Engaging workouts designed to keep you fit
                                        and motivated.
                                    </li>
                                    <li>
                                        One-on-One Training: Personalized online sessions tailored
                                        to your fitness goals with Rohit’s dynamic coaching style.
                                    </li>
                                </ul>
                                <div
                                    className="block mx-auto center-block mt-12 lg:mt-[8rem]"
                                    onClick={() => {
                                        navigate("/book");
                                    }}
                                >
                                    <button className="mx-auto border-white border-2 join-now-button !bg-gray-950">
                                        Join now
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className="button-rainbow-container center-block mt-8 !block w-fit mx-auto"
                            onClick={() => {
                                navigate("/book");
                            }}
                        >
                            <button className="button-rainbow">
                                Start Your Fitness Journey Today!
                            </button>
                        </div>
                    </section>
                    <section className="how-it-works mt-16 slideIn">
                        <h3 className="text-[2rem] italic uppercase text-center mt-6 mb-8 font-bold section-title">
                            How It Works
                        </h3>
                        <div className="gradient-line"></div>
                        <ul className="list-none mt-8 steps">
                            <li className="step">
                                <h4 className="font-normal text-[1.3rem] italic mb-4 step-title">
                                    Step 1: Sign Up
                                </h4>
                                <p className="mb-8 pl-8 step-info">
                                    Register for our program by clicking on the "start your
                                    fitness journey" or "join now" button and by providing your
                                    basic information, including your full name, age, email
                                    address, and phone number. Let us know your primary fitness
                                    goals, such as weight loss, improved endurance, or general
                                    fitness. This information helps us tailor the program to meet
                                    your specific needs.
                                </p>
                            </li>
                            <li className="step">
                                <h4 className="font-normal text-[1.3rem] italic mb-4 step-title">
                                    Step 2: Get Ready
                                </h4>
                                <p className="mb-8 pl-8 step-info">
                                    Prepare for your fitness journey by ensuring you have access
                                    to a pair of dumbbells. Make sure you have a reliable internet
                                    connection to participate in our live sessions. No prior
                                    experience with CrossFit or high-intensity workouts is
                                    necessary; our program is designed for all fitness levels.
                                </p>
                            </li>
                            <li className="step">
                                <h4 className="font-normal text-[1.3rem] italic mb-4 step-title">
                                    Step 3: Join Sessions
                                </h4>
                                <p className="mb-8 pl-8 step-info">
                                    Participate in our scheduled online workouts from the comfort
                                    of your home. Each workout is led by experienced instructor
                                    who will guide you through each exercise, ensuring proper form
                                    and technique.
                                </p>
                            </li>
                            <li className="step">
                                <h4 className="font-normal text-[1.3rem] italic mb-4 step-title">
                                    Step 4: Track Progress
                                </h4>
                                <p className="mb-8 pl-8 step-info">
                                    Monitor your progress by setting personal fitness goals and
                                    tracking your achievements. Share your milestones with our
                                    community to stay motivated and inspired. Regularly
                                    participating in our program will help you see tangible
                                    results, boosting your confidence and commitment to your
                                    fitness journey.
                                </p>
                            </li>
                        </ul>
                        <div
                            className="button-rainbow-container center-block !block w-fit mx-auto"
                            onClick={() => {
                                navigate("/book");
                            }}
                        >
                            <button className="button-rainbow">
                                Start Your Fitness Journey Today!
                            </button>
                        </div>
                    </section>
                    <FAQAccordion />
                    <Disclaimer />
                </section>
            </div>
        </main>
    );
};

export default Home;
