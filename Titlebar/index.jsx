
import React, { useState, useEffect, useRef } from 'react';
import './Titlebar.css';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const TitleBar = ({ toggleSidebar }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const userIconRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      setUsername(userObject.username.charAt(0).toUpperCase() + userObject.username.slice(1).toLowerCase());
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userIconRef.current && !userIconRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    setShowLogout(false);
  };

  const handleUserIconClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowLogout((prevShowLogout) => !prevShowLogout);
  };

  const handleClose = () => {
    setShowLogout(false);
  };

  return (
    <div className="title-bar">
      <FaBars className="menu-bar-icon" onClick={toggleSidebar} />
      <h3 className="title-h1">Admin Dashboard</h3>

      <div className='userspan-icon' ref={userIconRef}>
        <span className="username">{username}</span>
        <FaUserCircle className="user-icon" onClick={handleUserIconClick} />
        <Popper
          open={showLogout}
          anchorEl={anchorEl}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: 'center top' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    className='menu-list'
                  >
                    <MenuItem className='logout-button' onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default TitleBar;

