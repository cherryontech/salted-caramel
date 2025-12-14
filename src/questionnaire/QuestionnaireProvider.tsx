import { createContext, useContext, useState, useEffect } from "react";
import {
  loadQuestionnaire,
  saveQuestionnaire,
} from "../store/questionnaireStore";

export type QuestionnaireState = {
  name: string;
  icon: string;
  careerGoal: string;
  careerLevel: string;
  careerGoalText: string;
  fieldId: number | null;
  specializationName: string | null;
  selectedSkills: string[];
  userMilestones: {
    [sectionName: string]: {
      [milestoneTitle: string]: string[]; // array of steps
    };
  };
  stepStatus: {
    [sectionName: string]: {
      [milestoneTitle: string]: {
        [step: string]: number; // 0 = not started, 1 = in-progress, 2 = completed
      };
    };
  };
};

type QuestionnaireAction =
  | { type: "SET_CAREER"; payload: string }
  | { type: "SET_SPECIALIZATION"; payload: string }
  | { type: "SET_FIELD_ID"; payload: number }
  | { type: "SET_STATE"; payload: Partial<QuestionnaireState> };

type QuestionnaireContextType = {
  state: QuestionnaireState;
  setState: React.Dispatch<React.SetStateAction<QuestionnaireState>>;
  dispatch: (action: QuestionnaireAction) => void;
};

const QuestionnaireContext = createContext<
  QuestionnaireContextType | undefined
>(undefined);

export const QuestionnaireProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<QuestionnaireState>(() =>
    loadQuestionnaire()
  );

  const dispatch = (action: QuestionnaireAction) => {
    switch (action.type) {
      case "SET_CAREER":
        setState((prev) => ({ ...prev, careerGoal: action.payload }));
        break;
      case "SET_SPECIALIZATION":
        setState((prev) => ({ ...prev, specializationName: action.payload }));
        break;
      case "SET_FIELD_ID":
        setState((prev) => ({ ...prev, fieldId: action.payload }));
        break;
      case "SET_STATE":
        setState((prev) => ({ ...prev, ...action.payload }));
        break;
      default:
        break;
    }
  };

  //   auto-save to localStorage whenever anything changes
  useEffect(() => {
    saveQuestionnaire(state);
  }, [state]);

  return (
    <QuestionnaireContext.Provider value={{ state, setState, dispatch }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context)
    throw new Error(
      "useQuestionnaire must be used within a QuestionnaireProvider"
    );
  return context;
};
