import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import questions from "./data/data.json";
import Result from "./Result";
import "./styles/quiz.css";

const Quiz = () => {
    const [showResult, setShowResult] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [result, setResult] = useState({});
    const navigate = useNavigate();
    const [questionsToShow, setQuestionsToShow] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get("username");
    const email = queryParams.get("email");

    const totalQuestionsPerPage = 10;
    const desiredOrder = [
        'boldness',
        'meanness',
        'disinhibition',        
        "dishonesty",
        'psychopathy',
        'linguistic',
        "linguistic intelligence",
        "logical-mathematical intelligence",
        "spatial intelligence",
        "musical intelligence",
        "bodily-Kinesthetic intelligence",
        "interpersonal intelligence",
        "intrapersonal intelligence",
        "naturalistic intelligence",
        "existential intelligence",
        "creative intelligence",
    ];


    // Use a ref to store the shuffled questions when on the first page
    const shuffledQuestionsRef = useRef(null);

    // Function to shuffle an array
    function shuffleArray(array) {
        const shuffled = array.slice(); // Copy the original array
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Shuffle the elements
        }
        return shuffled;
    }

    useEffect(() => {
        // Check if this is the first page and questions have not been shuffled
        if(!username || !email) navigate('/');

        if (currentPage === 0 && !shuffledQuestionsRef.current) {
            // Shuffle and store the questions for the first page
            const shuffledQuestions = shuffleArray(questions);
            shuffledQuestionsRef.current = shuffledQuestions;
        }

        // Determine the range of questions to show based on the page number
        const startIdx = currentPage * totalQuestionsPerPage;
        const endIdx = startIdx + totalQuestionsPerPage;

        // Use the shuffled questions for this page
        const slicedQuestions = shuffledQuestionsRef.current.slice(startIdx, endIdx);
        setQuestionsToShow(slicedQuestions);
    }, [currentPage, username, email, navigate]);

    const handlePageChange = async (e, newPage) => {
        window.scrollTo(0, 0);

        if (currentPage !== totalPages) {
            setCurrentPage(newPage);
        }
        if (newPage === totalPages) {
            shuffledQuestionsRef.current.forEach((question) => {
                const category = question.category;
                const weightedValue = question.selectedOption / 10; // Adjust for the 100-point scale
                if (!result[category]) {
                    result[category] = 0;
                }
                result[category] += weightedValue; // Add the weighted value to the category
            });

            const categorizedQuestions = shuffledQuestionsRef.current.reduce((result, question) => {
                const { category } = question;
                if (!result[category]) {
                    result[category] = {
                        questions: [],
                        total: 0, // Initialize the total result to 0
                    };
                }
                result[category].questions.push(question);
                return result;
            }, {});

            // Iterate through the results and add them to the corresponding category
            for (const category in result) {
                if (categorizedQuestions[category]) {
                    categorizedQuestions[category].total = result[category];
                }
            }
            const psychopathy = (
                parseInt(((result["boldness"] + result["meanness"] + result["disinhibition"] + result["dishonesty"]) / 4).toFixed(0))
            );
            result.psychopathy = psychopathy;
            categorizedQuestions.psychopathy = { total: psychopathy };
            setResult(result);

            const sortedResults = {};
            const sortedQuestions = {};

            desiredOrder.forEach(category => {
                if (result[category]) {
                    sortedResults[category] = result[category];
                }
                if (result[category]) {
                    sortedQuestions[category] = categorizedQuestions[category];
                }
            });
            setResult(sortedResults);
            setShowResult(true);
            // https://quiz-app-server-lyart.vercel.app/api/saveResult
            // http://localhost:3001/api/saveResult
            const res = await fetch('http://localhost:3001/api/saveResult', {
                method: 'POST', 
                body: JSON.stringify({ username, email, resultData: sortedQuestions }),
                headers: { 'Content-Type': 'application/json' },
            }).catch((error) => {
                alert('Error:', error);
            });
            console.log('res', res);
        }
        e.preventDefault();
    };

    const totalPages = Math.ceil(Object.keys(questions).length / totalQuestionsPerPage);

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
