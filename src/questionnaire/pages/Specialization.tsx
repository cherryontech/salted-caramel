import Data from "../../assets/data.json";
import { useState } from "react";
import { useQuestionnaire } from "../QuestionnaireProvider";


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

const getImageSrc = (filename: string) => {
    return `/src/assets/photos/${filename}`;
};

const Specialization = () => {
    const { state, dispatch } = useQuestionnaire();
    const selectedCareer = state?.careerGoal;
    const [selectedSpec, setSelectedSpec] = useState<string | null>(null);

    // Find the careeer field matching the selected career title
    const careerField = Data.fields.find((field) => field.title === selectedCareer);

    const specializations = careerField?.specializations || [];

    const handleSelectSpec = (specName: string) => {
        setSelectedSpec(specName);
        dispatch({ type: "SET_SPECIALIZATION", payload: specName });
    };


    return (
        <div className="flex items-start p-3 gap-[200px]">
            
            {/* Left Content */}
            <div className="flex flex-col">
                <img src={getImageSrc("Specializations.svg")} className="self-stretch h-[304.751px]"/>

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
                    {specializations.map((spec) => {
                    const isSelected = selectedSpec === spec.name;
                    
                    return (
                        <button
                        key={spec.name}
                        onClick={() => handleSelectSpec(spec.name)}
                        className={`w-full object-contain text-left border rounded-xl p-6 flex items-start gap-4 
                        transition-all duration-150 ${isSelected ? "bg-sage-gradient border-primaryGreen text-neutralblack" : "bg-white border-gray-300 hover:bg-gray-50"}
                        `}
                        >
                            <img src={getImageSrc(spec.image)} alt={`item.icon`} className="w-[120px] h-[120px] object-contain"/>

                            <div>
                                <h3 className={` gap-[24px] text-[24px] text-lg font-semibold object-contain ${isSelected ? "text-neutralblack" : "text-gray-900"}`}>
                                    {specializationDisplayMap[spec.name] || spec.name}
                                </h3>

                                <p className={`text-[15px] ${isSelected ? "text-black" : "text-gray-600"}`}>
                                    {spec.description}
                                </p>
                            </div>
                        </button>
                    );
                    })}
                </div>
        </div>
        </div>
    )
};

export default Specialization;