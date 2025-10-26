import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="text-center mt-30">
        <h1 className="text-5xl font-bold">Find your next step, together</h1>
        <h2 className="mt-5">
          {" "}
          Explore real career paths and see what feels right for you
        </h2>
        <div className="flex gap-7 justify-center mt-4 mb-21">
          <button>Explore Careers</button>
          <button className="bg-salmon">Start My Dashboard</button>
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
