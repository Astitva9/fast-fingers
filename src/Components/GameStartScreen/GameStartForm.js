import { Form } from "react-bootstrap";
import playIcon from '../../assets/images/play-btn-FF.png';
import LoginLayout from "../layout/LoginLayout";
import SelectField from "../FormFields/SelectField"
const GameStartForm = ({submitUserData,formData,onchange}) =>{
    return (
        <LoginLayout>
          <h2>Welcome!!</h2>
            <Form onSubmit={submitUserData}>

              <SelectField 
                formData={formData}
                onchange={onchange}
              />
              
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
