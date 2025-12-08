
const getImageSrc = (filename: string) => {
    return `/src/assets/photos/${filename}`;
};

const Specialization = () => {
    return (
        <div className="flex items-center self-stretch p-3 gap-[100px]">
            
            {/* Left Content */}
            <aside className="flex flex-col">
                <img src={getImageSrc("Specializations.svg")} className="slef-stretch h-[304.751px]"/>

                <p className="flex items-center self-stretch mt-[10px] mb-[10px]">
                    Every detail helps us personalize your path.
                </p>

            </aside>

            {/* Right content */}
            <aside className="flex flex-col">
                <h1 className="self-stretch text-neutralblack text-[48px] font-semibold">
                    Build Your Dashboard
                </h1>

                <p className=" gap-[20px] font-[24px] text-neutralblack-400 font-inter">
                    Do you have a specialization in mind?
                </p>


            </aside>
        </div>
    )
};

export default Specialization;