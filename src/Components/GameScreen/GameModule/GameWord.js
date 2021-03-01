import React from "react";
import { WORD_SUCCESS_CODE, WORD_FAIL_CODE } from "../../../constants";

const GameWord = ({ gameWord, inputValue }) => {
  const wordCharacters = gameWord.split("");
  const userInputCharacters = inputValue.split("");
  return (
    <div className="new-word">
      {wordCharacters.map((char, i) => {
        let color;
        if (i < inputValue.length) {
          if (char === userInputCharacters[i].toUpperCase())
            color = WORD_SUCCESS_CODE;
          else color = WORD_FAIL_CODE;
        }
        return (
          <span key={i} style={{ color: color }}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default GameWord;
