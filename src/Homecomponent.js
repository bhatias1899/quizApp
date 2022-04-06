import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Quizcomponent from "./QuizComponent";
import "./Homecomponent.css";

const Homecomponent = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [max, setMax] = useState(10);
  const [operator, setOperator] = useState("");
  const [maxQuestions, setMaxQuestions] = useState(20);

  const handleStartQuizButtonClick = () => {
    setQuizStarted(true);
  };
  const handleRange = (ev, cat) => {
    setMax(ev.target.value);
  };
  const handleOperatorSelection = (ev) => {
    let operatorsAllowed = ["+", "-", "*", "/", "%"];
    if (
      (ev.target.value?.length === 1 &&
        operatorsAllowed.includes(ev.target.value)) ||
      ev.target.value === ""
    ) {
      setOperator(ev.target.value);
    }
  };
  return (
    <div className="Homecomponent-container">
      {!quizStarted ? (
        <>
          Select the range of operands
          <div className="range-selection">
            <div className="min-max">
              <label for="lname" className="input-label">
                0 to*
              </label>
              <input
                type="number"
                className="input-range"
                onChange={(ev) => {
                  handleRange(ev);
                }}
                value={max}
                name="Maximum"
              />
            </div>
          </div>
          <div className="range-selection">
            <div className="min-max">
              <label className="input-label">Operator :</label>
              <input
                type="text"
                value={operator}
                onChange={(ev) => {
                  handleOperatorSelection(ev);
                }}
                className="input-range"
                name="Maximum"
              />
            </div>
          </div>
          <div className="range-selection">
            <div className="min-max">
              <label className="input-label">Number of questions* :</label>
              <input
                type="number"
                value={maxQuestions}
                onChange={(ev) => {
                  setMaxQuestions(ev.target.value);
                }}
                className="input-range"
                name="Maximum"
              />
            </div>
          </div>
          <button
            className={
              max > 0 && maxQuestions > 0
                ? "start-quiz-button"
                : "start-quiz-button-disabled"
            }
            onClick={() => {
              max > 0 && maxQuestions > 0 && handleStartQuizButtonClick();
            }}
          >
            Start Quiz
          </button>
        </>
      ) : (
        <Quizcomponent
          max={max}
          operator={operator}
          maxQuestions={maxQuestions}
        />
      )}
    </div>
  );
};

export default Homecomponent;
