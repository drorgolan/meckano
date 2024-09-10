import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

const LoginForm = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate for routing

    const handleSubmit = async (e) => {
        debugger;
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', {email, password});
            onLogin(response.data.access_token);
        } catch (error) {
            console.error('Login failed', error);
        }
    };
    const handleRegisterClick = () => {
        navigate('/register'); // Navigate to the register page
    };
    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p className="register-link">
                To register, <span onClick={handleRegisterClick} className="click-here">click here</span>
            </p>
        </div>
    );
};

export default LoginForm;
