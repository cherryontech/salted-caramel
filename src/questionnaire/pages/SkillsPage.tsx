import { useQuestionnaire } from "../QuestionnaireProvider";
import { useEffect } from "react";
import Data from "../../assets/data.json";
import CheckIcon from "../../assets/icons/Check";

const SkillsPage = () => {
  const { state, setState } = useQuestionnaire();

  const fieldId = state.fieldId;

  useEffect(() => {
    if (!fieldId) return;

    setState((prev) => ({
      ...prev,
      selectedSkills: [],
    }));
  }, [fieldId, setState]);

  const field = Data.fields.find((f) => f.id === fieldId);

  const milestoneSkills = field?.milestonesSkills;

  const hardSkills = milestoneSkills?.hardSkills ?? [];
  const softSkills = milestoneSkills?.softSkills ?? [];
  const expProjects = milestoneSkills?.expProjects ?? [];

  const toggleSkill = (skill: string) => {
    setState((prev) => {
      const alreadySelected = prev.selectedSkills?.includes(skill);

      return {
        ...prev,
        selectedSkills: alreadySelected
          ? prev.selectedSkills!.filter((s: string) => s !== skill)
          : [...(prev.selectedSkills || []), skill],
      };
    });
  };

  const images = import.meta.glob("/src/assets/photos/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });
  const getImageSrc = (filename: string) => {
    const path = `/src/assets/photos/${filename}`;
    const imageModule = images[path] as { default: string } | undefined;
    return imageModule?.default || "";
  };

  return (
    <div className="flex ml-15 gap-28">
      {/* LEFT CONTENT */}
      <aside className="mt-5">
        <img
          src={getImageSrc("Allura - Trophy 1.svg")}
          alt="Gold colored trophy"
          className="w-[327px] h-[270px]"
        />
        <p className="text-sm text-gray-700 px-3 text-center mt-4 text-[20px] text-left">
          You've learned a lot along the way,
          <br />
          let's capture what you already bring.
        </p>
      </aside>

      {/* RIGHT CONTENT */}
      <div className="w-[825px] h-[109]">
        <h1 className="text-3xl font-extrabold mb-2 text-[48px] text-nunito font-stretch-115% leading-[4rem]">
          Build Your Dashboard
        </h1>
        <h2 className="mb-2 mt-5 text-[24px] text-inter font-stretch-125% leading-[4rem]">
          Do you have any of these skills or experiences already?
        </h2>

        <div className="flex flex-wrap gap-y-[55px] gap-x-[40px] max-w-[800px] justify-left mt-13 font-inter text-[16px]">
          {[...hardSkills, ...softSkills, ...expProjects].map((skill) => {
            const selected = state.selectedSkills?.includes(skill);

            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-blue
          ${
            selected
              ? "bg-sage-gradient text-neutralblack"
              : "bg-white text-neutralblack"
          }
          hover:shadow-sm
        `}
              >
                {selected && <CheckIcon />}
                {skill}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
