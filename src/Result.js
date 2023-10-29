import React from "react";
import './styles/result.css';
import { useNavigate } from "react-router-dom";

const Result = ({result, name}) => {
  const navigate = useNavigate();
  function handleBack (){
    navigate('/');
  };
  const scores = result;
  console.log('results', scores);

  return (
    <div className="result-container">
        <div className="result">
        <h1>Scoring {name}</h1>
      <ul>
        {Object.entries(scores).map(([category, percentage]) => (
          <li key={category} style={{fontWeight: category==='psychopathy'? 600:400}}>
              {category}:
            <div>{percentage}%</div> 
          </li>
        ))}
          <div className="home" onClick={handleBack}>Back To Home</div>
      </ul>
    </div>
    </div>
  );
};

export default Result;
