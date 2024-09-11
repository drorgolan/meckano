import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the register page
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/register', formData);
            toast.success('Registration successful!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            debugger;
            toast.error(`Registration failed:${error.response.data.message}`);
        }
    };

    return (
        <>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className="form">
                <h2>Register</h2>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name"
                           required/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"
                           required/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}
                           placeholder="Password" required/>
                </div>
                <div>
                    <label htmlFor="confirm_password">Confirm password:</label>
                    <input type="password" name="confirm_password" value={formData.confirm_password}
                           onChange={handleChange}
                           placeholder="Confirm Password" required/>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
            <p className="register-link">
                To Login, <span onClick={handleLoginClick} className="click-here">click here</span>
            </p>
        </>
    );
};

export default RegisterForm;