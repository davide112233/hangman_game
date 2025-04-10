import { create } from "zustand";
import axios from "axios";

const getWordLength = (difficulty) => {
    switch (difficulty) {
        case "easy": return Math.floor(Math.random() * 2) + 3; // 3–4
        case "medium": return Math.floor(Math.random() * 3) + 5; // 5–7
        case "hard": return Math.floor(Math.random() * 4) + 8; // 8–11
        default: return 5;
    }
};

export const fetchRandomWord = async (difficulty) => {
    const length = getWordLength(difficulty);
    const response = await axios.get(`https://random-word-api.herokuapp.com/word`, {
        params: {
            number: 1,
            length: length,
        },
    });
    return response.data[0].toLowerCase();
};

const useGameStore = create((set) => ({
    difficulty: null,
    word: "",
    gameStage: "menu",
    guesses: [],
    setDifficulty: (level) => set({ difficulty: level }),
    setWord: (word) => set({ word }),
    setGameStage: (stage) => set({ gameStage: stage }),
    addGuess: (letter) => set((state) => ({
        guesses: state.guesses.includes(letter) ? state.guesses : [...state.guesses, letter],
    })),
    resetGame: () => set({
        difficulty: null, word: "", gameStage: "menu", guesses: [],
    }),
}));

export default useGameStore;