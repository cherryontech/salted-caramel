import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="text-center mt-30">
        <h1 className="text-[50px] font-extrabold font-nunito text-neutralblack">
          Find your next step, together
        </h1>
        <h2 className="mt-1 font-inter font-light text-[27px]">
          {" "}
          Explore real career paths and see what feels right for you
        </h2>
        <div className="flex gap-5 justify-center mt-5 mb-25 font-inter text-[16px] font-light">
          <button>Explore Careers</button>
          <button className="bg-salmon text-white">Start My Dashboard</button>
        </div>
      </div>
      <div className="bg-blue flex justify-center p-13 gap-8">
        <img className="h-80 w-120" src="test.jpg" alt="media1" />
        <img className="h-80 w-120" src="test.jpg" alt="media2" />
      </div>
    </>
  );
}

export default App;
