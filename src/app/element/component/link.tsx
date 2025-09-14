import { IconType } from "react-icons/lib";
import { motion } from "framer-motion";

export default  function links(href: string, Text: IconType) {
    return (
        <motion.a href={href} target="_blank" className="text-2xl m-2 p-2 text-gray-900 hover:text-gray-500 transition-colors duration-300 flex items-center justify-center" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            {<Text />}
        </motion.a>
    );
};