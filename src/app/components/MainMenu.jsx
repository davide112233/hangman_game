"use client";

import { useMutation } from "@tanstack/react-query";
import useGameStore, {fetchRandomWord} from "../utils/useGameStore";
import DOMPurify from "isomorphic-dompurify";
import GameBoard from "./GameBoard";

const difficulties = ["easy", "medium", "hard"];

const MainMenu = () => {
    const setDifficulty = useGameStore((state) => state.setDifficulty);
    const setWord = useGameStore((state) => state.setWord);
    const setGameStage = useGameStore((state) => state.setGameStage);
    const gameStage = useGameStore((state) => state.gameStage);
    const titleGame = "hangman game";
    const errorWordFetching = "an error occured while fetching the word";

    const { mutate: getwWord, isPending, error } = useMutation({
        mutationFn: (difficulty) => fetchRandomWord(difficulty),
        onSuccess: (word, difficulty) => {
            setDifficulty(difficulty);
            setWord(word);
            setGameStage("playing");
        },
    });

    const startGame = (difficulty) => {
        getwWord(difficulty);
    };

    if (gameStage === "playing") return <GameBoard />

    return (
        <div className="main-menu">
            <h1 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(titleGame) }} />
            <div className="difficulty-buttons-container">
                <div className="inner-difficulty-buttons-container">
                    {difficulties.map((level) => (
                        <button className="difficulty-buttons" key={level} onClick={() => startGame(level)} disabled={isPending}>{isPending ? "Loading..." : DOMPurify.sanitize(level)}</button>
                    ))}
                </div>
            </div>
            {error && <p className="error-word-fetching" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(errorWordFetching) }} />}
        </div>
    );
};

export default MainMenu;