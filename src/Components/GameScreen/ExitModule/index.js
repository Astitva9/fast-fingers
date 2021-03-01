import React from "react";
import { Row, Col } from "react-bootstrap";
import "../index.css";
import tryAgain from '../../../assets/images/try-again-btn.png';
import {formatTimeLeft} from '../../../utils'

const ExitModule = ({
  startGame,
  resetGameWord,
  currentTotalScore,
  playAgainOnclick,
}) => {
  const startNewGame = () => {
    resetGameWord();
    startGame(true);
    playAgainOnclick(currentTotalScore);
  };

  return (
    <div className="text-center exit-main-block">
      <Row>
        <Col>
          <h2>GAME SCORE</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <h1 className="high-score">{formatTimeLeft(currentTotalScore)}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>NEW HIGH SCORE</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="play-agn-btn" onClick={startNewGame}>
            <img
              src={tryAgain}
              alt="Try Again"
              className="try-again-icon"
            />
            PLAY AGAIN
          </h2>
        </Col>
      </Row>
    </div>
  );
};

export default ExitModule;
