import ShuffleIcon from "../assets/icons/Shuffle";
import WrenchIcon from "../assets/icons/Wrench";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

const Home = () => {
  const images = import.meta.glob("/src/assets/photos/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });
  const getImageSrc = (filename: string) => {
    const path = `/src/assets/photos/${filename}`;
    const imageModule = images[path] as { default: string } | undefined;
    return imageModule?.default || "";
  };

  return (
    <>
      <div className="text-center mt-30">
        <h1 className="text-[50px] font-extrabold font-nunito text-neutralblack">
          Find your next step, together
        </h1>
        <h2 className="mt-1 font-inter font-light text-[27px]">
          {" "}
          Explore real career paths and see what feels right for you
        </h2>
        <div className="flex gap-3.5 justify-center mt-5 mb-25 font-inter text-[16px] font-light">
          <NavLink to="/roadmaps">
            <button className="bg-white pt-3 pr-3 pl-3 pb-2 rounded-lg flex gap-2">
              <ShuffleIcon />
              <span className="mb-1 pr-1">Explore Careers</span>
            </button>
          </NavLink>
          <NavLink to="/dashboard">
            <button className="bg-blue-gradient text-black pt-1 pr-3 pl-3 pb-1 rounded-lg flex gap-2">
              <WrenchIcon />
              <span className="mt-1.5">Start My Dashboard</span>
            </button>
          </NavLink>
        </div>
      </div>
      <div className="bg-salmon-gradient flex justify-center p-13 gap-8">
        <img
          className="h-80 w-120"
          src={getImageSrc("Image-14.png")}
          alt="Group of four professional dressed women giving each a collective high five"
        />
        <img
          className="h-80 w-120"
          src={getImageSrc("Image-15.png")}
          alt="Group of six multiracial women sitting around a table with laptops out with big smiles on their faces"
        />
      </div>
      <Footer/>
    </>
  );
};

export default Home;
