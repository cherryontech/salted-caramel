import { useEffect } from "react";
import GirlCyclingAnimation from "../../assets/animations/GirlCycling";

const LoadingPage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/results";
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <h1 className="text-[48px] font-nunito font-bold text-center">
        {" "}
        Preparing Your Dashboard
      </h1>
      <h2 className="text-[24px] font-inter font-regular text-center">
        Your personalized roadmap is on its way, built from your skills, goals,
        and ambitions.
      </h2>
      <GirlCyclingAnimation />
    </div>
  );
};

export default LoadingPage;
