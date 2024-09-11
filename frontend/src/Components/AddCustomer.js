import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AddCustomer = ({ token, onCustomerAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            // Send a POST request to the server to create a new customer
            const response = await axios.post(
                'http://localhost:8000/api/customers', // Adjust this URL based on your API endpoint
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // If successful, reset the form and show a success message
            setFormData({
                name: '',
                email: '',
                address: '',
                phone: '',
            });

            setSuccessMessage('Customer added successfully!');

            // Call the callback to refresh the customer list (if needed)
            if (onCustomerAdded) onCustomerAdded(response.data);

        } catch (error) {
            console.error('Error adding customer:', error);
            setError('Failed to add customer. Please check your input and try again.');
        }
    };

    return (
        <div>
            <h2>Add New Customer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Add Customer</button>
            </form>

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

AddCustomer.propTypes = {
    token: PropTypes.string.isRequired, // Bearer token for authentication
    onCustomerAdded: PropTypes.func, // Optional callback for after a customer is added
};

export default AddCustomer;
