"use client";
import React, { useEffect, useState } from 'react';

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

        let revealTimer: number | undefined;
        let holdTimer: number | undefined;
        let obfTimer: number | undefined;

        // start with fully random
        setDisplay(randomString(n));

        // reveal left-to-right
        let i = 0;
        revealTimer = window.setInterval(() => {
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

    return <p className="text-purple-700 text-6xl mb-4">{display}</p>;
}

export default function Home() {
    return (
        <div className="container mx-auto h-screen">
            <div className="flex justify-center align-center flex-col h-full ">
                <h1 className="text-8xl font-bold mb-4 font-rounded">Hi, I'm<br />Arthur Serret</h1>
                <Typing words={["Java Developer", "Full-Stack Developer", "SQL Developer", "Docker Rookie"]} intervalMs={10000} />
                <p className="text-lg text-gray-700 w-2/6 font-rounded">
                    I’m a student developer with over 4 years of experience, having started my journey in 2020 during the COVID lockdown. Over the years, I’ve worked on a variety of projects, exploring different technologies and languages such as C, Java, JavaFX, PHP, Flutter, Kotlin, and more. My expertise lies in creating efficient, user-friendly applications, ranging from backend solutions to mobile apps. I’m passionate about learning, building scalable systems, and continuously improving my skills to deliver high-quality results.
                </p>
            </div>
        </div>
    );
}