import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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
            setMessage(`Customer details updated: ${response.data.message}`);
        } catch (error) {
            setMessage(`Failed to update customer details: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Change Customer Details</h2>
            <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Enter customer ID"
            />
            <input
                type="text"
                value={customerDetails.name || ''}
                onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                placeholder="Enter new name"
            />
            {/* Add more fields as needed */}
            <button onClick={handleUpdate}>Update</button>
            {message && <p>{message}</p>}
        </div>
    );
};

ChangeCustomerDetails.propTypes = {
    token: PropTypes.string.isRequired,
};

export default ChangeCustomerDetails;
