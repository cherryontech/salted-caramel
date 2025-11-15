import { Routes, Route } from "react-router";
import About from "./routes/About";
import Roadmaps from "./routes/Roadmaps";
import Community from "./routes/Community";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import DetailPage from "./routes/DetailPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/community" element={<Community />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details/:id" element={<DetailPage />} />
      </Routes>
    </>
  );
};

export default App;
