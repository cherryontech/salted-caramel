
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa6';


const Footer = () => {
    return(
       <footer className="bg-[#C8D6AF] py-10 px-8 md:px-20">
        <div className="max-w-7xl mx-auto grid gridmax-w-7xl mx-auto flex flex-wrap justify-between items-start gap-10-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo + Socials */}
            <div>
                <div className="flex items-center gap-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 6m0 0l-6 6m6-6H4.5" />
                </svg>
            
                <span className="font-semibold text-lg">All Roads</span>
            </div>

            <div className="flex items-center gap-4 text-xl">
                <FaXTwitter className="cursor-pointer hover:opacity-70" />
                <FaInstagram className="cursor-pointer hover:opacity-70" />
                <FaYoutube className="cursor-pointer hover:opacity-70" />
                <FaLinkedin className="cursor-pointer hover:opacity-70" />
            </div>
            </div>


            {/* Text Strong */}
            <div>
                <h3 className="font-semibold mb-4">Text Strong</h3>
                <ul className="space-y-2 text-sm">
                    <li>UX Design</li>
                    <li>Software Development</li>
                    <li>Content Development</li>
                    <li>Product Management</li>
                    <li>Creative Careers</li>
                    <li>Sustainable Careers</li>
                    <li>Community Impact Careers</li>
                    <li>Entrepreneurship</li>
                </ul>
            </div>


            {/* Contribute */}
            <div>
                <h3 className="font-semibold mb-4">Contribute</h3>
                <ul className="space-y-2 text-sm">
                    <li>Mentor others</li>
                    <li>Share your knowledge</li>
                    <li>Add a roadmap</li>
                    <li>Grow your network</li>
                </ul>
            </div>


            {/* Resources */}
            <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
                <li>Blog</li>
                <li>Best practices</li>
                <li>How-to guides</li>
            </ul>
            </div>
        </div>
    </footer> 
        
    );
};

export default Footer;
