import React from 'react';
import RegisterForm from '../Components/RegisterForm';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const handleRegisterSuccess = () => {
        alert('Registration successful! Please log in.');
        navigate('/login'); // Redirect to the login page after successful registration
    };

    return (
        <div className="register-page">
            <RegisterForm onRegisterSuccess={handleRegisterSuccess}/>
        </div>
    );
};

export default Register;
