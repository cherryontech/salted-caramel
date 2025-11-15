import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Data from "../assets/data.json";
import BarIcon from "../assets/icons/Bar";
import ClockIcon from "../assets/icons/Clock";
import DollarSignIcon from "../assets/icons/DollarSign";
import HouseIcon from "../assets/icons/House";
import ArrowIcon from "../assets/icons/Arrow";
import WrenchIcon from "../assets/icons/Wrench";
import ShuffleIcon from "../assets/icons/Shuffle";

interface Specialization {
  image: string;
  name: string;
  description: string;
}

interface Pathway {
  type: string;
  milestones: string[];
}

interface Field {
  id: number;
  icon: string;
  title: string;
  description: string;
  salaryRange: string;
  learningCurve: string;
  remotePercent: string;
  growthRate: string;
  technicalSkills: string[];
  softSkills: string[];
  specializations: Specialization[];
  pathways: Pathway[];
}

interface DataFile {
  fields: Field[];
}
const typedData = Data as DataFile;

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  // getting images
  const images = import.meta.glob("/src/assets/photos/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });
  const getImageSrc = (filename: string) => {
    const path = `/src/assets/photos/${filename}`;
    const imageModule = images[path] as { default: string } | undefined;
    return imageModule?.default || "";
  };

  const item = typedData.fields.find((field) => field.id === numericId);

  if (!item) {
    return <div> Item not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-12">
      <h1 className="text-[55px] font-extrabold font-nunito whitespace-nowrap">
        Career roadmap for {item.title}
      </h1>
      <p className="mt-10 text-[20px] font-medium font-nunito">
        {item.description}
      </p>

      <section>
        <h2 className="mt-10 text-[36px] font-medium font-nunito">
          {" "}
          Specializations & sub-fields
        </h2>

        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-x-15">
          {item.specializations.map((data) => {
            return (
              <div
                key={data.name}
                className="p-3 border border-gray-400 rounded-md flex gap-5"
              >
                <img
                  src={data.image ? getImageSrc(data.image) : undefined}
                  alt={data.image}
                  className="mb-3 object-cover h-40 w-45"
                />
                <div className="float-right">
                  <h3 className="text-[24px] font-medium font-nunito">
                    {data.name}
                  </h3>
                  <p className="font-inter text-[16px] font-light">
                    {" "}
                    {data.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mt-10 text-[36px] font-medium font-nunito mb-15">
          {" "}
          Career Snapshot
        </h2>
        <ul className="flex items-center gap-7 text-neutralblack">
          <li className="bg-sage-gradient p-8 border border-gray-400 rounded-sm w-60 h-38">
            <DollarSignIcon />
            <strong className="ml-4.5 font-extrabold text-[20px] whitespace-nowrap">
              {item.salaryRange}
            </strong>
            <p className="ml-8">Salary Range</p>
          </li>
          <li className="bg-sage-gradient p-8 border border-gray-400 rounded-sm w-60 h-38">
            <ClockIcon />
            <strong className="ml-11 font-extrabold text-[20px]">
              {item.learningCurve}
            </strong>
            <p className="ml-8.5">Learning Curve</p>
          </li>
          <li className="bg-sage-gradient p-8 border border-gray-400 rounded-sm w-60 h-38">
            <HouseIcon />
            <strong className="ml-6.5 font-extrabold text-[20px] whitespace-nowrap">{`${item.remotePercent} Remote`}</strong>
            <p className="ml-13">Flexibility</p>
          </li>
          <li className="bg-sage-gradient p-8 border border-gray-400 rounded-sm w-60 h-38">
            <BarIcon />
            <strong className="ml-15 font-extrabold text-[20px]">{`+${item.growthRate}`}</strong>
            <p className="ml-5">New jobs in 2025</p>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mt-18 text-[36px] font-medium font-nunito">
          {" "}
          Key Skills and core competencies
        </h2>

        <div className="mt-13 grid grid-cols-3 gap-x-15 gap-y-15 pl-18">
          {[...item.technicalSkills, ...item.softSkills].map((skill, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-gray-500 font-light font-nunito text-[20px]">
                {index < item.technicalSkills.length
                  ? "Technical Skill"
                  : "Soft Skill"}
              </span>
              <p className="font-nunito text-[22px] font-bold text-neutralblack">
                {skill}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mt-10 text-[36px] font-medium font-nunito">
          {" "}
          Common Pathways
        </h2>
        <div className="grid grid-cols-2 gap-x-15 gap-y-9 p-15">
          {item.pathways.map((data) => {
            return (
              <div
                key={data.type}
                className="p-3 border border-gray-400 rounded-md w-sm max-w-sm flex gap-5 bg-white"
              >
                <div className="float-right">
                  <h3 className="text-[24px] font-medium font-nunito mb-4">
                    {data.type}
                  </h3>
                  <ul>
                    {data.milestones.map((milestone, index) => (
                      <li key={index}>
                        <span className="flex items-center gap-5 font-inter text-[16px]">
                          {" "}
                          <ArrowIcon />
                          {milestone}
                        </span>
                        <br />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex justify-center text-neutralblack mr-9">
        {" "}
        <NavLink to="/builddashboard">
          <button className="bg-blue-gradient pt-1 pr-3 pl-3 pb-1 rounded-lg flex gap-2 mb-15">
            <WrenchIcon />
            <span className="mt-1.5">Build My Dashboard</span>
          </button>
        </NavLink>
      </div>
      {/* 
      <section>
        <h2 className="mt-10 text-[36px] font-medium font-nunito">
          {" "}
          In Progress
        </h2>
        <p></p>
      </section> */}

      <div className="flex justify-center text-neutralblack mr-9">
        <NavLink to="/roadmaps">
          <button className="bg-blue-gradient pt-3 pr-3 pl-3 pb-2 rounded-lg flex gap-2 mb-15">
            <ShuffleIcon />
            <span className="mb-1 pr-1">Explore More Careers</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default DetailPage;
