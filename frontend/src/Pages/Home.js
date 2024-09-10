import React from 'react';
import CustomerTable from '../Components/CustomerTable';

const Home = ({ token }) => {
    return (
        <div className="home">
            <h1>Welcome to the Customer Management System</h1>
            <CustomerTable token={token} />
        </div>
    );
};

export default Home;
