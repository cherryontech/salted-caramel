const SkillsPage = () => {
  return (
    <div className="flex ml-15 gap-50">
      {/* LEFT CONTENT */}
      <aside>
        <p className="text-sm text-gray-700 px-3 text-center mt-4 text-[20px] text-left">
          You've learned a lot along the way,
          <br />
          let's capture what you already bring.
        </p>
      </aside>

      {/* RIGHT CONTENT */}
      <div className="flex-1">
        <h1 className="text-3xl font-extrabold mb-2 text-[48px] text-nunito">
          Build Your Dashboard
        </h1>
        <h2 className="text-3xl mb-2 mt-5 text-[24px] text-inter">
          Do you have any of these skills or experiences already?
        </h2>
        <p className="font-medium mb-6">Text.</p>
      </div>
    </div>
  );
};

export default SkillsPage;
