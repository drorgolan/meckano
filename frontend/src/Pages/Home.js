import React, {useState} from 'react';
import CustomerTable from '../Components/CustomerTable';
import DeleteCustomer from '../Components/DeleteCustomer';
import ChangeCustomerDetails from '../Components/CahngeCustomersDetails'; // Corrected typo
import SearchCustomer from '../Components/SearchCustomer';
import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import '../styles.css';
import AddCustomer from "../Components/AddCustomer"; // Ensure you have styles for Sidebar if needed

const Home = ({token}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [customerComponent, setCustomerComponent] = useState('CustomerTable'); // Default component

    const renderCustomerComponent = () => {
        switch (customerComponent) {
            case 'CustomerTable':
                return <CustomerTable token={token}/>;
            case 'DeleteCustomer':
                return <DeleteCustomer token={token}/>;
            case 'ChangeCustomerDetails': // Corrected name
                return <ChangeCustomerDetails token={token}/>;
            case 'SearchCustomer':
                return <SearchCustomer token={token}/>;
            case 'AddCustomer':
                return <AddCustomer token={token}/>;
            default:
                return <CustomerTable token={token}/>;
        }
    };

    return (
        <div className={'customers'}>


            <Sidebar style={{height: "100vh", top: '0px'}} collapsed={!isExpanded}>
                <Menu menuItemStyles={{
                    button: {
                        [`&.active`]: {
                            backgroundColor: '#13395e',
                            color: '#b6c8d9',
                        },
                    },
                }}>
                    <MenuItem onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? 'X' : '+'}
                    </MenuItem>
                    <MenuItem onClick={() => setCustomerComponent('AddCustomer')}>
                        Add a customer
                    </MenuItem>
                    <MenuItem onClick={() => setCustomerComponent('CustomerTable')}>
                        Show all customers
                    </MenuItem>
                    <MenuItem onClick={() => setCustomerComponent('DeleteCustomer')}>
                        Delete a customer
                    </MenuItem>
                    <MenuItem onClick={() => setCustomerComponent('ChangeCustomerDetails')}>
                        Change customer's details
                    </MenuItem>
                    <MenuItem onClick={() => setCustomerComponent('SearchCustomer')}>
                        Search for a customer
                    </MenuItem>
                </Menu>
            </Sidebar>

            <div className="components">
                <h1>Welcome to the Customer Management System</h1>
                {renderCustomerComponent()}
                <div className="home">
                </div>
            </div>
        </div>
    );
};

export default Home;
