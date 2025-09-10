import link from "./component/link";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function links() {
    return (
        <div className="left-[2.5%] bottom-0 fixed z-10">
            {link("https://github.com/Infuseting", FaGithub)}
            {link("https://www.linkedin.com/in/arthur-serret-b08b2036b/", FaLinkedin)}
            <div className="block w-1 h-[90px] mx-auto my-auto bg-gray-600"></div>
        </div>
    )
}