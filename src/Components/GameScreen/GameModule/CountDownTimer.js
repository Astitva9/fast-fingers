import React,{useState, useEffect, useRef} from "react";
import './CountDownTimer.css';

function formatTimeLeft(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

const CountDownTimer= ({
  startgame,
  timeLimit,
  currentWord,
  getScore
}) => {

    const timerId = useRef();
    const pathRef = useRef();
    const [timeToBeShown, setTimeToBeShown] = useState(formatTimeLeft(timeLimit));
    const [strokeDashArray, setStrokeDashArray] = useState('283');
    const FULL_DASH_ARRAY = 283;
    let timePassed = 0;
    let timeLeft = timeLimit;
    let ms = 0;

    function calculateTimeFraction() {
      const rawTimeFraction = timeLeft / timeLimit;
      return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
      const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      setStrokeDashArray(circleDasharray);
    }
        
    function startTimer() {
      timerId.current = setInterval(() => {
        ms += 1;
        if (ms >= 10) {
          timePassed += 1;
          timeLeft = timeLimit - timePassed;
          ms = 0;
        }
  
        if (timeLeft <= 0) {
          clearInterval(timerId.current);
          startgame(false);
        }
        setCircleDasharray();
        getScore(timePassed)
        setTimeToBeShown(formatTimeLeft(timeLeft));
      }, 100);
    }
  

    useEffect(() => {
  
      startTimer();
  
      return () => {
        clearInterval(timerId.current);
        setTimeToBeShown();
        setStrokeDashArray('283');
      };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWord]);
  

    return (
      <div className="timerContainer">
        <div className="base-timer text-center">
        <svg
          className="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="base-timer__circle">
            <circle
              className="base-timer__path-elapsed"
              cx="50"
              cy="50"
              r="45"
            />
            <path
              id="base-timer-path-remaining"
              strokeDasharray={strokeDashArray}
              className="base-timer__path-remaining"
              ref={pathRef}
              d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0
                "
            ></path>
          </g>
        </svg>
        <span
          id="base-timer-label"
          className="base-timer__label"
          style={{ color: "white" }}
        >
          {timeToBeShown}
        </span>
        
        </div>
      </div>
    );
}


export default CountDownTimer; 
