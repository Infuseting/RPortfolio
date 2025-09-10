import link from "./component/link";

export default function links() {
    return (
        <div className="right-[2.5%] top-0 right-0 fixed z-10 w-[48px]">
            <div className="block w-1 h-[90px] mx-auto my-auto bg-gray-600"></div>
            <a href="mailto:serretarthur@gmail.com" className="m-auto mx-2 text-1xl text-gray-900 hover:text-gray-500 transition-colors duration-300 flex items-center justify-center " style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
                serretarthur@gmail.com
            </a>
        </div>
    )
}