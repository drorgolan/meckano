import React, {useState} from 'react';
import CustomerTable from '../Components/CustomerTable';
import DeleteCustomer from '../Components/DeleteCustomer';
import ChangeCustomerDetails from '../Components/ChangeCustomersDetails'; // Corrected typo
import SearchCustomer from '../Components/SearchCustomer';
import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import '../styles.css';
import AddCustomer from "../Components/AddCustomer"; // Ensure you have styles for Sidebar if needed
import {faUserPlus, faUserEdit, faSearch, faUserAltSlash, faTable} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                        <div className="menu-prop"><FontAwesomeIcon icon={faUserPlus}/> <p>Add a customer</p></div>
                    </MenuItem>
                    <MenuItem onClick={() => setCustomerComponent('CustomerTable')}>
                        <div className="menu-prop"><FontAwesomeIcon icon={faTable}/> <p>Show all customers</p></div>
                    </MenuItem>
                    <MenuItem onClick={() => setCustomerComponent('DeleteCustomer')}>
                        <div className="menu-prop"><FontAwesomeIcon icon={faUserAltSlash}/><p> Delete a customer</p>
                        </div>
                    </MenuItem>
                    <MenuItem onClick={() => setCustomerComponent('ChangeCustomerDetails')}>
                        <div className="menu-prop"><FontAwesomeIcon icon={faUserEdit}/><p>Edit customer</p></div>
                    </MenuItem>
                    <MenuItem onClick={() => setCustomerComponent('SearchCustomer')}>
                        <div className="menu-prop"><FontAwesomeIcon icon={faSearch}/><p>Search for a customer</p></div>
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
