"use client";
import React, { useEffect, useState } from 'react';
// Hook pour récupérer la taille de la fenêtre
function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
        function handleResize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return size;
}
import { motion } from "framer-motion";
import { title } from 'process';
type TypingProps = {
    words: string[];
    intervalMs?: number;
};

function Typing({ words, intervalMs = 10000 }: TypingProps) {
    const [display, setDisplay] = useState("");
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const word = words[wordIndex] || "";
        const n = word.length;
        const charInterval = 100;

        const chars =
            "!@#$%^&*()_+[]{}|;:,.<>/?~`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const randomChar = () => chars[Math.floor(Math.random() * chars.length)];
        const randomString = (len: number) => Array.from({ length: len }, () => randomChar()).join("");

        let holdTimer: number | undefined;
        let obfTimer: number | undefined;

        // start with fully random
        setDisplay(randomString(n));

        // reveal left-to-right
        let i = 0;
        const revealTimer = window.setInterval(() => {
            i++;
            setDisplay(word.slice(0, i) + randomString(Math.max(0, n - i)));
            if (i >= n) {
                if (revealTimer) {
                    clearInterval(revealTimer);
                }
                // hold full word for intervalMs
                holdTimer = window.setTimeout(() => {
                    // obfuscate left-to-right (replace left chars with random)
                    let j = 0;
                    obfTimer = window.setInterval(() => {
                        j++;
                        setDisplay(randomString(Math.min(j, n)) + word.slice(Math.min(j, n)));
                        if (j >= n) {
                            if (obfTimer) clearInterval(obfTimer);
                            // ensure fully random shown briefly then advance to next word
                            setDisplay(randomString(n));
                            window.setTimeout(() => {
                                setWordIndex((idx) => (idx + 1) % words.length);
                            }, charInterval);
                        }
                    }, charInterval);
                }, intervalMs);
            }
        }, charInterval);

        return () => {
            if (revealTimer) clearInterval(revealTimer);
            if (holdTimer) clearTimeout(holdTimer);
            if (obfTimer) clearInterval(obfTimer);
        };
    }, [wordIndex, words, intervalMs]);

    return <motion.p whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="text-purple-700 text-6xl mb-4">{display}</motion.p>;
}
export default function Home({ onIntroEnd }: { onIntroEnd?: () => void }) {
    const homeRef = React.useRef<HTMLDivElement | null>(null);
    const [elemSize, setElemSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const update = () => {
            const el = homeRef.current;
            if (el) {
                const r = el.getBoundingClientRect();
                setElemSize({ width: Math.round(r.width), height: Math.round(r.height) });
            } else {
                // fallback to viewport size so we don't stay at 0 before ref is attached
                setElemSize({ width: window.innerWidth, height: window.innerHeight });
            }
        };

        // initial measurement
        update();

        // observe the element if available
        let ro: ResizeObserver | undefined;
        if (homeRef.current) {
            ro = new ResizeObserver(update);
            ro.observe(homeRef.current);
        }

        // also update on window resize as a fallback
        window.addEventListener('resize', update);

        return () => {
            if (ro) ro.disconnect();
            window.removeEventListener('resize', update);
        };
    }, []);

    const { width, height } = elemSize;
    // Remember to attach the ref on your container: <div id="home" ref={homeRef} ...>
    // Animation states
    const [introStep, setIntroStep] = useState(0);
    const [phase, setPhase] = useState<'intro' | 'moveY' | 'moveX' | 'showContent' | 'titleResize'>('intro');
    const [showTyping, setShowTyping] = useState(false);
    const [showDesc, setShowDesc] = useState(false);
    const [alignLeft, setAlignLeft] = useState(false);
    const introWords = ["Hi,", "I'm", "BR", "Arthur", "Serret"];

    useEffect(() => {
        if (phase === 'intro' && introStep < introWords.length) {
            const timer = setTimeout(() => setIntroStep(introStep + 1), 600);
            return () => clearTimeout(timer);
        } else if (phase === 'intro' && introStep === introWords.length) {
            const timer = setTimeout(() => setPhase('moveY'), 1000);
            return () => clearTimeout(timer);
        } else if (phase === 'moveY') {
            const timer = setTimeout(() => setPhase('moveX'), 900);
            return () => clearTimeout(timer);
        } else if (phase === 'moveX') {
            setAlignLeft(true);
            const timer = setTimeout(() => setPhase('showContent'), 900);
            return () => clearTimeout(timer);
        } else if (phase === 'showContent') {
            // Typing appears first
            setTimeout(() => setShowTyping(true), 300);
        }
    }, [introStep, phase]);

    useEffect(() => {
        if (showTyping) {
            setTimeout(() => setShowDesc(true), 1200);
        }
    }, [showTyping]);

    useEffect(() => {
        if (showDesc && onIntroEnd) {
            setTimeout(() => onIntroEnd(), 1200);
        }
    }, [showDesc, onIntroEnd]);

    // Animation values
    const yOffset = -Math.round(height * 0.18);
    let xOffset = 0;
    if (width >= 1260) {
        xOffset = -Math.round(Math.round(width * 0.15));
    } else if (width >= 768) {
        xOffset = -Math.round(Math.round(width * 0.10));

    } else if (width >= 480) {
        xOffset = -Math.round(Math.round(width * 0.05));
    } else {
        xOffset = 0;
    }

    let motionProps = { y: 0, x: 0, opacity: 1 };
    if (phase === 'moveY') motionProps = { y: 0, x: 0, opacity: 1 };
    if (phase === 'moveX') motionProps = { y: 0, x: xOffset, opacity: 1 };



    return (
        <div id="home" className="container mx-auto h-screen relative w-fit-content">
            {/* Animated intro title */}
            {(phase !== 'showContent') && (
                <motion.div
                    initial={{ y: 0, x: 0, opacity: 1 }}
                    animate={motionProps}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    className="flex flex-col items-center justify-center h-full absolute left-0 right-0 top-0 bottom-0"
                >
                    <motion.h1
                        id="intro-title"
                        className={`text-8xl font-bold mb-4 font-rounded ${alignLeft ? "text-left" : "text-center"}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {introWords.slice(0, introStep).map((word, i) => (
                            word === "BR"
                                ? <br key={i} />
                                : <motion.span
                                    key={i}
                                    className="inline-block mr-3"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2, duration: 0.35 }}
                                >
                                    {word}
                                </motion.span>
                        ))}
                    </motion.h1>
                </motion.div>
            )}
            {/* Main content appears after intro animation */}
            {phase === 'showContent' && (
                <div className="flex justify-center align-center flex-col h-full">
                    <motion.h1 className="text-8xl font-bold mb-4 font-rounded" initial={{ opacity: 1, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>Hi, I&apos;m<br />Arthur Serret</motion.h1>
                    {showTyping && (
                        <Typing words={["Java Developer", "Full-Stack Developer", "SQL Developer", "Docker Rookie"]} intervalMs={10000} />
                    )}
                    {showDesc && (
                        <motion.p initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-lg text-gray-700 md:w-4/6 lg:3/6 xl:w-2/6 sm:w-full font-rounded">
                            I’m a student developer with over 4 years of experience, having started my journey in 2020 during the COVID lockdown. Over the years, I’ve worked on a variety of projects, exploring different technologies and languages such as C, Java, JavaFX, PHP, Flutter, Kotlin, and more. My expertise lies in creating efficient, user-friendly applications, ranging from backend solutions to mobile apps. I’m passionate about learning, building scalable systems, and continuously improving my skills to deliver high-quality results.
                        </motion.p>
                    )}
                </div>
            )}
        </div>
    );
}