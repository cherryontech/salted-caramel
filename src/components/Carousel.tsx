import { Children, useState } from "react";
import BackArrowIcon from "../assets/icons/BackArrow";
import RightArrowIcon from "../assets/icons/RightArrow";

interface Carousel {
  children: React.ReactNode;
}

const Carousel: React.FC<Carousel> = ({ children }) => {
  const [pagePosition, setPagePosition] = useState(0);
  const totalPages = Children.count(children);

  const back = () => {
    if (pagePosition > 0) {
      setPagePosition(pagePosition - 1);
    }
  };

  const next = () => {
    if (pagePosition < totalPages - 1) {
      setPagePosition(pagePosition + 1);
    }
  };

  return (
    <div className="relative w-full flex flex-col justify-between gap-13">
      {/* Slide/Page Info */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="flex transition-transform duration-300 h-full"
          style={{ transform: `translateX(-${pagePosition * 100}%)` }}
        >
          {Children.map(children, (child) => (
            <div className="w-full flex-shrink-0 h-full">{child}</div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-6 mb-6">
        {/* DOTS */}
        <div className="flex gap-3 mr-125 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full ${
                index === pagePosition ? "bg-sage-gradient" : "bg-neutralblack"
              }`}
            />
          ))}
        </div>
        {/* NAV BUTTONS */}
        <button
          onClick={back}
          disabled={pagePosition === 0}
          className="flex items-center gap-3 mt-1"
        >
          <BackArrowIcon />
          Back
        </button>
        <button
          onClick={next}
          disabled={pagePosition === totalPages - 1}
          className="bg-sage-gradient border rounded-md p-2 flex items-center gap-2"
        >
          <span className="ml-3">Next</span>
          <RightArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
