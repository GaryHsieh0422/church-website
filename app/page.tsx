"use client";

import { motion, useInView } from "framer-motion";
import Hero from "@/components/Hero";
import ScheduleSection from "@/components/schedule";
import Map from "@/components/map";
import { useRef } from "react";

export default function Home() {
  const simpleFade = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  const heroRef = useRef(null);
  const scheduleRef = useRef(null);
  const mapRef = useRef(null);

  // Track when each section is in view, animating only once
  const heroInView = useInView(heroRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px",
  });
  const scheduleInView = useInView(scheduleRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px",
  });
  const mapInView = useInView(mapRef, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px",
  });

  return (
    <main>
      <motion.section
        ref={heroRef}
        variants={simpleFade}
        initial="initial"
        animate={heroInView ? "animate" : "initial"}
        transition={{ duration: 1.0, ease: "easeOut", delay: 0.1}}
      >
        <Hero />
      </motion.section>
      <motion.section
        ref={scheduleRef}
        variants={simpleFade}
        initial="initial"
        animate={scheduleInView ? "animate" : "initial"}
        transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
      >
        <ScheduleSection />
      </motion.section>
      <motion.section
        ref={mapRef}
        variants={simpleFade}
        initial="initial"
        animate={mapInView ? "animate" : "initial"}
        transition={{ duration: 1.0, ease: "easeOut", delay: 0.6 }}
      >
        <Map />
      </motion.section>
    </main>
  );
}
