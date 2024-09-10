import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerTable = ({ token }) => {
    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/customers?page=${page}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCustomers(response.data.data);
            } catch (error) {
                console.error('Error fetching customers', error);
            }
        };
        fetchCustomers();
    }, [page, token]);

    return (
        <div className="customer-table">
            <h2>Customers</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>Previous</button>
            <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
    );
};

export default CustomerTable;