import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({setMessage, onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', {email, password});
            toast.success('Login successful: ' + response.data.message);
            console.log('Login successful', response.data);
            onLogin(response.data.access_token); // Call onLogin with the access token
            navigate('/'); // Redirect to the home page after login
        } catch (err) {
            toast.error('Login failed: ' + (err.response?.data?.message || 'An error occurred'));
            console.error('Login failed', err);
        }
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Navigate to the register page
    };

    return (
        <>

            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">Username:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
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
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <ToastContainer/>
            </form>
            <p className="register-link">
                To register, <span onClick={handleRegisterClick} className="click-here">click here</span>
            </p>
        </>
    );
};

export default LoginForm;
