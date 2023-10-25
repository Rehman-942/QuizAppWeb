import React, { useState, useEffect, useRef } from "react";
import "./styles/adminResult.css";

const AdminResult = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [questionsToShow, setQuestionsToShow] = useState([]);
    const resultToShow = data.result;
    delete resultToShow["psychopathy"];

    const headingRef = useRef(Object.keys(resultToShow)[currentPage]);

   useEffect(() => {
    headingRef.current = Object.keys(resultToShow)[currentPage];
    const slicedQuestions = resultToShow[headingRef.current].questions;
    setQuestionsToShow(slicedQuestions);
    console.log('slicedQuestions', slicedQuestions);
}, [currentPage, resultToShow]); // Include resultToShow in the dependency array



    const handlePageChange = (e, newPage) => {
        window.scrollTo(0, 500)
        setCurrentPage(newPage);
        e.preventDefault();
    };

    const totalPages = Object.keys(resultToShow).length;

    return (
        <div className="admin-detail-result">
            <div className="min-result-wrapper">
                <div className="result-box">
                    <div className="admin-result">
                        <div className="admin-top">
                            <h2>{data.name} Result</h2>
                        </div>
                        <div className="min-result">
                            {Object.keys(data.result).map((value, index) => (
                                <p key={index} style={{ fontWeight: value === 'psychopathy' ? 600 : 400 }}>
                                    {value} <span>{data.result[value].total}%</span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="quiz-container">
                <nav className="navbar">
                    <div className="quiz-heading">{headingRef.current}</div>
                </nav>
                <div className="quiz-content">
                    <form>
                        {questionsToShow.map((question, questionIndex) => (
                            <div key={questionIndex} className="question">
                                <h2>{question.question}</h2>
                                <ul>
                                    {question.options.map((option, optionIndex) => (
                                        <li key={option.value}>
                                            <input
                                                required
                                                type="radio"
                                                name={`question-${questionIndex}`}
                                                disabled={question.selectedOption !== option.value}
                                                checked={question.selectedOption === option.value}
                                            />
                                            <label>
                                                {option.text}
                                            </label>
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
                            <button
                                onClick={(e) => handlePageChange(e, currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminResult;
