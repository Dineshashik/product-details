import React, { useState, useEffect } from 'react';
import TitleBar from '../Titlebar/index';
import SideBar from '../Sidebar/index';
import ProductPage from '../Products';
import UserPage from '../UserPage';
import { basics } from '../../utils/constants';
import './Admin.css';

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState('');

  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem('currentPage');
    return storedPage || basics.PRODUCTS;
  });

  useEffect(() => {
    const loginUser = localStorage.getItem('user');
    if (loginUser) {
      setUser(JSON.parse(loginUser));
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page);
  };

  return (
    <div className="admin-dashboard">
      <TitleBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      {currentPage === basics.PRODUCTS && <ProductPage isSidebarOpen={isSidebarOpen} />}
      {currentPage === basics.USER && <UserPage isSidebarOpen={isSidebarOpen} />}
      {isSidebarOpen && <SideBar currentPage={currentPage} setCurrentPage={handleNavigate} />}
    </div>
  );
};

export default Admin;




