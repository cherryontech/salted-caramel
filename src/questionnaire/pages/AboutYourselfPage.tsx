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
  const images = import.meta.glob("/src/assets/photos/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });
  const getImageSrc = (filename: string) => {
    const path = `/src/assets/photos/${filename}`;
    const imageModule = images[path] as { default: string } | undefined;
    return imageModule?.default || "";
  };

  return (
    <div className="flex ml-15 gap-50">
      {/* LEFT CONTENT */}
      <aside>
        <img
          src={getImageSrc("Layer_2.png")}
          alt=""
          className="w-[327px] h-[263px]"
        />

        <p className="text-sm text-gray-700 px-2 text-center mt-4">
          You're already taking the first step toward clarity.
        </p>
      </aside>

      {/* RIGHT CONTENT */}
      <div className="flex-1">
        <h1 className="text-3xl font-extrabold mb-2 text-[48px] text-nunito">
          Tell us about yourself
        </h1>
        <div className="mt-4">
          <span className="font-bold text-[24px] text-nunito">First Name</span>
          <br />
          <span>Enter your name</span>
        </div>
        <h2 className="text-3xl font-bold mb-2 mt-5">Career Stage</h2>
        <p className="font-medium mb-6">
          This information helps personalize your dashboard.
        </p>

        <ul className="space-y-4">
          {education.map(({ level, description }, i) => (
            <li
              key={i}
              className="border rounded-lg p-4 hover:border-black cursor-pointer"
            >
              <h3 className="font-semibold">{level}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutYourselfPage;
