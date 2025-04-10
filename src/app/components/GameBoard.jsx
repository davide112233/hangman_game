"use client";

import useGameStore from "../utils/useGameStore";
import { useEffect, useState } from "react";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const maxErrors = 6;

const GameBoard = () => {
  const word = useGameStore((state) => state.word);
  const guesses = useGameStore((state) => state.guesses);
  const addGuess = useGameStore((state) => state.addGuess);
  const resetGame = useGameStore((state) => state.resetGame);

  const [status, setStatus] = useState("playing"); // manage the state of playing using zustand

  const wrongGuesses = guesses.filter((letter) => !word.includes(letter));
  const correctGuesses = word
    .split("")
    .filter((letter) => guesses.includes(letter));

  // Check for win or loss
  useEffect(() => {
    const isWin = word.split("").every((letter) => guesses.includes(letter));
    const isLose = wrongGuesses.length >= maxErrors;

    if (isWin) setStatus("won");
    else if (isLose) setStatus("lost");
  }, [guesses, word]);

  const handleGuess = (letter) => {
    if (status === "playing") {
      addGuess(letter);
    }
  };

  // Keyboard input handler
  useEffect(() => {
    const handleKeyDown = (event) => {
      const letter = event.key.toLowerCase();
      if (alphabet.includes(letter) && !guesses.includes(letter) && status === "playing") {
        handleGuess(letter);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guesses, status]);

  const renderWord = () =>
    word.split("").map((letter, index) => (
      <span
        key={index}
        className="inline-block w-6 text-center text-2xl border-b-2 border-gray-500 mx-1"
      >
        {guesses.includes(letter) ? letter : "_"}
      </span>
    ));

  return (
    <div className="game-board text-center p-6">
      <h2 className="text-3xl mb-4">Guess the Word</h2>
      <div className="flex justify-center space-x-2 mb-6">{renderWord()}</div>

      <div className="grid grid-cols-13 gap-1 justify-center mb-6">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guesses.includes(letter) || status !== "playing"}
            className={`p-2 border rounded ${guesses.includes(letter)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-100 hover:bg-blue-300"
              }`}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="mb-4 text-xl">
        Wrong guesses: {wrongGuesses.join(", ")} ({wrongGuesses.length}/{maxErrors})
      </div>

      {status !== "playing" && (
        <div className="mt-4">
          <h3 className="text-2xl font-semibold text-green-600 mb-2">
            {status === "won" ? "You won! 🎉" : `You lost! 😢 The word was "${word}"`}
          </h3>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={resetGame}
          >
            Back to Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
