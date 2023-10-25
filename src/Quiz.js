import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import questions from "./data/data.json";
import Result from "./Result";
import "./styles/quiz.css";

const Quiz = () => {
    const [showResult, setShowResult] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [result, setResult] = useState({});
    const [questionsToShow, setQuestionsToShow] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get("username");

    const headingRef = useRef(Object.keys(questions)[currentPage]);

    useEffect(() => {
        headingRef.current = Object.keys(questions)[currentPage];
        const slicedQuestions = questions[headingRef.current];
        setQuestionsToShow(slicedQuestions);
    }, [currentPage]);

    const handlePageChange = async (e, newPage) => {
        window.scrollTo(0, 0);
        result[headingRef.current] = { total: 0, questions: questionsToShow };
        questionsToShow.map((question) => {
            result[headingRef.current].total += question.selectedOption / 10;
        });
        if (newPage === 3) {
            result['psychopathy'] = {
                total: (
                    (result['boldness'].total +
                        result['meanness'].total +
                        result['disinhibition'].total) /
                    3
                ).toFixed(0),
            };
        }
        if (currentPage !== totalPages) {
            setCurrentPage(newPage);
        }
        if (newPage === totalPages) {
            setShowResult(true);
            const saveData = { username, email:'', resultData:result};
            console.log('saveData', saveData);
            // http://127.0.0.1:3001/api/saveResult
            // https://quiz-app-server-lyart.vercel.app/api/saveResult
            const res = await fetch('https://quiz-app-server-lyart.vercel.app/api/saveResult', {
                method: 'POST',
                body: JSON.stringify({ username, email: '', resultData: result }),
                headers: { 'Content-Type': 'application/json' }
              }).catch(error => {
                console.error('Error:', error);
              });
            console.log('res',  res);
        }
        setResult(result);
        e.preventDefault();
    };

    const totalPages = Object.keys(questions).length;

    // Function to handle radio button selection
    const handleOptionChange = (questionIndex, value) => {
        const updatedQuestions = [...questionsToShow];
        updatedQuestions[questionIndex].selectedOption = value;
        setQuestionsToShow(updatedQuestions);
    };

    return (
        <div>
            {showResult ? (
                <Result name={username} result={result} />
            ) : (
                <div className="quiz-container">
                    <nav className="navbar">
                        <div className="navbar-title">Welcome, {username}!</div>
                        <div className="quiz-heading">{headingRef.current}</div>
                    </nav>
                    <div className="quiz-content">
                        <form onSubmit={(e) => handlePageChange(e, currentPage + 1)}>
                            {questionsToShow.map((question, questionIndex) => (
                                <div key={questionIndex} className="question">
                                    <h2>{question.question}</h2>
                                    <ul>
                                        {question.options.map((option, optionIndex) => (
                                            <li key={option.value} onClick={() => handleOptionChange(questionIndex, option.value)}>
                                                <input
                                                    required
                                                    type="radio"
                                                    name={`question-${questionIndex}`}
                                                    checked={question.selectedOption === option.value}
                                                    onChange={() => handleOptionChange(questionIndex, option.value)}
                                                />
                                                <label>{option.text}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <div className="pagination">
                                <button
                                    onClick={(e) => handlePageChange(e, currentPage - 1)}
                                    disabled={currentPage === 0}
                                >
                                    Previous
                                </button>
                                <span>
                                    Page {currentPage + 1} of {totalPages}
                                </span>
                                <button type="submit">
                                    {currentPage === totalPages - 1 ? 'Submit Test' : 'Next'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
