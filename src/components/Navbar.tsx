import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-end gap-6 w-full pr-10 font-inter text-[16px] font-light">
      <NavLink to="/" className="mb-9 pt-1 pb-1">
        Home
      </NavLink>
      <NavLink to="/community" className="mb-9 pt-1 pb-1">
        Community
      </NavLink>
      <NavLink to="/roadmaps" className="mb-9 pt-1 pb-1">
        Roadmaps
      </NavLink>
      <NavLink to="/about" className="mb-9 pt-1 pb-1">
        About
      </NavLink>
      <NavLink to="/dashboard">
        <button className="bg-salmon-gradient mb-9 pt-1 pr-8 pl-7 pb-1 rounded text-white">
          My Dashboard
        </button>
      </NavLink>
    </nav>
  );
};
export default NavBar;
