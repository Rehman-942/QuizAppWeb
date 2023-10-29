import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/userCredentials.css';

const UsernameInput = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    navigate(`/quiz?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`); 
  };

  return (
    <div className="username-input">
      <form onSubmit={handleUsernameSubmit}>
      <h1>Enter Your Name</h1>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Start Test</button>
      </form>
    </div>
  );
};

export default UsernameInput;
