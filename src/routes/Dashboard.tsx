import { useState, useEffect, type JSX } from "react";
import Data from "../assets/data.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuestionnaire } from "../questionnaire/QuestionnaireProvider";
import type { QuestionnaireState } from "../questionnaire/QuestionnaireProvider";
import Pencil from "../assets/icons/Pencil";
import BookIcon from "../assets/icons/Book";
import SunIcon from "../assets/icons/Sun";
import TrendingIcon from "../assets/icons/Trending";
import RefreshIcon from "../assets/icons/Refresh";
import UpIcon from "../assets/icons/Up";
import DownIcon from "../assets/icons/Down";
import InProgressIcon from "../assets/icons/InProgress";
import CompletedIcon from "../assets/icons/Completed";
import NotStarted from "../assets/icons/NotStarted";
import CheckIcon from "../assets/icons/Check";

type IconName = "book" | "sun" | "trending" | "refresh";

// Icons map
const iconMap: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  book: BookIcon,
  sun: SunIcon,
  trending: TrendingIcon,
  refresh: RefreshIcon,
};

// renamed titles
const sectionTitlesMap: Record<string, string> = {
  keySkills: "Build Key Skills",
  knowledge: "Learn the Field",
  experience: "Gain Experience",
  network: "Build Network",
  jobSearch: "Apply for Jobs",
};

const QUICK_EMPTY_COUNT = 2; // default 3 milestones

const Dashboard = () => {
  const { state, setState } = useQuestionnaire();
  const { fieldId, specializationName } = state;

  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState<string>(state.careerGoal || "");

  const [openSection, setOpenSection] = useState<Record<string, boolean>>({});
  const [openMilestones, setOpenMilestones] = useState<Record<string, boolean>>(
    {}
  );
  const [editingStep, setEditingStep] = useState<Record<string, boolean>>({});
  const [tempText, setTempText] = useState<Record<string, string>>({});

  // retrieving data
  const selectedField = Data.fields.find((f) => f.id === Number(fieldId));
  const specializationMilestones = selectedField?.editableMilestones.find(
    (m) => m.specialization === specializationName
  );
  const isDataMode = Boolean(selectedField && specializationMilestones);

  // milestones
  const jsonMilestones = (specializationMilestones?.milestones ?? {}) as Record<
    string,
    Record<string, string[]>
  >;

  const initialMilestones: Record<string, Record<string, string[]>> = {};

  if (!isDataMode) {
    // DEFAULT EMPTY MODE:
    Object.keys(sectionTitlesMap).forEach((section) => {
      initialMilestones[section] = {
        // if user already has saved milestones for this section keep them
        ...(state.userMilestones?.[section] || {}),
      };
    });
  } else {
    // milestones data retrieval
    Object.keys(jsonMilestones).forEach((section) => {
      initialMilestones[section] = {
        ...(jsonMilestones[section] || {}),
        ...(state.userMilestones?.[section] || {}),
      };
    });

    // Also ensure any user-only sections (not in JSON) are included
    if (state.userMilestones) {
      Object.keys(state.userMilestones).forEach((section) => {
        if (!initialMilestones[section]) {
          initialMilestones[section] = {
            ...(state.userMilestones[section] || {}),
          };
        }
      });
    }
  }

  const [userMilestones, setUserMilestones] =
    useState<Record<string, Record<string, string[]>>>(initialMilestones);
  const [stepStatus, setStepStatus] = useState<
    QuestionnaireState["stepStatus"]
  >(state.stepStatus || {});

  useEffect(() => {
    setState((prev) => ({ ...prev, userMilestones }));
  }, [userMilestones, setState]);

  useEffect(() => {
    setState((prev) => ({ ...prev, stepStatus }));
  }, [stepStatus, setState]);

  // toggles
  const toggleSection = (sectionName: string) => {
    setOpenSection((prev) => ({ ...prev, [sectionName]: !prev[sectionName] }));
  };

  // Chevron toggle for milestones (clicking chevron only)
  const toggleMilestone = (category: string) => {
    setOpenMilestones((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  // step status cycling
  const statusCheckbox = (current: number) => (current + 1) % 3;

  const toggleStep = (section: string, milestone: string, step: string) => {
    setStepStatus((prev) => {
      const current = prev[section]?.[milestone]?.[step] ?? 0;

      const next = statusCheckbox(current);

      return {
        ...prev,
        [section]: {
          ...prev[section],
          [milestone]: {
            ...prev[section]?.[milestone],
            [step]: next,
          },
        },
      };
    });
  };

  const StepCheckbox = ({ status }: { status: number }) => {
    if (status === 1) return <InProgressIcon />;
    if (status === 2) return <CompletedIcon />;
    return <NotStarted />;
  };

  const IconComponent = iconMap[state.icon as IconName];

  const hasField = !!state.fieldId;
  const hasSpec = !!state.specializationName;
  const hasTypedGoal = state.careerGoal.trim().length > 0;

  // renamed names at career field
  const fieldDisplayNameMap: Record<string, string> = {
    "Web Design": "Web Designer",
    "Product Management": "Product Manager",
    "Software Developer": "Software Developer",
    "Content Developer": "Content Developer",
  };
  const fieldName =
    fieldDisplayNameMap[selectedField?.title ?? ""] ??
    selectedField?.title ??
    "";

  // renamed specialization names
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

  const specName =
    specializationDisplayMap[specializationName ?? ""] ??
    specializationName ??
    "";

  // GOAL SENTENCE
  let goalSentence: JSX.Element | string = "";

  if (hasTypedGoal) {
    goalSentence = <>My career goal is to {state.careerGoal}.</>;
  } else if (hasField && hasSpec) {
    goalSentence = (
      <>
        My goal is to become a <span className="font-bold">{fieldName}</span>{" "}
        with a specialization in <span className="font-bold">{specName}</span>.
      </>
    );
  } else if (hasField) {
    goalSentence = (
      <>
        My goal is to become a <span className="font-bold">{fieldName}</span>.
      </>
    );
  } else {
    goalSentence = "";
  }

  const showDefaultPrompt = !goalSentence;

  // Save edited step
  const saveStep = (section: string, milestone: string, idx: number) => {
    const key = `${section}-${milestone}-${idx}`;
    const newText = tempText[key]?.trim();
    if (!newText) return;
    const updatedSteps = [...(userMilestones[section]?.[milestone] || [])];
    updatedSteps[idx] = newText;
    setUserMilestones((prev) => ({
      ...prev,
      [section]: { ...(prev[section] || {}), [milestone]: updatedSteps },
    }));
    setEditingStep((prev) => ({ ...prev, [key]: false }));
  };

  // Add new step into a milestone
  const addNewStep = (section: string, milestone: string) => {
    const key = `${section}-${milestone}-new`;
    const value = tempText[key]?.trim();
    if (!value) return;
    setUserMilestones((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [milestone]: [...(prev[section]?.[milestone] || []), value],
      },
    }));
    setTempText((prev) => ({ ...prev, [key]: "" }));
  };

  // Add a new milestone into section
  const addNewMilestone = (section: string, title?: string) => {
    const sourceKey = `new-${section}`;
    const value = (title ?? tempText[sourceKey])?.trim();
    if (!value) return;
    setUserMilestones((prev) => ({
      ...prev,
      [section]: { ...(prev[section] || {}), [value]: [] },
    }));
    setOpenMilestones((prev) => ({ ...prev, [value]: true }));
    setTempText((prev) => ({ ...prev, [sourceKey]: "" }));
  };

  // quickAddMilestone helper for the 3 quick inputs in default mode
  const quickAddMilestone = (section: string, inputIndex: number) => {
    const key = `quick-${section}-${inputIndex}`;
    const value = tempText[key]?.trim();
    if (!value) return;
    // ensure section exists
    setUserMilestones((prev) => ({
      ...prev,
      [section]: { ...(prev[section] || {}), [value]: [] },
    }));
    setTempText((prev) => ({ ...prev, [key]: "" }));
    setOpenMilestones((prev) => ({ ...prev, [value]: true }));
  };

  // images
  const images = import.meta.glob("/src/assets/photos/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });
  const getImageSrc = (filename: string) => {
    const path = `/src/assets/photos/${filename}`;
    const imageModule = images[path] as { default: string } | undefined;
    return imageModule?.default || "";
  };

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
          {!isEditingGoal ? (
            <h2 className="flex items-center gap-3 font-inter text-[32px]">
              {showDefaultPrompt ? "Set your career goal" : goalSentence}
              <span
                onClick={() => {
                  setIsEditingGoal(true);
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
                  setState((prev) => ({ ...prev, careerGoal: tempGoal }));
                  setIsEditingGoal(false);
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

      <div className="flex justify-center">
        <div className="w-[1160px]">
          <div className="ml-100">
            <img
              src={getImageSrc("Illustration 1.svg")}
              alt="An illustration of a girl with a backpack on a road starting her journey"
              className="w-[374px] h-[316px]"
            />
          </div>
        </div>
      </div>

      <main className="p-12 mt-3 flex justify-center">
        <div className="w-[1160px]">
          <h1 className="font-nunito font-extrabold text-[48px] text-neutalblack mb-10">
            My Career Roadmap
          </h1>

          {/* iterate every section defined in sectionTitlesMap so default mode shows all sections */}
          {Object.keys(sectionTitlesMap).map((sectionKey) => {
            // If data mode, prefer the initialMilestones keys; otherwise use the sectionKey (default empty)
            const sectionTitle = sectionTitlesMap[sectionKey] || sectionKey;
            const milestones = userMilestones[sectionKey] || {}; // may be empty

            return (
              <section key={sectionKey} className="flex flex-col gap-5 mt-8">
                <button
                  className="w-full flex justify-between items-center font-nunito font-semibold text-[36px] text-neutalblack border-b-2 border-gray-800 gap-212"
                  onClick={() => toggleSection(sectionKey)}
                >
                  <span
                    className={
                      sectionKey === "network" ? "whitespace-nowrap" : ""
                    }
                  >
                    {sectionTitle}
                  </span>
                  <span className="ml-auto">
                    {openSection[sectionKey] ? <UpIcon /> : <DownIcon />}
                  </span>
                </button>

                {openSection[sectionKey] && (
                  <ul className="flex flex-col gap-5">
                    {/* Render milestones for that section (may be empty) */}
                    {Object.entries(milestones).length > 0 ? (
                      Object.entries(milestones).map(([milestone, steps]) => (
                        <li key={milestone}>
                          {/* Milestone header */}
                          <div className="w-full flex justify-between items-center text-[24px] font-inter border bg-white rounded-md border-gray-400 p-2 text-neutalblack hover:bg-gray-100 cursor-default">
                            <span>{milestone}</span>
                            <div className="flex items-center gap-2 ml-auto">
                              <span
                                onClick={() => toggleMilestone(milestone)}
                                className="cursor-pointer"
                              >
                                {openMilestones[milestone] ? (
                                  <UpIcon />
                                ) : (
                                  <DownIcon />
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Steps */}
                          {openMilestones[milestone] && (
                            <ul className="mt-1">
                              {steps.map((step, idx) => {
                                const stepValue =
                                  stepStatus[sectionKey]?.[milestone]?.[
                                    String(idx)
                                  ] ?? 0;
                                const key = `${sectionKey}-${milestone}-${idx}`;
                                return (
                                  <li
                                    key={key}
                                    className="flex items-center gap-2 border mt-4 bg-white p-2 text-inter text-[20px] text-neutralblack rounded-md border-gray-200 hover:bg-gray-100"
                                  >
                                    <div
                                      onClick={() =>
                                        toggleStep(
                                          sectionKey,
                                          milestone,
                                          String(idx)
                                        )
                                      }
                                    >
                                      <StepCheckbox status={stepValue} />
                                    </div>

                                    <span className="flex-1">
                                      {editingStep[key] ? (
                                        <>
                                          <input
                                            value={tempText[key] ?? step}
                                            onChange={(e) =>
                                              setTempText((prev) => ({
                                                ...prev,
                                                [key]: e.target.value,
                                              }))
                                            }
                                            className="outline-none w-271"
                                          />
                                          <button
                                            onClick={() =>
                                              saveStep(
                                                sectionKey,
                                                milestone,
                                                idx
                                              )
                                            }
                                          >
                                            <Pencil />
                                          </button>
                                        </>
                                      ) : (
                                        <span
                                          onClick={() =>
                                            setEditingStep((prev) => ({
                                              ...prev,
                                              [key]: true,
                                            }))
                                          }
                                        >
                                          {step}
                                        </span>
                                      )}
                                    </span>
                                  </li>
                                );
                              })}

                              {/* Add new step */}
                              <li className="flex items-center gap-2 border mt-4 bg-white p-2 text-[20px] rounded-md border-gray-200 hover:bg-gray-100">
                                <StepCheckbox status={0} />
                                <input
                                  className="flex-1 outline-none text-neutralgray"
                                  placeholder="Add a step"
                                  value={
                                    tempText[
                                      `${sectionKey}-${milestone}-new`
                                    ] ?? ""
                                  }
                                  onChange={(e) =>
                                    setTempText((prev) => ({
                                      ...prev,
                                      [`${sectionKey}-${milestone}-new`]:
                                        e.target.value,
                                    }))
                                  }
                                />
                                <button
                                  onClick={() =>
                                    addNewStep(sectionKey, milestone)
                                  }
                                >
                                  <Pencil />
                                </button>
                              </li>
                            </ul>
                          )}
                        </li>
                      ))
                    ) : (
                      // Default empty mode, render three inputs
                      <>
                        {Array.from({ length: QUICK_EMPTY_COUNT }).map(
                          (_, i) => {
                            const quickKey = `quick-${sectionKey}-${i}`;
                            return (
                              <div
                                key={quickKey}
                                className="flex items-center gap-3 border bg-white rounded-md border-gray-400 p-2 hover:bg-gray-100"
                              >
                                <input
                                  className="flex-1 outline-none text-[24px] text-neutralgray hover:bg-gray-100"
                                  placeholder={`Add a milestone`}
                                  value={tempText[quickKey] ?? ""}
                                  onChange={(e) =>
                                    setTempText((prev) => ({
                                      ...prev,
                                      [quickKey]: e.target.value,
                                    }))
                                  }
                                />
                                <button
                                  onClick={() =>
                                    quickAddMilestone(sectionKey, i)
                                  }
                                  className="text-blue-600 font-bold"
                                  // aria-label={`Add milestone quick ${i + 1}`}
                                >
                                  <Pencil />
                                </button>
                              </div>
                            );
                          }
                        )}
                      </>
                    )}

                    {/* Add new milestone */}
                    <li className="mt-1 flex items-center gap-3 border bg-white rounded-md border-gray-400 p-3 hover:bg-gray-100">
                      <input
                        className="flex-1 outline-none text-[24px] text-neutralgray"
                        placeholder="Add a milestone"
                        value={tempText[`new-${sectionKey}`] ?? ""}
                        onChange={(e) =>
                          setTempText((prev) => ({
                            ...prev,
                            [`new-${sectionKey}`]: e.target.value,
                          }))
                        }
                      />
                      <button onClick={() => addNewMilestone(sectionKey)}>
                        <Pencil />
                      </button>
                    </li>
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </main>
      <div className="p-12 mt-3 flex justify-center">
        <div className="w-[1160px]">
          <div className="ml-100">
            <img
              src={getImageSrc("Illustration 2.svg")}
              alt="An illustration of a girl with a backpack on a road coming back from her journey"
              className="w-[375px] h-[276px]"
            />
          </div>
          <div>
            {state.selectedSkills.length > 0 && (
              <section className="px-12 mt-8">
                <h2 className="font-nunito font-extrabold text-[48px] mb-10">
                  My Road So Far
                </h2>
                <h3 className="font-inter font-bold text-[25px] mb-7">
                  {" "}
                  Skills & Tools{" "}
                </h3>

                <div className="flex flex-wrap gap-10 mb-10">
                  {state.selectedSkills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sage-gradient text-neutralblack font-inter text-[16px]"
                    >
                      <CheckIcon />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
