import React,{useState,useEffect} from 'react';
import { Row, Col} from 'react-bootstrap';
import userIcon from '../../../assets/images/user-icon.png';
import platAgainIcon from '../../../assets/images/try-again-btn.png'
import {formatTimeLeft} from '../../../utils'

const Header = ({currentTotalScore}) => {

    const [currentScore, setCurrentScore] = useState(0);

    useEffect(() => {
        setCurrentScore(currentTotalScore);
        return () => {
            setCurrentScore(0);
        }
    }, [currentTotalScore]);

    return (
        <Row>
            <Col sm={9} className="top-block-1">
            
                <h3 className="top-heading-1">
                    <img src={userIcon} alt="User Icon" className="user-icon" />
                    Welcome To Fast Fingers
                </h3>

                <h4 className="top-heading-2">
                    <img src={platAgainIcon} alt="Level Icon" className="level-icon" />
                    {localStorage.difficultyLevel.toUpperCase()}
                </h4>
            
            </Col>
            <Col sm={3} className="top-block-2">
            
                <h3 className="top-heading-1">      
                    FAST FINGERS  
                </h3>

                <h4 className="top-heading-2">
                    SCORE : {formatTimeLeft(currentScore)}
                </h4>
            
            </Col>
        </Row>
    );
}

export default Header;