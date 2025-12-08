import { Routes, Route } from "react-router";
import About from "./routes/About";
import Roadmaps from "./routes/Roadmaps";
import Community from "./routes/Community";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import DetailPage from "./routes/DetailPage";
import Questionnaire from "./questionnaire/Questionnaire";
import { QuestionnaireProvider } from "./questionnaire/QuestionnaireProvider";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/community" element={<Community />} />
        <Route
          path="/builddashboard"
          element={
            <QuestionnaireProvider>
              <Questionnaire />
            </QuestionnaireProvider>
          }
        />

        <Route
          path="/dashboard"
          element={
            <QuestionnaireProvider>
              <Dashboard />
            </QuestionnaireProvider>
          }
        />
        <Route path="/details/:id" element={<DetailPage />} />
      </Routes>
    </>
  );
};

export default App;
