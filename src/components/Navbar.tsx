import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex justify-end gap-6 w-full pr-10">
      <NavLink to="/community">Community</NavLink>
      <NavLink to="/roadmaps">Roadmaps</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </div>
  );
};
export default NavBar;
