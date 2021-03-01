import React, { useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import GameModule from "./GameModule";
import ExitModule from "./ExitModule";
import "./index.css";

const GameScreen = ({
  gameWord,
  onWordChange,
  inputValue,
  timerValue,
  resetGameWord,
  getScore,
  scoreArray,
  stopMainGame,
  setCurrentTotalScore,
  currentTotalScore,
  playAgainOnclick,
  totalScoreArray,
}) => {
  let mainModule = "";

  const [singleGameStarted, setSingleGameStarted] = useState(true);

  useEffect(() => {
    let totalScore = scoreArray.reduce((a, b) => a + b, 0);

    setCurrentTotalScore(totalScore);
    return () => {
      setCurrentTotalScore(0);
    };
  }, [scoreArray, setCurrentTotalScore]);

  if (singleGameStarted)
    mainModule = (
      <GameModule
        startgame={setSingleGameStarted}
        gameWord={gameWord}
        onWordChange={onWordChange}
        inputValue={inputValue}
        timervalue={timerValue}
        getScore={getScore}
        totalScoreArray={totalScoreArray}
      />
    );
  else
    mainModule = (
      <ExitModule
        startGame={setSingleGameStarted}
        resetGameWord={resetGameWord}
        currentTotalScore={currentTotalScore}
        playAgainOnclick={playAgainOnclick}
      />
    );

  return (
    <div className="">
      <Header currentTotalScore={currentTotalScore} />
      {mainModule}
      <Footer stopMainGame={stopMainGame} />
    </div>
  );
};

export default GameScreen;
