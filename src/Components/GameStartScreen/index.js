import React,{useState,useEffect} from "react";
import "./index.css";
import { EASY, MINIMUM_TIME, DIFFICULTY_FACTOR_INC } from "../../constants";
import { getNewWordAndTime,getLevel } from "../../utils";
import GameScreen from "../GameScreen";
import {storeFinalUserScore, getAllFinalScore, setGameDifficultyFactor} from '../../utils/index'
import GameStartForm from './GameStartForm'
const StartGameScreen = () => {

  const [formData, setFormData] = useState({
    difficultyLevel: EASY.VALUE,
  });

  const [gameStarted, setGameStarted] = useState(false);

  const [difficultyFactor, setDifficultyFactor] = useState(1);

  const [timerValue, setTimerValue] = useState(0);

  const [currentTimerValue, setCurrentTimerValue] = useState(0);

  const [gameWord, setGameWord] = useState("");

  const [inputValue, setInputValue] = useState("");

  const [scoreArray, setTheScoreArray] = useState([]);

  const [currentTotalScore, setCurrentTotalScore] = useState(0);

  const [totalScoreArray, setTotalScoreArray] = useState([]);

  const onchange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitUserData = (event) => {
    event.preventDefault();

    if (formData.difficultyLevel) {
      localStorage.setItem("difficultyLevel", formData.difficultyLevel);
      setGameStarted(true);
    }
  };

  const resetGameWord = async () => {
  
    let {newWord,timeForWord}= await getNewWordAndTime(difficultyFactor);

    let maxTimeForWord = Math.max(timeForWord, MINIMUM_TIME);

    setInputValue("");

    setTimerValue(maxTimeForWord);

    setGameWord(newWord);
  };

  const getAllScore = async() =>{
    const scores = await getAllFinalScore(localStorage.getItem("userId"))
    setTotalScoreArray(scores)
  }

  useEffect(() => {
    if (
      localStorage.difficultyLevel &&
      gameStarted === true
      && gameWord === ""
    ) {
      setFormData({
        difficultyLevel: localStorage.difficultyLevel
          ? localStorage.difficultyLevel
          : EASY.VALUE,
      });

      const generateWordDifficultyWise = async () => {
       
        setGameDifficultyFactor(setDifficultyFactor);

        let {newWord,timeForWord} = await getNewWordAndTime(difficultyFactor);

        let maxTimeForWord = Math.max(timeForWord, 2);

        if (maxTimeForWord >= MINIMUM_TIME) setTimerValue(maxTimeForWord);
        else setTimerValue(MINIMUM_TIME);

        setGameWord(newWord);
      };

      getAllScore();

      generateWordDifficultyWise();
    }

   
  }, [difficultyFactor, gameStarted, gameWord]);

  const getScore = (currentTimerValue) => {
    setCurrentTimerValue(currentTimerValue);
  };

  const onWordChange = async (e) => {
    e.persist();
    if (e.target.value.toUpperCase() === gameWord) {
      //Increase the difficulty factor by  0.01 on success
      const _difficultyFactor = difficultyFactor + DIFFICULTY_FACTOR_INC;

      setDifficultyFactor(_difficultyFactor);

      let level = getLevel(_difficultyFactor);
     
      localStorage.setItem("difficultyLevel", level);

      resetGameWord();

      setTheScoreArray([...scoreArray, currentTimerValue]);
    }
    setInputValue(e.target.value);
  };

  const stopMainGame = async (e) => {
    e.persist();
    setCurrentTotalScore(0);
    setGameStarted(false);
    resetGameWord();
    setDifficultyFactor(EASY.DIFFICULTY_FACTOR);
    setTheScoreArray([]);
   
  };

  const playAgainOnclick = (currentScore) => {
    setCurrentTotalScore(0);

    setInputValue("");

    setTheScoreArray([]);

    getAllScore();

    storeFinalUserScore(localStorage.getItem("userId"),currentScore);
  };

  let ScreenComponent = "";

  if (!gameStarted)
    ScreenComponent = (
    
      <GameStartForm
        submitUserData={submitUserData}
        formData={formData}
        onchange={onchange}
      />
   
    );
  else if(gameWord !== "")
    ScreenComponent = (
      <GameScreen
        gameWord={gameWord}
        onWordChange={onWordChange}
        inputValue={inputValue}
        timerValue={timerValue}
        resetGameWord={resetGameWord}
        getScore={getScore}
        scoreArray={scoreArray}
        stopMainGame={stopMainGame}
        setCurrentTotalScore={setCurrentTotalScore}
        currentTotalScore={currentTotalScore}
        playAgainOnclick={playAgainOnclick}
        totalScoreArray={totalScoreArray}
      />
    );

  return ScreenComponent;

};

export default StartGameScreen;
