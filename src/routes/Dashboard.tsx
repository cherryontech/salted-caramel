import { useState, type JSX } from "react";
import Header from "../components/Header";
import { useQuestionnaire } from "../questionnaire/QuestionnaireProvider";
import Pencil from "../assets/icons/Pencil";
import BookIcon from "../assets/icons/Book";
import SunIcon from "../assets/icons/Sun";
import TrendingIcon from "../assets/icons/Trending";
import RefreshIcon from "../assets/icons/Refresh";

type IconName = "book" | "sun" | "trending" | "refresh";

const iconMap: Record<IconName, React.FC> = {
  book: BookIcon,
  sun: SunIcon,
  trending: TrendingIcon,
  refresh: RefreshIcon,
};

const Dashboard = () => {
  const { state, setState } = useQuestionnaire();
  const [isEditing, setIsEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState(state.careerGoal || "");

  const IconComponent = iconMap[state.icon as IconName];

  const hasField = !!state.fieldId;
  const hasSpec = !!state.specializationName;
  const hasTypedGoal = state.careerGoal.trim().length > 0;

  let goalSentence: JSX.Element | string = "";

  if (hasTypedGoal) {
    // User typed custom goal (no bold unless you want it)
    goalSentence = <>My career goal is to {state.careerGoal}.</>;
  } else if (hasField && hasSpec) {
    goalSentence = (
      <>
        My goal is to become a{" "}
        <span className="font-bold">{state.fieldId}</span> with a specialization
        in <span className="font-bold">{state.specializationName}</span>.
      </>
    );
  } else if (hasField) {
    goalSentence = (
      <>
        My goal is to become a{" "}
        <span className="font-bold">{state.fieldId}</span>.
      </>
    );
  } else {
    goalSentence = "";
  }

  const showDefaultPrompt = !goalSentence;

  return (
    <div>
      <Header />
      <div className="p-12 mt-3">
        <h1 className="font-nunito font-extrabold text-[64px]">
          {state.name === ""
            ? "My Dashboard"
            : `${
                state.name.charAt(0).toUpperCase() + state.name.slice(1)
              }'s Dashboard`}
        </h1>

        <div className="mt-6">
          {!isEditing ? (
            <h2 className="flex items-center gap-3 font-inter text-[32px]">
              {showDefaultPrompt ? "Set your career goal" : goalSentence}

              <span
                onClick={() => {
                  setIsEditing(true);
                  setTempGoal(state.careerGoal || "");
                }}
                className="cursor-pointer ml-3"
              >
                <Pencil />
              </span>
            </h2>
          ) : (
            <div className="flex items-center gap-3">
              <h2 className="font-inter text-[32px]">My career goal is to</h2>

              <input
                type="text"
                value={tempGoal}
                onChange={(e) => setTempGoal(e.target.value)}
                placeholder="work a more flexible job."
                className="text-[32px] underline w-[335px] text-gray-500"
              />

              <button
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    careerGoal: tempGoal,
                  }));
                  setIsEditing(false);
                }}
                className="font-bold text-gray-700"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="flex ml-11 gap-2 items-center font-nunito font-bold">
        {IconComponent && <IconComponent />}
        {state.careerLevel}
      </p>
    </div>
  );
};

export default Dashboard;
