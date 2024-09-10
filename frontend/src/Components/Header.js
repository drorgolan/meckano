// src/Components/Header.js
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
// import logo from 'https://www.meckano.co.il/images/logo/logo_white.png?1478433298';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <header>
            <div className="header-content">
                <img src="https://www.meckano.co.il/images/logo/logo_white.png?1478433298" alt=" Meckano
                 Logo" className=" logo"/>
                <div className="auth-icons">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} title="Logout">
                            <FontAwesomeIcon icon={faSignOutAlt}/>
                        </button>
                    ) : (
                        <Link to="/login" title="Login">
                            <FontAwesomeIcon icon={faSignInAlt}/>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
