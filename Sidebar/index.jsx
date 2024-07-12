import React from 'react';
import { basics } from '../../utils/constants';
import './Sidebar.css';

const SideBar = ({ currentPage, setCurrentPage }) => {

    return (
        <div className="sidebar">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <ul>
                <li className={currentPage === basics.PRODUCTS ? 'active' : 'nonactive'} onClick={() => setCurrentPage(basics.PRODUCTS)}>
                    <i className="fa fa-home" aria-hidden="true"></i> Products
                </li>
                <li className={currentPage === basics.USER ? 'active' : 'nonactive'} onClick={() => setCurrentPage(basics.USER)}>
                    <i className="fa fa-users" aria-hidden="true"></i> Users
                </li>
            
            </ul>
        </div>
    );
};

export default SideBar;

