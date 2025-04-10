"use client";

import useGameStore from "../utils/useGameStore";
import DOMPurify from "isomorphic-dompurify";
import GameBoard from "./GameBoard";

const HangmanGame = () => {
    const difficulty = useGameStore((state) => state.difficulty);
    const labelDifficulty = "difficulty";

    return (
        <div>
            <h1 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(labelDifficulty) }} />
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(difficulty) }} />
            <div>
                <GameBoard />
            </div>
        </div>
    );
};

export default HangmanGame;