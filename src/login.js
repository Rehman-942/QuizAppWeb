import React, { useState, useEffect } from 'react';
import './styles/login.css'; // Import your CSS file

const Login = ({ setLogined }) => {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const lastLoginTime = localStorage.getItem('adminLoginTime');
        if (lastLoginTime) {
            const tenDaysAgo = new Date();
            tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
            if (new Date(lastLoginTime) >= tenDaysAgo) {
                // Admin login is within 10 days
                setLogined(true);
            } else {
                // Admin login has expired after 10 days
                localStorage.removeItem('adminLoginTime');
                setLogined(false);
            }
        }
    }, [setLogined]);

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (password === 'c!agh7&@2jhg029k') {
            setLogined(true);
            localStorage.setItem('adminLoginTime', new Date().toISOString());
            window.location.reload();
        } else {
            setLogined(false);
            setErrorMessage('Incorrect password. Please try again.');
        }
    };

    return (
        <div className='admin-login-container-wrapper'>
            <div className="admin-login-container">
                <h1>Admin Login</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleAdminLogin} className="login-form">
                    <label htmlFor="password">Admin Password:</label>
                    <input
                        type="password"
                        id="password"
                        onInput={()=>setErrorMessage('')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
