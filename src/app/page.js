"use client";

import HangmanGame from "./components/HangmanGame";
import MainMenu from "./components/MainMenu";
import useGameStore from "./utils/useGameStore";

export default function Home() {
  const difficulty = useGameStore((state) => state.difficulty);
  
  return (
    <main>
      {difficulty ? <HangmanGame /> : <MainMenu />}
    </main>
  );
}