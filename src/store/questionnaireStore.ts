//  will store answers here to render to dashboard route
export const loadQuestionnaire = () => {
  const saved = localStorage.getItem("questionnaire");
  return saved
    ? JSON.parse(saved)
    : {
        name: "",
        careerStage: "",
        answers: {},
      };
};

export const saveQuestionnaire = (data: unknown) => {
  localStorage.setItem("questionnaire", JSON.stringify(data));
};
