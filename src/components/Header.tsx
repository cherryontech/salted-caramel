import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="bg-sage-gradient pt-10">
      <header className="sticky mx-auto flex w-full justify-content">
        <NavLink to="/" className="flex">
          <Logo />
          <span className="font-nunito font-bold ml-2 whitespace-nowrap text-[20px]">
            {" "}
            All Roads
          </span>
        </NavLink>
        <Navbar />
      </header>
    </div>
  );
};
export default Header;
