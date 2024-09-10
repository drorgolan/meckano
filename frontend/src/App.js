import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Header from './Components/Header';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import './styles.css';


import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [message, setMessage] = useState('');
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state
    //const navigate = useNavigate();
    // Check for a token in localStorage when the app loads
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        setLoading(false); // Stop loading once the token is checked
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            // Assuming your backend has an endpoint to handle logout
            const response = await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Send the token for authentication
                }
            });

            // Clear the token from localStorage and state
            localStorage.removeItem('token');
            toast.success('You have been logged out successfully.: ' + response.data.message);


            // Navigate to login page
            //navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            toast.success('Failed to log out. Please try again.: ' + error.data.message);

        }
    };
    // If loading, don't render routes yet
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Router>
                <Header message={message} onLogout={handleLogout}/>
                <Routes>
                    <Route
                        path="/"
                        element={token ? <Home token={token}/> : <Navigate to="/login"/>}
                    />
                    <Route
                        path="/login"
                        element={<Login setMessage={setMessage} onLogin={handleLogin}/>}
                    />
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </Router>
            <ToastContainer/>
        </>
    );
};

export default App;
