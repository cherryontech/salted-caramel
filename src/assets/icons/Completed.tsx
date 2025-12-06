const CompletedIcon = () => {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="7.5"
          fill="#FFFCF5"
          stroke="#3E3E3E"
        />
        <rect x="4" y="4" width="16" height="16" rx="4" fill="#E7F9D1" />
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="4"
          fill="black"
          fill-opacity="0.15"
        />
        <line
          y1="-0.714274"
          x2="5.92471"
          y2="-0.714274"
          transform="matrix(0.653351 0.757055 -0.653351 0.757055 6 11.9341)"
          stroke="black"
          stroke-width="1.42855"
        />
        <line
          y1="-0.714274"
          x2="12.4419"
          y2="-0.714274"
          transform="matrix(0.653351 -0.757055 0.653351 0.757055 9.87109 16.4192)"
          stroke="black"
          stroke-width="1.42855"
        />
      </svg>
    </div>
  );
};

export default CompletedIcon;
