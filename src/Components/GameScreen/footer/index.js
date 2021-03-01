import React from "react";
import { Row, Col } from "react-bootstrap";
import crossIcon from '../../../assets/images/cross-sign.png';
 
const Footer = ({ stopMainGame }) => {
  return (
    <Row className="footer">
      <Col>
        <h4 className="footer-heading" onClick={stopMainGame}>
          <img
            src={crossIcon}
            alt="Exit"
            className="exit-icon"
          />
          STOP GAME
        </h4>
      </Col>
    </Row>
  );
};

export default Footer;
