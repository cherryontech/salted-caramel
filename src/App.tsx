import { Routes, Route } from "react-router";
import Header from "./components/Header";
import About from "./routes/About";
import Roadmaps from "./routes/Roadmaps";
import Community from "./routes/Community";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/community" element={<Community />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
