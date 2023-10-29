import React from "react";
import './styles/result.css';

const Result = ({result, name}) => {
  const scores = result;
  delete scores["boldness"];
  delete scores["meanness"];
  delete scores["disinhibition"];
  delete scores["psychopathy"];
  delete scores["dishonesty"];

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
          <a href="https://yucatanblue.com/" style={{outline:"none"}}>
            <div className="home">Back To Website
            </div></a>
      </ul>
    </div>
    </div>
  );
};

export default Result;
