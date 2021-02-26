import React from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import "./index.css";
import keyBoardImage from '../../assets/images/keyboard-FF.png';
import playIcon from '../../assets/images/play-btn-FF.png';


const StartGameScreen = () => {


  return (
    <Container fluid>
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
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                    as="select"
                    className="select-field"
                    name="difficultyLevel"
                    value={''}
                    onChange={''}
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
    </Container>
  );
};

export default StartGameScreen;
