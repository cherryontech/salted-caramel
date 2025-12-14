import { Children, useState } from "react";
import BackArrowIcon from "../assets/icons/BackArrow";
import RightArrowIcon from "../assets/icons/RightArrow";
import { useQuestionnaire } from "../questionnaire/QuestionnaireProvider";

interface Carousel {
  children: React.ReactNode;
}

const Carousel: React.FC<Carousel> = ({ children }) => {
  const { state } = useQuestionnaire();
  const [pagePosition, setPagePosition] = useState(0);
  const totalPages = Children.count(children);

  const back = () => {
    if (pagePosition > 0) setPagePosition((p) => p - 1);
  };

  // Next will only move if canProceedForCurrentStep is true
  const next = () => {
    if (pagePosition < totalPages - 1 && canProceedForCurrentStep) {
      setPagePosition((p) => p + 1);
    }
  };

  const canProceedForCurrentStep = (() => {
    // default false, then override per step
    switch (pagePosition) {
      case 0: // About Yourself
        return Boolean(
          state?.name?.trim() !== "" &&
            state?.careerLevel &&
            state.careerLevel !== ""
        );
      case 1: // Build Your Dashboard
        return Boolean(state?.careerGoal && state.careerGoal !== "");
      case 2: // Specialization
        return Boolean(
          state?.specializationName && state.specializationName !== ""
        );
      case 3: // Skills
        return Boolean(
          state?.selectedSkills &&
            Array.isArray(state.selectedSkills) &&
            state.selectedSkills.length > 0
        );
      default:
        return false;
    }
  })();

  const lastPage = pagePosition === totalPages - 1;

  // determines if Skip is allowed
  const canSkip = () => {
    return pagePosition > 0 && pagePosition < totalPages - 1;
  };

  // moves forward one pag, ignoring validation
  const skip = () => {
    if (canSkip()) {
      setPagePosition((p) => p + 1);
    }
  };

  const slides = Children.toArray(children);

  return (
    <div className="relative w-full flex flex-col justify-between gap-10 min-h-[40vh]">
      {/* Slide/Page Info */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full">
          <div className="w-full h-full">{slides[pagePosition]}</div>
        </div>
      </div>

      {!lastPage && (
        <div className="flex justify-end items-center gap-8 bottom-4 mr-40">
          {/* DOTS */}
          <div className="flex gap-3 mt-2.5 mr-20">
            {Array.from({ length: totalPages }).map((_, index) => (
              <div
                key={index}
                className={`h-3 w-3 rounded-full ${
                  index === pagePosition
                    ? "bg-sage-gradient"
                    : "bg-neutralblack"
                }`}
              />
            ))}
          </div>

          {/* SKIP */}
          <div className="mr-3">
            <button onClick={skip} disabled={!canSkip()} className="flex gap-2">
              Skip
              <RightArrowIcon />
            </button>
          </div>

          {/* BACK / NEXT */}
          <div className="flex gap-4 ml-60">
            <button
              onClick={back}
              disabled={pagePosition === 0}
              className="flex items-center gap-3 mt-1"
            >
              <BackArrowIcon />
              Back
            </button>

            <button
              onClick={next}
              disabled={!canProceedForCurrentStep}
              className={`bg-sage-gradient border rounded-md p-2 flex items-center gap-2 ${
                !canProceedForCurrentStep ? "opacity-40 cursor-not-allowed" : ""
              }`}
              aria-disabled={!canProceedForCurrentStep}
            >
              <span className="ml-3">Next</span>
              <RightArrowIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
