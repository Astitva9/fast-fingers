import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import keyBoardImage from '../../assets/images/keyboard-FF.png';

const LoginLayout = ({children}) => {

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

          {children}
            
          </Col>
        </Row>
      </div>
      </Container>
    );
  
};

export default LoginLayout;
