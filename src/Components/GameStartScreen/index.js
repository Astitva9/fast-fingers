import React,{useState,useEffect} from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import "./index.css";
import keyBoardImage from '../../assets/images/keyboard-FF.png';
import playIcon from '../../assets/images/play-btn-FF.png';
import { EASY, MEDIUM, HARD, MINIMUM_TIME, DIFFICULTY_FACTOR_INC } from "../../constants";
import { getWordFromDictionary } from "../../utils";
import GameScreen from "../GameScreen";
import {storeFinalUserScore, getAllFinalScore} from '../../utils/index'

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
    let newWord = null;
    let timeForWord = 0;
    if (localStorage.difficultyLevel === MEDIUM.VALUE) {
      newWord = await getWordFromDictionary(5,8);
      timeForWord = Math.round(newWord.length / difficultyFactor);
    } else if (localStorage.difficultyLevel === HARD.VALUE) {
      newWord = await getWordFromDictionary(8,25);
      timeForWord = Math.round(newWord.length / difficultyFactor);
    } else {
      newWord = await getWordFromDictionary(2,5);
      timeForWord = Math.round(newWord.length / difficultyFactor);
    }
    let maxTimeForWord = Math.max(timeForWord, 2);

    setInputValue("");

    setTimerValue(maxTimeForWord);

    setGameWord(newWord);
  };

  

  useEffect(() => {
    if (
      localStorage.difficultyLevel &&
      gameStarted === true
    ) {
      setFormData({
        difficultyLevel: localStorage.difficultyLevel
          ? localStorage.difficultyLevel
          : EASY.VALUE,
      });

      const generateWordDifficultyWise = async () => {
        let newWord = null;
        let timeForWord = 0;
        if (localStorage.difficultyLevel === MEDIUM.VALUE) {
          setDifficultyFactor(MEDIUM.DIFFICULTY_FACTOR);
          newWord = await getWordFromDictionary(5,8);
          timeForWord = Math.round(newWord.length / MEDIUM.DIFFICULTY_FACTOR);
        } else if (localStorage.difficultyLevel === HARD.VALUE) {
          setDifficultyFactor(HARD.DIFFICULTY_FACTOR);
          newWord = await getWordFromDictionary(8,25);
          timeForWord = Math.round(newWord.length / HARD.DIFFICULTY_FACTOR);
        } else {
          setDifficultyFactor(EASY.DIFFICULTY_FACTOR);
          newWord = await getWordFromDictionary(2,5);
          timeForWord = Math.round(newWord.length / EASY.DIFFICULTY_FACTOR);
        }

        let maxTimeForWord = Math.max(timeForWord, 2);

        if (maxTimeForWord >= MINIMUM_TIME) setTimerValue(maxTimeForWord);
        else setTimerValue(MINIMUM_TIME);

        setGameWord(newWord);
      };

      const getAllScore = async() =>{
        const scores = await getAllFinalScore(localStorage.getItem("userId"))
        setTotalScoreArray(scores)
      }

      getAllScore();

      generateWordDifficultyWise();
    }

    return () => {};
  }, [gameStarted]);

  const getScore = (currentTimerValue) => {
    setCurrentTimerValue(currentTimerValue);
  };

  const onWordChange = (e) => {
    e.persist();
    if (e.target.value.toUpperCase() === gameWord) {
      //Increase the difficulty factor by  0.01 on success
      const _difficultyFactor = difficultyFactor + DIFFICULTY_FACTOR_INC;

      setDifficultyFactor(_difficultyFactor);

      let level;
      if (_difficultyFactor >= EASY.DIFFICULTY_FACTOR && _difficultyFactor < MEDIUM.DIFFICULTY_FACTOR) level = EASY.VALUE;
      else if (_difficultyFactor >= MEDIUM.DIFFICULTY_FACTOR && _difficultyFactor < HARD.DIFFICULTY_FACTOR)
        level = MEDIUM.VALUE;
      else level = HARD.DIFFICULTY_FACTOR;

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

    setTheScoreArray([]);

    storeFinalUserScore(localStorage.getItem("userId"),currentScore);
  };

  let ScreenComponent = "";

  if (!gameStarted)
    ScreenComponent = (
    
    <div>
      <Row className="welcome-row">
        <Col className="welcome-col">
          <img
            src={keyBoardImage}
            alt="Fast Finger"
            className="welcome-banner"
          />
          <h2>Fast Fingers</h2>
          <div className="separator">The Ultimate Typing Game </div>
        </Col>
      </Row>

      <Row className="welcome-form-row">
        <Col className="welcome-form-col">
        <h2>Welcome!!</h2>
          <Form onSubmit={submitUserData}>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                    as="select"
                    className="select-field"
                    name="difficultyLevel"
                    value={formData.difficultyLevel}
                    onChange={onchange}
                    required={true}
                >
                    <option value="">Select Difficulty Level</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </Form.Control>
                            
            </Form.Group>
            <button className="start-game-btn" type="submit">
              <img
                src={playIcon}
                alt="Start Icon"
                className="play-icon"
              />
              START GAME
            </button>
          </Form>
        </Col>
      </Row>
    </div>
   
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

  return <Container fluid>{ScreenComponent}</Container>;

};

export default StartGameScreen;
