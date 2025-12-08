
import { useState } from "react";
import { useQuestionnaire } from "../QuestionnaireProvider";


const careerPath = [
{ 
    icon: "Book.svg",
    career: "Web Design",
    description: "Research, plan, and improve website apps based on user needs."
}, 
{ 
    icon: "Upload.svg",
    career: "Software Development",
    description: "Design, program, build, deploy, and maintain software using different skills and tools."
},
{
    icon: "Zap.svg",
    career: "Product Managment",
    description: "Lead product strategy and execution, turning ideas into real customer solutions."
},
{
    icon: "Refresh.svg",
    career: "Content Development",
    description: "Develop the actual content that people see on websites and print materials."
}
]

const getImageSrc = (filename: string) => {
    return `/src/assets/photos/${filename}`;
};


const BuildYourDashboard = () => {
    const { dispatch } = useQuestionnaire();
    const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
    
    const handleSelect = (career: string) => {
        setSelectedCareer(career);
        dispatch({type: "SET_CAREER", payload: career});
    };

    return(
        <div className="flex ml-15 gap-[100px]">
            {/* Left content */}
            <aside className="flex flex-col">
                <img src={getImageSrc("BuildYourDashboard.svg")}
                alt="illustration" className="w-[327px] h-[263px] object-contain self-stretch"/>
                
                <p className="text-sm text-gray-700 px-2 text-left mt-4 text-[20px] font-medium font-inter">
                    Let's start by finding your focus.
                </p>
            </aside>

            {/* Right content */}
            <div className="flex flex-col w-[520px]">
                <h1 className="text-[32px] font-semibold leading-tight">
                    Build Your Dashboard
                </h1>

                <p className="mt-3 text-[18px] text-gray-800">
                    What career are you growing in?
                </p>
                <p className="text-gray-600 text-[16px] italic mt-1">
                    Choose one of All Roads' pre-built roadmaps, and customize it on your dashboard.
                </p>

                <div className="mt-8 space-y-4">
                    {careerPath.map((item) => {
                    const isSelected = selectedCareer === item.career;
                    
                    return (
                        <button
                        key={item.career}
                        onClick={() => handleSelect(item.career)}
                        className={`w-full text-left border rounded-xl px-5 py-4 flex item-start gap-4 
                        transition-all duration-150 ${isSelected ? "bg-sage-gradient border-primaryGreen text-neutralblack" : "bg-white border-gray-300 hover:bg-gray-50"}
                        `}
                        >
                            <img src={getImageSrc(item.icon)} alt={`item.icon`}/>

                            <div>
                                <h3 className={`text-lg font-semibold ${isSelected ? "text-neutralblack" : "text-gray-900"}`}>
                                    {item.career}
                                </h3>

                                <p className={`text-[15px] ${isSelected ? "text-black" : "text-gray-600"}`}>
                                    {item.description}
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

export default BuildYourDashboard;