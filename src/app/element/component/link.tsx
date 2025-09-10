import { IconType } from "react-icons/lib";

export default  function links(href: string, Text: IconType) {
    return (
        <a href={href} target="_blank" className="text-2xl m-2 p-2 text-gray-900 hover:text-gray-500 transition-colors duration-300 flex items-center justify-center">
            {<Text />}
        </a>
    );
};