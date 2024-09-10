// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//
// export default App;

import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Header from './Components/Header';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import './styles.css';

function App() {
    const [token, setToken] = useState(null);

    const handleLogin = (token) => {
        setToken(token);
    };

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={token ? <Home token={token}/> : <Navigate to="/login"/>}/>
                <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </Router>
    );
}

export default App;