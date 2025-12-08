
const getImageSrc = (filename: string) => {
    return `/src/assets/photos/${filename}`;
};

const Specialization = () => {
    return (
        <div className="flex items-center self-stretch p-[48px] gap-[100px]">
            
            {/* Left Content */}
            <aside className="flex flex-col ">
                <img src={getImageSrc("Specialization.svg")} className="slef-stretch h-[304.751px]"/>

                <p className="flex items-center self-stretch mt-[10px] mb-[10px]">
                    Every detail helps us personalize your path.
                </p>

            </aside>

            {/* Right content */}
            <aside>
                <h1 className="self-stretch font-[48px] text-neutralblack-800 font-nunito-sans">
                    Build Your Dashboard
                </h1>

                <body className="font-[24px] text-neutralblack-400 font-inter">
                    Do you have a specialization in mind?
                </body>

                
            </aside>
        </div>
    )
};

export default Specialization;