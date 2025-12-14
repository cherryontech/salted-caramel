import Data from "../../assets/data.json";
import { useState } from "react";
import { useQuestionnaire } from "../QuestionnaireProvider";
import Clock2Icon from "../../assets/icons/Clock2";
import SunIcon from "../../assets/icons/Sun";
import VideoIcon from "../../assets/icons/Video";
import RefreshIcon from "../../assets/icons/Refresh";

const specializationDisplayMap: Record<string, string> = {
  "UX Designer": "UX Design",
  "UI Designer": "UI Design",
  "UX Researcher": "UX Research",
  "Visual Designer": "Visual Design",
  "Product Management": "Product Management",
  "Technical Product Management": "Technical Product Management",
  "AI / ML Product Management": "AI / ML Product Management",
  "Cloud / Infrastructure Product Management":
    "Cloud / Infrastructure Product Management",
  "Full-stack Developer": "Full-stack Development",
  "Mobile Developer": "Mobile Development",
  "AI / ML Engineer": "AI / ML Engineering",
  "Cloud Engineer": "Cloud Engineering",
  "UX Writing / Content Design": "UX Writing / Content Design",
  "Technical Content Development": "Technical Content Development",
  "Content Strategy": "Content Strategy",
  "Instructional Design": "Instructional Design",
};

const fixedIcons = [Clock2Icon, SunIcon, VideoIcon, RefreshIcon];

const images = import.meta.glob("/src/assets/photos/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

const getImageSrc = (filename: string) => {
  const path = `/src/assets/photos/${filename}`;
  const imageModule = images[path] as { default: string } | undefined;
  return imageModule?.default || "";
};

const Specialization = () => {
  const { state, dispatch } = useQuestionnaire();
  const selectedCareer = state?.careerGoal;
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

  // Find the careeer field matching the selected career title
  const careerField = Data.fields.find(
    (field) => field.title === selectedCareer
  );

  const specializations = careerField?.specializations.slice(0, 4) || [];

  const handleSelectSpec = (specName: string) => {
    setSelectedSpec(specName);
    dispatch({ type: "SET_SPECIALIZATION", payload: specName });
  };

  return (
    <div className="flex items-start p-3 gap-[200px]">
      {/* Left Content */}
      <div className="flex flex-col">
        <img
          src={getImageSrc("Specializations.svg")}
          alt="Illustration of lightbulb lit up"
          className="self-stretch h-[304.751px]"
        />

        <p className="flex items-center self-stretch mt-[10px] mb-[10px]">
          Every detail helps us personalize your path.
        </p>
      </div>

      {/* Right content */}
      <div className="flex-1 flex-col">
        <h1 className="text-[32px] font-semibold leading-tight">
          Build Your Dashboard
        </h1>

        <p className="text-gray-600 text-[16px] italic mt-1">
          Do you have a specialization in mind?
        </p>

        <div className="mt-8 space-y-4">
          {specializations.map((spec, index) => {
            const isSelected = selectedSpec === spec.name;
            const Icon = fixedIcons[index];

            return (
              <button
                key={spec.name}
                onClick={() => handleSelectSpec(spec.name)}
                className={`w-full text-left border rounded-xl p-6 flex items-center gap-4 
          transition-all duration-150 ${
            isSelected
              ? "bg-sage-gradient border-primaryGreen text-neutralblack"
              : "bg-white border-gray-300 hover:bg-salmon-gradient"
          }`}
              >
                {/* Icon Container */}
                {Icon && (
                  <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <Icon />
                  </div>
                )}

                {/* Text */}
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${
                      isSelected ? "text-neutralblack" : "text-gray-900"
                    }`}
                  >
                    {specializationDisplayMap[spec.name] || spec.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      isSelected ? "text-black" : "text-gray-600"
                    }`}
                  >
                    {spec.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Specialization;
