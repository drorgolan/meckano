// src/Components/Header.js
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faUserCheck, faUserShield, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
// import logo from 'https://www.meckano.co.il/images/logo/logo_white.png?1478433298';

const Header = ({message}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [headerIcon, setHeaderIcon] = useState("faUserPlus");
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setHeaderIcon(window.location.href.includes('register') ? 'faUserCheck' : 'faUserPlus');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };
    const handleRegister = () => {
        setIsLoggedIn(false);
        navigate('/register');
        setHeaderIcon('faUserCheck')
    };
    const handleLogin = () => {
        setIsLoggedIn(false);
        navigate('/login');
        setHeaderIcon('faUserPlus')
    };
    return (
        <header>
            <div className="header-content">
                <img src="https://www.meckano.co.il/images/logo/logo_white.png?1478433298" alt=" Meckano
                 Logo" className=" logo"/>
                {message && <div className="message">{message}</div>}
                <div className="auth-icons">
                    {isLoggedIn ? (
                        <>
                            <FontAwesomeIcon icon={faUserShield}/>

                            <button onClick={handleLogout} title="Logout">
                                <FontAwesomeIcon icon={faSignOutAlt}/>

                            </button>
                        </>
                    ) : (

                        headerIcon === 'faUserPlus' ?
                            (<button onClick={handleRegister} title="register">

                                <FontAwesomeIcon icon={faUserPlus}/>
                            </button>)
                            :
                            (<button onClick={handleLogin} title="login">

                                    <FontAwesomeIcon icon={faUserCheck}/>
                                </button>
                            )

                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
