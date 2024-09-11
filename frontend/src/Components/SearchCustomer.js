import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const SearchCustomer = ({ token }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/customers/search`, {
                params: { query: searchTerm },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Failed to search customers:', error);
        }
    };

    return (
        <div>
            <h2>Search for a Customer</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter search term"
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {searchResults.map(customer => (
                    <li key={customer.id}>{customer.name} - {customer.email}</li>
                ))}
            </ul>
        </div>
    );
};

SearchCustomer.propTypes = {
    token: PropTypes.string.isRequired,
};

export default SearchCustomer;
