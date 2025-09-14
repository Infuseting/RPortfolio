import { IconType } from "react-icons"
import { FaSchool, FaMoneyCheck } from "react-icons/fa"
import { motion } from "framer-motion";


let timeDif : number = 0;
let lastTimestamp : number = 0;

export default function Studies() {
    return (
        <div className="container mx-auto h-screen">
            <section id="timeline-section" className="py-16">
            <div className="mx-auto w-[90%] max-w-[1280px]">
                <h2 className="w-full text-center text-6xl mb-4 text-purple-700 ">Studies & Work</h2>
                <div id="timeline" className="relative">
                    {/* center spine */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[5px] bg-purple-700 h-full z-0" />

                    <ol className="flex flex-col gap-8 list-none p-0 m-0 py-20">
                        {timelineEl("Improovz", "Caen", "Web Freelance, sur differents domaines (PHP Natif, Symfony, Wordpress, ...)", Date.UTC(2024, 12, 5), NaN, FaMoneyCheck, [], false, "https://improovz.infuseting.fr/")}
                        {timelineEl("BUT Informatique", "Caen", "BUT Informatique OPTION B", Date.UTC(2024, 9, 2), NaN, FaSchool, [], true, NaN)}
                        {timelineEl("Lycée Les Fontenelles", "Louviers", "BAC NSI, Maths et Physique-Chimie + Options Maths Expert", Date.UTC(2022, 9, 2), Date.UTC(2024, 7, 6), FaSchool, [], false, NaN)}
                    </ol>
                </div>
            </div>
        </section>
        </div>
    )
}

function monthString(monthNumber : number) {
    let month = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]
    return month[monthNumber];
}

function timelineEl(name : string, city : string, description : string, date_start: number, date_end: number, Icon : IconType, releted_stack : any[], way : boolean, url : string) {
    let dateEl = null;
        
    if (date_start && date_end) {
        let startDate : Date = new Date(date_start)
        let endDate : Date = new Date(date_end)
        if (lastTimestamp !== endDate.getTime()) {
            timeDif += 20;
        }
        lastTimestamp = endDate.getTime();  
        dateEl = monthString(startDate.getUTCMonth()) + " " + startDate.getUTCFullYear() + " - " + monthString(endDate.getUTCMonth()) + " " + endDate.getUTCFullYear()
    }
    else if (date_start) {
        let startDate : Date =  new Date(date_start)
        if (lastTimestamp !== startDate.getTime()) {
            timeDif += 20;
        }
        lastTimestamp = startDate.getTime();
        dateEl = monthString(startDate.getUTCMonth()) + " " + startDate.getUTCFullYear()
    }

    return (
        <div className={`flex ${way ? "md:self-end" : "md:self-start"} w-full z-10 items-center`}>
            <div className="left-0 hidden md:block absolute md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-purple-700 bg-white z-10 " />
            <motion.li className={`bg-white p-8 shadow-lg w-11/12 md:w-[45%] ${way ? "md:ml-auto" : "md:mr-auto"}`}  whileHover={{ scale: 1.1 }} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 100 }} transition={{ duration: 0.5, delay: timeDif / 100 }}>
                <div className={`flex flex-row justify-between items-center mb-4`}>
                    <Icon className="text-purple-700 w-10 h-10 order-first"/>
                    <h3 className={`text-2xl font-semibold ${way ? "text-right" : "sm:text-left md:text-right"}`}>{url ? <a href={url}>{name}</a> : name}</h3>
                </div>
                
                <p className="text-lg mb-4">
                    {description}
                </p>

                <div className={`flex flex-row justify-between items-center mb-4 ${way ? "flex-row-reverse" : "flex-row"}`}>
                    <p className="text-xl">{dateEl}</p>
                    <p className="text-xl">{city}</p>
                </div>
                
            </motion.li>
        </div>
    )

}