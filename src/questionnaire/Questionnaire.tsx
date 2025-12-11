import Header from "../components/Header";
import AboutYourselfPage from "./pages/AboutYourselfPage";
import SkillsPage from "./pages/SkillsPage";
import LoadingPage from "./pages/LoadingPage";
import Carousel from "../components/Carousel";
import BuildYourDashboard from "./pages/BuildYourDashboard";
import Specialization from "./pages/Specialization";

const Questionnaire = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen mr-20 mt-15 p-10">
        <div className="max-w-[1400px] w-full h-[875px] mr-100">
          <Carousel>
            <AboutYourselfPage />
            <BuildYourDashboard/>
            <Specialization/>
            <SkillsPage />
            <LoadingPage />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Questionnaire;
