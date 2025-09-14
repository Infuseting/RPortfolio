"use client"
import links from "./element/component/links";
import email from "./element/component/email";
import Home from "./element/home";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { motion, useScroll } from "motion/react"
import Studies from "./element/studies";
import React, { useState } from "react";
export default function main() {
  const { scrollYProgress } = useScroll()

    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    originX: 0,
                    backgroundColor: "lab(36.1758% 69.8525 -80.0381)",
                }}
            />
            <ScrollLinked />
        </>
    )
  
}




function ScrollLinked() {
  const [showRest, setShowRest] = useState(false);
  return (
    <div className="">
      <div className="mx-[15%]">
        <Home onIntroEnd={() => setShowRest(true)} />
      </div>
      {showRest && (
        <>
          {links()}
          {email()}
          <div className="mx-[15%]">
            <Studies />
          </div>
        </>
      )}
    </div>
  );
}
