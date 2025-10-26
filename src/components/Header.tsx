import Logo from "./Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="bg-sage pt-10">
      <header className="sticky mx-auto flex w-full justify-content">
        <Logo />
        <Navbar />
      </header>
    </div>
  );
};
export default Header;
