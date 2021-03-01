import { Form } from "react-bootstrap";
import {DIFFICULTY_DROPDOWN} from '../../constants'
const SelectField = ({formData,onchange}) =>{

    let dropDowns = DIFFICULTY_DROPDOWN.map(fields =>{
        return(
            <option key={fields} value={fields}>{fields}</option>
        )
    })

    return (
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
                 {dropDowns}
            </Form.Control>                            
        </Form.Group>
    )
}

export default SelectField;
