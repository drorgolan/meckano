import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CustomerTable from "./CustomerTable";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteCustomer = ({token}) => {
    const [customerId, setCustomerId] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {

            const response = await axios.delete(`http://localhost:8000/api/customers/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(`Customer ${customerId} was deleted`);
        } catch (error) {
            toast.error(`Failed to delete customer ${customerId}: ${error.message}`);
        }
    };

    return (
        <div>
            <ToastContainer/>
            <CustomerTable token={token}/>

            <div className="delete-customer">
                <h2>Delete Customer</h2>
                <input
                    type="text"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Enter customer ID"
                />

                <button onClick={handleDelete}>Delete</button>

            </div>
        </div>
    );
};

DeleteCustomer.propTypes = {
    token: PropTypes.string.isRequired,
};

export default DeleteCustomer;
