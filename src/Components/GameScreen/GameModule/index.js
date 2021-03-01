import React from "react";
import { Row, Col } from "react-bootstrap";
import CountDownTimer from "./CountDownTimer";
import Score from "./Score";
import GameWord from "./GameWord";
import "../index.css";

const GameModule = ({
  startgame,
  gameWord,
  onWordChange,
  inputValue,
  timervalue,
  getScore,
  totalScoreArray,
}) => {
  return (
    <Row className="gm-main-row">
      <Col sm={3}>
        <Score totalScoreArray={totalScoreArray} />
      </Col>
      <Col sm={6} className="game-block text-center">
        <Row>
          <Col>
            <CountDownTimer
              startgame={startgame}
              timeLimit={timervalue}
              currentWord={gameWord}
              getScore={getScore}
            />
          </Col>
        </Row>
        <Row>
          <Col className="word-suggestion">
            <GameWord gameWord={gameWord} inputValue={inputValue} />
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              className="answer-field"
              value={inputValue}
              onChange={onWordChange}
              autoFocus={true}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default GameModule;
