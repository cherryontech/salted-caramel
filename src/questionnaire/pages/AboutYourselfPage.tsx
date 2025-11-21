import { useState } from "react";
import { useQuestionnaire } from "../QuestionnaireProvider";

const education = [
  {
    level: "Student",
    description: "You're aiming to start your career.",
  },
  {
    level: "Early Career",
    description: "You have 0-3 years of experience in your field.",
  },
  {
    level: "Mid/senior experience",
    description:
      "You have 4+ years of experience and are growing your expertise.",
  },
  {
    level: "Changing careers",
    description: "You have work experience and are exploring a new direction.",
  },
  {
    level: "Something Else",
    description:
      "You don't see yourslef in one of these categories- no problem!",
  },
];

const AboutYourselfPage = () => {
  const { state, setState } = useQuestionnaire();
  const [nameInput, setNameInput] = useState(state.name ?? ""); // local input state

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value); // update local input immediately
  };

  const handleBlur = () => {
    // update global state when user leaves the input
    setState((prev) => ({ ...prev, name: nameInput }));
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
      <aside>
        <img
          src={getImageSrc("Layer_2.png")}
          alt=""
          className="w-[327px] h-[263px]"
        />

        <p className="text-sm text-gray-700 px-2 text-left mt-4 text-[20px] font-medium font-inter">
          You're already taking the first
          <br />
          step toward clarity.
        </p>
      </aside>

      {/* RIGHT CONTENT */}
      <div className="flex-1">
        <h1 className="text-3xl font-extrabold mb-2 text-[48px] text-nunito tracking-wider leading-long">
          Tell Us About Yourself
        </h1>
        <div className="mt-2">
          <br />
          <label className="block font-bold text-[24px] text-nunito mb-2">
            First Name
          </label>
          <input
            className="border border-gray-300 p-2 w-184 rounded-md bg-white placeholder-lightgray"
            type="text"
            value={nameInput}
            onChange={handleNameInput}
            onBlur={handleBlur} // update global state
            placeholder="Enter your name"
          />
        </div>
        <h2 className="text-3xl font-semibold mb-2 mt-5 text-[24px] text-nunito">
          Career Stage
        </h2>
        <p className="font-inter mb-6 text-[16px]">
          This information helps personalize your dashboard.
        </p>

        {education.map((item) => (
          <div
            key={item.level}
            className="bg-white border border-gray-100 p-3 mb-3 font-inter w-[741px]"
          >
            <label
              htmlFor={item.level}
              className="flex items-start cursor-pointer"
            >
              <input
                type="radio"
                id={item.level}
                name="selection"
                value={item.level}
                onChange={() =>
                  setState((prev) => ({ ...prev, careerStage: item.level }))
                }
                checked={state.careerStage === item.level}
                className="h-3 w-3 mt-1 accent-black cursor-pointer"
              />

              <div className="ml-3">
                <p className="font-semibold text-[16px]">{item.level}</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  {item.description}
                </p>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutYourselfPage;
