import { Form } from "react-bootstrap";
import playIcon from '../../assets/images/play-btn-FF.png';
import LoginLayout from "../layout/LoginLayout";

const GameStartForm = ({submitUserData,formData,onchange}) =>{
    return (
        <LoginLayout>
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
      </LoginLayout>
    )
}

export default GameStartForm;
