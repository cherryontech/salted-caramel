import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="bg-sage-gradient pt-10">
      <header className="sticky mx-auto flex w-full justify-content">
        <Logo />
        <span className="font-nunito font-bold ml-2 mt-1 whitespace-nowrap">
          {" "}
          All Roads
        </span>
        <Navbar />
      </header>
    </div>
  );
};
export default Header;
