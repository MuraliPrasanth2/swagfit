import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    // 	window.scrollTo(0, 0);
    // }, []);

    useEffect(() => {
        const accordions = document.querySelectorAll(".accordion");

        accordions.forEach((accordion, index) => {
            const header = accordion.querySelector(".accordion__header");
            const content = accordion.querySelector(".accordion__content");

            header.addEventListener("click", () => {
                const isOpen = content.style.height === `${content.scrollHeight}px`;
                accordions.forEach((a, i) => {
                    const c = a.querySelector(".accordion__content");
                    const ic = a.querySelector("#accordion-icon");

                    c.style.height =
                        i === index && !isOpen ? `${c.scrollHeight}px` : "0px";
                    ic.classList.toggle("ri-add-line", i !== index || !isOpen);
                    ic.classList.toggle("ri-subtract-fill", i === index && !isOpen);
                });
            });
        });
        return () => { };
    }, []);

    return (
        <main className="bg-black text-white show4" id="main">
            <section className="grid grid-cols-1 max-h-screen max-w-screen overflow-x-hidden font-montserrat p-8 hero">
                <div className="col-start-1 row-start-1 max-w-screen z-[6] bg-black background-image">
                    <img
                        src="https://i.imghippo.com/files/zFHdI1721808524.jpg"
                        className="h-full max-h-screen object-cover"
                    />
                </div>
                <div className="col-start-1 row-start-1 max-w-screen z-[7] bg-[rgba(0,_0,_0,_0.7)] background-overlay"></div>
                <div
                    className="col-start-1 row-start-1 max-w-screen z-[8] content"
                    id="#content"
                >
                    <h1 className="text-[3rem] text-[rgba(255,_255,_255,_0.6)] mb-12 leading-[0.8] font-normal main-text">
                        Unleash Your{" "}
                        <span className="font-semibold no-underline whitespace-nowrap bg-clip-text animate-gradientText bg-[linear-gradient(to_right,_#4d4d4d_0,_white_10%,_#4d4d4d_20%)] text-transparent [animation-fill-mode:forwards] shining-text">
                            Potential!
                        </span>
                    </h1>
                    <h2 className="text-[2rem] text-[rgba(255_,255,_255,_0.6)] mb-12 font-normal main-sub-text">
                        Transform Your{" "}
                        <span className="text-[rgba(255_,255,_255,_0.8)] bright-text">
                            Body
                        </span>{" "}
                        and{" "}
                        <span className="text-[rgba(255_,255,_255,_0.8)] bright-text">
                            Mind
                        </span>
                    </h2>
                    <p className="text-[1rem] mb-10 text-[rgba(255_,255,_255,_0.8)] sub-text bright-text">
                        {" "}
                        Join us for high-intensity CrossFit workouts combining cardio and
                        strength training. Achieve your fitness goals from the comfort of
                        your home with a supportive community by your side. All you need is
                        a pair of dumbbells and a reliable internet connection.
                    </p>
                    <div
                        className="button-rainbow-container"
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
                <section className="what-we-do mb-20">
                    <h3 className="text-[2rem] italic uppercase text-center mt-6 mb-8 font-bold section-title">
                        What we do
                    </h3>
                    <div className="gradient-line"></div>
                    <p className="mt-[1.3rem] font-medium leading-6 text-center mb-9 section-info">
                        You've likely tried numerous methods to lose weight and get fit,
                        such as diet pills, gym memberships, and supplements, only to feel
                        let down. Our Personal Trainer understands your struggles and offers
                        guidance and mental support needed to push your limits, break free
                        from stagnation, and achieve the body you deserve. If you feel
                        frustrated and at a loss, you're in the right place. Get the support
                        you need now to overcome obstacles and rediscover your vitality.
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
                <section className="workout-structure mb-20">
                    <h3 className="text-[2rem] italic uppercase text-center mt-6 mb-8 font-bold section-title">
                        Workout Structure
                    </h3>
                    <div className="gradient-line"></div>
                    <p className="mt-[1.3rem] font-medium leading-6 text-center mb-9 section-info">
                        Your program includes weekly sessions, four days a week, featuring
                        different kinds of workouts such as HIIT, strength endurance, and
                        CrossFit. This variety will keep participants engaged and help them
                        achieve well-rounded fitness.
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
                <section className="benifits">
                    <h3 className="text-[2rem] italic uppercase text-center mt-6 mb-8 font-bold section-title">
                        Benefits of Our Program
                    </h3>
                    <div className="gradient-line"></div>
                    <div className="mt-12 flex flex-wrap gap-8 justify-center benifit-items-container">
                        <section className="relative max-w-[30rem] mb-28 benifit-item">
                            <div className="w-full overflow-hidden benifit-item-image-container">
                                <img
                                    src="https://iili.io/dz2C9yX.jpg"
                                    alt="Endurance"
                                    className="w-full h-auto"
                                />
                            </div>
                            <h4 className="text-[2rem] font-normal italic mb-8 mt-4 benifit-item-title">
                                Increased Endurance
                            </h4>
                            <p className="mt-5 font-medium leading-6 mb-9 benifit-item-content">
                                Increased endurance workouts are designed to enhance your
                                cardiovascular and muscular endurance, allowing you to perform
                                physical activities for longer periods without fatigue. These
                                high-intensity CrossFit workouts focus on improving your
                                stamina, strength, and overall fitness through a variety of
                                challenging exercises.
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
                        <section className="relative max-w-[30rem] mb-28 benifit-item">
                            <div className="w-full overflow-hidden benifit-item-image-container">
                                <img
                                    src="https://iili.io/dz2Byvt.jpg"
                                    alt="muscle toning"
                                    className="w-full h-auto"
                                />
                            </div>
                            <h4 className="text-[2rem] font-normal italic mb-8 mt-4 benifit-item-title">
                                Muscle Toning
                            </h4>
                            <p className="mt-5 font-medium leading-6 mb-9 benifit-item-content">
                                Muscle toning workouts focus on increasing muscle strength and
                                definition without significantly increasing muscle size. These
                                workouts typically involve a combination of bodyweight exercises
                                and moderate-intensity cardiovascular activities. By targeting
                                various muscle groups, they help to create a lean, sculpted
                                physique. Consistent muscle toning exercises improve muscle
                                firmness, endurance, and overall body composition, leading to a
                                more toned and fit appearance.
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
                        <section className="relative max-w-[30rem] mb-28 benifit-item">
                            <div className="w-full overflow-hidden benifit-item-image-container">
                                <img
                                    src="https://iili.io/dz2CJun.jpg"
                                    alt="community support"
                                    className="w-full h-auto"
                                />
                            </div>
                            <h4 className="text-[2rem] font-normal italic mb-8 mt-4 benifit-item-title">
                                Community Support
                            </h4>
                            <p className="mt-5 font-medium leading-6 mb-9 benifit-item-content">
                                Group fitness workouts are crucial for achieving and maintaining
                                fitness goals as they provide structure, motivation, and a sense
                                of community. Participating in group sessions can boost your
                                commitment and consistency, thanks to the supportive environment
                                and shared energy of fellow participants. These workouts, led by
                                expert trainers, ensure proper technique, variety, and
                                intensity, leading to more effective and enjoyable exercise
                                experiences. Group fitness also encourages social interaction
                                and accountability, making it easier to stay motivated and on
                                track with your fitness journey.
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
                        <section className="relative max-w-[30rem] mb-28 benifit-item">
                            <div className="w-full overflow-hidden benifit-item-image-container">
                                <img
                                    src="https://iili.io/dz2BpaI.jpg"
                                    alt="flexibility"
                                    className="w-full h-auto"
                                />
                            </div>
                            <h4 className="text-[2rem] font-normal italic mb-8 mt-4 benifit-item-title">
                                Flexibility
                            </h4>
                            <p className="mt-5 font-medium leading-6 mb-9 benifit-item-content">
                                Flexibility workouts are essential for overall fitness as they
                                help improve the range of motion in your joints, reduce the risk
                                of injury, and enhance muscle performance. By incorporating
                                flexibility exercises into your routine, you can experience
                                better posture, reduced muscle soreness, and a more balanced
                                body. Regular stretching and flexibility training can also
                                relieve stress and promote relaxation, making it a vital
                                component of any comprehensive fitness program.
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
                    </div>
                </section>
                <section className="max-w-[1200px] how-it-works">
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
                                Register for our program by providing your basic information,
                                including your full name, age, email address, and phone number.
                                Let us know your primary fitness goals, such as weight loss,
                                improved endurance, or general fitness. This information helps
                                us tailor the program to meet your specific needs.
                            </p>
                        </li>
                        <li className="step">
                            <h4 className="font-normal text-[1.3rem] italic mb-4 step-title">
                                Step 2: Get Ready
                            </h4>
                            <p className="mb-8 pl-8 step-info">
                                Prepare for your fitness journey by ensuring you have access to
                                a pair of dumbbells. Make sure you have a reliable internet
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
                                Participate in our scheduled online workouts from the comfort of
                                your home. Each workout is led by experienced instructor who
                                will guide you through each exercise, ensuring proper form and
                                technique.
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
                                participating in our program will help you see tangible results,
                                boosting your confidence and commitment to your fitness journey.
                            </p>
                        </li>
                    </ul>
                    <div
                        className="button-rainbow-container center-block"
                        onClick={() => {
                            navigate("/book");
                        }}
                    >
                        <button className="button-rainbow">
                            Start Your Fitness Journey Today!
                        </button>
                    </div>

                    <section className="what-we-do mt-16">
                        <h3 className="text-[2rem] italic uppercase text-center mt-6 mb-8 font-bold section-title">
                            Meet Our Experts:
                        </h3>
                        <div className="gradient-line"></div>
                        <section className="relative benifit-item mb-16 max-w-none">
                            <h4 className="text-[2rem] font-normal italic mb-8 mt-4 benifit-item-title">
                                Gokilaselvam:
                            </h4>
                            <p className="pl-8 mt-5 font-medium leading-6 mb-9 benifit-item-content">
                                A certified trainer with extensive experience in high-intensity
                                CrossFit workouts, focusing on cardio and strength endurance.
                            </p>
                        </section>
                        <section className="relative benifit-item mb-16 max-w-none">
                            <h4 className="text-[2rem] font-normal italic mb-8 mt-4 benifit-item-title">
                                Sowndhraya:
                            </h4>
                            <p className="pl-8 mt-5 font-medium leading-6 mb-9 benifit-item-content">
                                A professional physiotherapist specializing in managing
                                musculoskeletal conditions, rehab tapping, and injury
                                management, ensuring you stay fit and injury-free.
                            </p>
                        </section>

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
                </section>
                <div className="accordian-container mt-24">
                    <div className="accordion__wrapper">
                        <h3 className="accordion__title">Frequently Asked Questions</h3>
                        <div className="gradient-line"></div>
                        <div className="accordion">
                            <div className="accordion__header">
                                <h2 className="accordion__question">
                                    What equipment do I need?
                                </h2>
                                <span className="accordion__icon">
                                    <i id="accordion-icon" className="ri-add-line"></i>
                                </span>
                            </div>
                            <div className="accordion__content">
                                <p className="accordion__answer">
                                    To get started, you'll need a pair of dumbbells and a reliable
                                    internet connection. These basic items will allow you to
                                    participate fully in our workouts.
                                </p>
                            </div>
                        </div>
                        <div className="accordion">
                            <div className="accordion__header">
                                <h2 className="accordion__question">
                                    Do I need prior experience with CrossFit?
                                </h2>
                                <span className="accordion__icon">
                                    <i id="accordion-icon" className="ri-add-line"></i>
                                </span>
                            </div>
                            <div className="accordion__content">
                                <p className="accordion__answer">
                                    No prior experience is necessary. Our program caters to all
                                    fitness levels, from beginners to advanced athletes. Our
                                    instructors will provide modifications and guidance to ensure
                                    everyone can participate safely and effectively.
                                </p>
                            </div>
                        </div>

                        <div className="accordion">
                            <div className="accordion__header">
                                <h2 className="accordion__question">
                                    What if I have existing medical conditions or injuries
                                </h2>
                                <span className="accordion__icon">
                                    <i id="accordion-icon" className="ri-add-line"></i>
                                </span>
                            </div>
                            <div className="accordion__content">
                                <p className="accordion__answer">
                                    Please consult with your healthcare provider before starting
                                    any new fitness program. If you have existing medical
                                    conditions or injuries, inform our instructors so they can
                                    provide appropriate modifications to exercises.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
