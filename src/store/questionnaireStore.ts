//  will store answers here to render to dashboard route
export const loadQuestionnaire = () => {
  const saved = localStorage.getItem("questionnaire");
  return saved
    ? JSON.parse(saved)
    : {
        name: "",
        icon: "",
        careerGoal: "",
        careerLevel: "",
        fieldId: 1,
        specializationName: "UX Designer",
        selectedSkills: [],
        userMilestones: {}, // empty by default
        stepStatus: {}, // empty by default
      };
};

export const saveQuestionnaire = (data: unknown) => {
  localStorage.setItem("questionnaire", JSON.stringify(data));
};
