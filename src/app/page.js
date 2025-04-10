"use client";

import HangmanGame from "./components/HangmanGame";
import MainMenu from "./components/MainMenu";
import useGameStore from "./utils/useGameStore";
import { motion } from "framer-motion";

export default function Home() {
  const difficulty = useGameStore((state) => state.difficulty);
  
  return (
    <main>
      <motion.div
        key={difficulty ? "game" : "menu"}
        initial={{ opacity: 0 }}
        transition={{ duration: 4.3, type: "spring" }}
        animate={{ opacity: 1 }}
      >
        {difficulty ? <HangmanGame /> : <MainMenu />}
      </motion.div>
    </main>
  );
}