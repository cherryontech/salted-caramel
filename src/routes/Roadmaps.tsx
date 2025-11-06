import { NavLink } from "react-router-dom";
import Data from "../assets/data.json";
import PenIcon from "../assets/icons/Pen";
import CompassIcon from "../assets/icons/Compass";
import CodeIcon from "../assets/icons/Code";
import UploadIcon from "../assets/icons/Upload";

type IconName = "upload" | "compass" | "pen" | "code";

const iconMap: Record<IconName, React.FC> = {
  pen: PenIcon,
  compass: CompassIcon,
  code: CodeIcon,
  upload: UploadIcon,
};

const Roadmaps = () => {
  return (
    <div className="max-w-5xl mx-auto mt-12 px-6">
      <h1 className="text-[55px] font-extrabold font-nunito text-neutralblack">
        {" "}
        Explore career roadmaps
      </h1>
      <p className="text-[17px] font-medium font-nunito text-neutralblack">
        {" "}
        Start discovering the paths that lead to where you want to be{" "}
      </p>

      <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-10 place-items-center">
        {Data.fields.map((field) => {
          const IconComponent = iconMap[field.icon as IconName];
          return (
            <li key={field.id}>
              <NavLink to={`/details/${field.id}`}>
                <div className="p-3 border border-gray-400 rounded-md w-full max-w-md ml-10">
                  <div className="flex gap-4 items-center mt-2 ml-2">
                    {IconComponent && <IconComponent />}
                    <strong className="text-[18px] font-nunito">
                      {field.title}
                    </strong>{" "}
                  </div>
                  <p className="font-inter ml-12 mb-3 text-[14.8px]">
                    {field.description}
                  </p>
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <br />
      <p className="text-center font-inter font-medium text-[20px]">
        {" "}
        More career roadmaps coming soon!
      </p>
    </div>
  );
};

export default Roadmaps;
