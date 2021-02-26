import React,{useState} from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import "./index.css";
import keyBoardImage from '../../assets/images/keyboard-FF.png';
import playIcon from '../../assets/images/play-btn-FF.png';
import { toast } from 'react-toastify';
import { callApi } from "../../utils/utilityFunctions";
import { APISignIn } from "../../utils/APIUrls";
import {Redirect} from 'react-router-dom';

const INITIAL_STATE ={
    userEmail:'',
    userPassword:''
}

const WelcomeScreen = () => {

  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState(INITIAL_STATE);

  const { userEmail, userPassword } = formData;

  const onchange = async (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const onsubmit = async (e) => {
    e.preventDefault();

    let body = {
      EMAIL: userEmail,
      PASSWORD: userPassword
    };

    var config = {
      method: "post",
      url: APISignIn,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    const result = await callApi(config);
   
    if(result.status === 200) {
        
        toast('Successfully Logged Up');

        console.log(result);

        localStorage.setItem("token", result.data.token);

        localStorage.setItem("userId", result.data.userID);

        setIsLoggedIn(true);

    }else{
        toast(result.response.data.message);
    }
  };
  
  if(isLoggedIn){

    return (<Redirect to="/start-game" />);

  }else{

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
            <Form onSubmit={onsubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Type Your Email"
                  className="name-field"
                  name="userEmail"
                  value={userEmail}
                  onChange={onchange}
                  required={true}
                />              
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Type Your Password"
                  className="name-field"
                  name="userPassword"
                  value={userPassword}
                  onChange={onchange}
                  required={true}
                />
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
  }
};

export default WelcomeScreen;
