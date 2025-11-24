import { useQuestionnaire } from "../QuestionnaireProvider";
import Data from "../../assets/data.json";
import CheckIcon from "../../assets/icons/Check";

const SkillsPage = () => {
  const { state, setState } = useQuestionnaire();

  //  showing default details for now, will use other data once prev pages created
  const fieldId = state.fieldId ?? 1;
  // const specializationName = state.specializationName ?? "UX Designer";

  const field = Data.fields.find((f) => f.id === fieldId);
  // const specialization = field?.specializations.find(
  //   (s) => s.name === specializationName
  // );

  const technicalSkills = field?.technicalSkills ?? [];
  const softSkills = field?.softSkills ?? [];

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

  return (
    <div className="flex ml-15 gap-28">
      {/* LEFT CONTENT */}
      <aside>
        <p className="text-sm text-gray-700 px-3 text-center mt-4 text-[20px] text-left">
          You've learned a lot along the way,
          <br />
          let's capture what you already bring.
        </p>
      </aside>

      {/* RIGHT CONTENT */}
      <div className="w-[725px] h-[109]">
        <h1 className="text-3xl font-extrabold mb-2 text-[48px] text-nunito font-stretch-115% leading-[5rem]">
          Build Your Dashboard
        </h1>
        <h2 className="mb-2 mt-5 text-[24px] text-inter font-stretch-125% leading-[4rem]">
          Do you have any of these skills or experiences already?
        </h2>

        <div className="flex flex-wrap gap-35 max-w-[700px] justify-center mt-15 font-inter text-[16px]">
          {[...technicalSkills, ...softSkills].map((skill) => {
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
