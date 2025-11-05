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
    <div className="ml-12 mr-12 mt-5 min-w-1 fixed">
      <h1 className="text-[55px] font-extrabold font-nunito text-neutralblack">
        {" "}
        Explore career roadmaps
      </h1>
      <p className="text-[17px] font-medium font-nunito text-neutralblack">
        {" "}
        Start discovering the paths that lead to where you want to be{" "}
      </p>

      <div className="p-10 grid grid-cols-2 gap-5 place-content-center ml-15">
        {Data.fields &&
          Data.fields.map((field) => {
            const IconComponent = iconMap[field.icon as IconName];
            return (
              <div
                className="p-4 border border-gray-400 rounded-md w-90 h-30"
                key={field.id}
              >
                <div className="flex gap-4">
                  {IconComponent && <IconComponent />}
                  <strong className="text-[18px] font-nunito whitespace-nowrap">
                    {field.title}
                  </strong>{" "}
                </div>
                {/* <br /> */}
                <p className="font-inter ml-10 mb-6 text-[14.8px]">
                  {field.description}
                </p>
              </div>
            );
          })}
      </div>
      <br />
      <p className="text-center font-inter font-medium text-[20px]">
        {" "}
        More career roadmaps coming soon!
      </p>
    </div>
  );
};

export default Roadmaps;
