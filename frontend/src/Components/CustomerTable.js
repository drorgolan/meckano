import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CustomerTable = ({token, data}) => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Tracks the current page number
    const [totalPages, setTotalPages] = useState(1); // Tracks the total number of pages

    useEffect(() => {

        if (data !== undefined) {
            setCustomers(data)
            return;
        }

        const fetchCustomers = async (page) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/customers?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Logging response to confirm data structure
                console.log('API Response:', response.data);

                // Set customers data and update pagination state based on the actual response structure
                setCustomers(response.data.data); // Assuming `data` holds the array of customers
                setCurrentPage(response.data.current_page); // Assuming `current_page` indicates the current page
                setTotalPages(response.data.last_page); // Assuming `last_page` indicates the total number of pages
            } catch (error) {
                console.error('Failed to fetch customers:', error);
            }
        };

        fetchCustomers(currentPage);
    }, [token, currentPage,data]);

    // Handlers for pagination buttons
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            console.log(`Moving to next page: ${currentPage + 1}`);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            console.log(`Moving to previous page: ${currentPage - 1}`);
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div>
            <h2>Customer List</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    {/* Add other columns as needed */}
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.address}</td>
                        {/* Add other data fields as needed */}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="Pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
          Page {currentPage} of {totalPages}
        </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

CustomerTable.propTypes = {
    token: PropTypes.string.isRequired,
};

export default CustomerTable;
