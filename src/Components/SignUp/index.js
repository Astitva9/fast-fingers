import React, { useState } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import "./index.css";
import keyBoardImage from "../../assets/images/keyboard-FF.png";
import { callApi } from "../../utils/utilityFunctions";
import { APISignup } from "../../utils/APIUrls";
import { toast } from 'react-toastify';
import {Redirect} from 'react-router-dom';

const INITIAL_STATE = {
  userName: "",
  userEmail: "",
  userPassword: "",
};

const SignUp = () => {
  
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState(INITIAL_STATE);

  const { userName, userEmail, userPassword } = formData;

  const onchange = async (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = async (e) => {
    e.preventDefault();

    let body = {
      EMAIL: userEmail,
      PASSWORD: userPassword,
      USERNAME: userName,
    };

    var config = {
      method: "post",
      url: APISignup,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    const result = await callApi(config);
   
    if(result.status === 200) {
        
        toast('Successfully Signed Up');

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
                <Form.Group controlId="formBasicName">
                  <Form.Control
                    type="text"
                    placeholder="Type Your Name"
                    className="name-field"
                    name="userName"
                    value={userName}
                    onChange={onchange}
                    required={true}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
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
                  Sign Up
                </button>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
};

export default SignUp;
