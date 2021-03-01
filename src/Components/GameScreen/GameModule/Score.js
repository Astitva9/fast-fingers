import React from "react";
import { Row, Col } from "react-bootstrap";
import { formatTimeLeft } from "../../../utils";

const Score = ({ totalScoreArray }) => {
  let scorePanel = "";

  if (totalScoreArray.length > 0) {
    scorePanel = totalScoreArray.map((singleScore, index) => {
      let isPersonalBest = false;
      if (Math.max(...totalScoreArray) === singleScore.score) {
        isPersonalBest = true;
      }

      return (
        <div className="score-div" key={index}>
          <div className="highest-heading">
            {isPersonalBest === true ? "Personal Best" : ""}
          </div>
          <p className="white-heading">
            Game {index} : {formatTimeLeft(singleScore.score)}
          </p>
        </div>
      );
    });
  }

  return (
    <div className="text-center">
      <div className="scores-box">
        <Row>
          <Col className="score-heading">SCORE BOARD</Col>
          <hr></hr>
        </Row>

        <Row>{scorePanel}</Row>
      </div>
     
    </div>
  );
};

export default Score;
