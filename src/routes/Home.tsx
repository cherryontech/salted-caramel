import ShuffleIcon from "../assets/icons/Shuffle";
import WrenchIcon from "../assets/icons/Wrench";
import Footer from "../components/Footer";
import { NavLink, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useRef } from "react";

const Home = () => {
  const location = useLocation();
  const isInitialMount = useRef(true);
  const images = import.meta.glob("/src/assets/photos/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });
  const getImageSrc = (filename: string) => {
    const path = `/src/assets/photos/${filename}`;
    const imageModule = images[path] as { default: string } | undefined;
    return imageModule?.default || "";
  };

  

  const items = [
    {
      "icon": "Search.svg",
      "title": "Explore Career Roadmaps",
      "body": "Understand how people actually get into different fields, with multiple pathways for every career."
    },
    {
      "icon": "List.svg",
      "title": "Track your progress",
      "body": "Understand what skills you already bring and move at your own pace."
    },
    {
      "icon": "Key.svg",
      "title": "Find your path",
      "body": "See which roadmap matches your goals, your strengths and where you're starting from."
    },
    {
      "icon": "Globe.svg",
      "title": "Learn from others",
      "body": "Read real journeys, tips, and lessons from people who chose the same path."
    },
    {
      "icon": "Gift.svg",
      "title": "Share your story",
      "body": "Your insights and experience will make the platform more supportive"
    },
    {
      "icon": "Info.svg",
      "title": "Build your dashboard",
      "body": "Turn your skills and goals into a personalized roadmap toward the specialization you choose."
    }
  ];

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (location.hash === '#about') {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Header />
      <div className="text-center mt-55 mb-50">
        <h1 className="text-[64px] font-extrabold font-nunito text-neutralblack">
          Find your next step, together
        </h1>
        <h2 className="mt-1 font-inter font-light text-[32px]">
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
          <NavLink to="/builddashboard">
            <button className="bg-blue-gradient text-black pt-1 pr-3 pl-3 pb-2.5 rounded-lg flex gap-2">
              <WrenchIcon />
              <span className="mt-2">Start My Dashboard</span>
            </button>
          </NavLink>
        </div>
      </div>
      <div className="bg-salmon-gradient flex justify-center pt-20 pb-20 gap-15 pr-50 pl-50">
        <img
          className="h-100 w-150"
          src={getImageSrc("Image-14.png")}
          alt="Group of four professional dressed women giving each a collective high five"
        />
        <img
          className="h-100 w-150"
          src={getImageSrc("Image-15.png")}
          alt="Group of six multiracial women sitting around a table with laptops out with big smiles on their faces"
        />
      </div>

      <div>
          {/* Content Heading */}
          <div className="ml-16">
          <h1 className="mt-16  mb-4 text-2xl font-semibold mb2">
            <span className="bg-salmon-gradient bg-clip-text text-transparent">All Roads</span> helps you grow your career at your own pace
          </h1>

          <p className="text-lg mb-16 text-gray-700 mb-10">
            We're here to make career planning feel simple, supportive, and human. <br/>
            Explore real stories, learn from others, and create a path that works for your life. <br/>
          </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-16 mr-16 mb-10" id="about">
            {items.map((item) => (
              <div className="flex items-start gap-3 p-4 bg-transparent shadow-none max-w-sm">
                
                <img src={getImageSrc(item["icon"])} alt={item["title"]}
                  className="w-10 h-10 object-contain brightness-0"
                  />
                
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-neutralblack-900">
                  {item["title"]}
                  </h2>

                  <p className="text-sm text-neutralblack-600 leading-relaxed">
                    {item["body"]}
                  </p>
                </div>
                
              </div>
            ))}
          </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
