



import React from 'react';
import LoginForm from '../Components/LoginForm';
import {useNavigate} from 'react-router-dom';

const Login = ({setMessage,onLogin}) => {
    const navigate = useNavigate();

    const handleLogin = (token) => {
        onLogin(token);  // Set the token received from login
        navigate('/');   // Redirect to the Home page
    };

    return (
        <div className="login-page">
            <LoginForm setMessage={setMessage} onLogin={handleLogin} />
        </div>
    );
};

export default Login;
