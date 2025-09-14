import link from "./link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function links() {
    return (
        <motion.div className="left-[2.5%] bottom-0 fixed z-10" whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 100 }} transition={{ duration: 1 }}>
            {link("https://github.com/Infuseting", FaGithub)}
            {link("https://www.linkedin.com/in/arthur-serret-b08b2036b/", FaLinkedin)}
            <div className="block w-1 h-[90px] mx-auto my-auto bg-gray-600"></div>
        </motion.div>
    )
}