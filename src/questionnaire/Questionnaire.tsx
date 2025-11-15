import Header from "../components/Header";
import EducationPage from "./pages/EducationPage";
import SkillsPage from "./pages/SkillsPage";
import LoadingPage from "./pages/LoadingPage";

//  Carousel will be imported here as a wrapper for each page to go through

const Questionnaire = () => {
  return (
    <>
      <Header />
      <div>Questionnaire</div>
      <EducationPage />
      <SkillsPage />
      <LoadingPage />
    </>
  );
};

export default Questionnaire;
