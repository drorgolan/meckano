import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import CustomerTable from "./CustomerTable";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeCustomerDetails = ({token}) => {
    const [customerId, setCustomerId] = useState('');
    const [customerDetails, setCustomerDetails] = useState({});
    const [message, setMessage] = useState('');

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/customers/${customerId}`, customerDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(`Customer details ${customerId} updated `);
        } catch (error) {
            toast.error(`Failed to update customer  ${customerId} details: ${error.message}`);
        }
    };

    return (
        <div>
            <ToastContainer/>
            <CustomerTable token={token}/>
            <h2>Change Customer Details</h2>
            <div className="customer-details">
                <label>customer ID</label>
                <input
                    type="text"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Enter customer ID"
                />
                <label>name</label>
                <input
                    type="text"
                    value={customerDetails.name || ''}
                    onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                    placeholder="Enter new name"
                />
                <label>address</label>
                <input
                    type="text"
                    value={customerDetails.address || ''}
                    onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                    placeholder="Enter new name"
                />
                <label>phone</label>
                <input
                    type="text"
                    value={customerDetails.phone || ''}
                    onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                    placeholder="Enter new name"
                />


                <button onClick={handleUpdate}>Update</button>

            </div>
        </div>
    );
};

ChangeCustomerDetails.propTypes = {
    token: PropTypes.string.isRequired,
};

export default ChangeCustomerDetails;
