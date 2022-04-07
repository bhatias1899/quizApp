import React, { useEffect, useState } from "react";
import "./QuizComponent.css";

const Quizcomponent = (props) => {
  const [randomNumber, setRandomNumber] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionLogs, setQuestionLogs] = useState([]);

  const [randomOperator, setRandomOperator] = useState("");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    let op = [];

    op[0] = Math.floor(Math.random() * props?.max);
    op[1] = Math.floor(Math.random() * props?.max);
    setRandomNumber(op);
    if (props?.operator === "") {
      let operatorsAllowed = ["+", "-", "*", "/", "%"];
      let indexOperatorAllowed = Math.floor(
        Math.random() * operatorsAllowed?.length
      );
      setRandomOperator(operatorsAllowed[indexOperatorAllowed]);
    } else {
      setRandomOperator(props?.operator);
    }
  }, [questionNumber]);

  const getActualAnswer = () => {
    switch (randomOperator) {
      case "+":
        return randomNumber[0] + randomNumber[1];
      case "-":
        return randomNumber[0] - randomNumber[1];
      case "*":
        return randomNumber[0] * randomNumber[1];
      case "/":
        return (randomNumber[0] / randomNumber[1]).toFixed(2);
      case "%":
        return randomNumber[0] % randomNumber[1];
    }
  };
  const handleAnswerInput = (ev) => {
    setAnswer(ev.target.value);
  };
  const handleNextQuestionClick = () => {
    let expectedAnswer = getActualAnswer();
    if (expectedAnswer.toString() === answer) {
      setScore(score + 1);
    }
    setAnswer("");
    setQuestionNumber(questionNumber + 1);
    let log = {
      QuestionNumber: questionNumber,
      Question: `What will be the value of ${randomNumber[0]} ${randomOperator} ${randomNumber[1]}?`,
      expected: expectedAnswer,
      userAnswer: answer,
      isCorrect: expectedAnswer.toString() === answer,
    };
    setQuestionLogs([...questionLogs, log]);
  };

  return questionNumber <= props?.maxQuestions ? (
    <div>
      <div className="range-and-operator">
        <div>{`Range Selected: 0-${props?.max}`} </div>
        {props?.operator !== "" && (
          <div>{`Operator Selected: ${props?.operator}`} </div>
        )}
      </div>
      <div className="question">
        <div className="question-header">{`Question No. ${questionNumber} =>`}</div>
        <div>{`What will be the value of ${randomNumber[0]} ${randomOperator} ${randomNumber[1]}?`}</div>
      </div>

      <div className="Answer-box">
        <label className="input-label">Your Answer:</label>
        <input
          type="text"
          className="Answer"
          onChange={(ev) => {
            handleAnswerInput(ev);
          }}
          value={answer}
          name="Answer"
        />
      </div>
      {randomOperator === "/" && (
        <div className="instruction-for-divison">
          (Answer upto 2 decimal places,NaN,Infinity)
        </div>
      )}

      <button
        className={
          answer !== "" ? "start-quiz-button" : "start-quiz-button-disabled"
        }
        onClick={() => {
          answer !== "" && handleNextQuestionClick();
        }}
      >
        Next Question
      </button>
      <div>{`Your Score : ${score}`}</div>
    </div>
  ) : (
    <>
      <div>Finished !</div>
      <div>Your final score is {`${score}/${props?.maxQuestions}`}</div>
      {questionLogs.map((item) => {
        return (
          <div>
            <div className="question">
              <div className="question-header">
                {`Question: ${item.QuestionNumber}`}
              </div>
              <div
                className={item.isCorrect ? "question-green" : "question-red"}
              >
                {item.Question}
              </div>
            </div>
            <div className="Answer">
              <div
                className={item.isCorrect ? "question-green" : "question-red"}
              >
                {`Your Answer : ${item.userAnswer}`}
              </div>
              <div>{`Actual Answer : ${item.expected}`}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Quizcomponent;
