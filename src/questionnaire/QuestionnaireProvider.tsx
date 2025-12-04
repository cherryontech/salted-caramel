import { createContext, useContext, useState, useEffect } from "react";
import {
  loadQuestionnaire,
  saveQuestionnaire,
} from "../store/questionnaireStore";

type QuestionnaireState = {
  name: string;
  icon: string;
  careerGoal: string;
  careerLevel: string;
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
  // answers: Record<string, unknown>;
};

type QuestionnaireContextType = {
  state: QuestionnaireState;
  setState: React.Dispatch<React.SetStateAction<QuestionnaireState>>;
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

  //   auto-save to localStorage whenever anything changes
  useEffect(() => {
    saveQuestionnaire(state);
  }, [state]);

  return (
    <QuestionnaireContext.Provider value={{ state, setState }}>
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
