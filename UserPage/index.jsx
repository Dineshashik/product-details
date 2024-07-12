import React, { useState, useEffect } from "react";
import { getUsersData,searchUsers,getDeleteUser} from "../../services/userService";
import { useNavigate } from 'react-router-dom';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { CgMoreVerticalAlt } from "react-icons/cg";
import "./Userpage.css";

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [showActionId, setShowActionId] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);
    const [pageSize, setPageSize] = useState(4);
    const [pagination, setPagination] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const userDetail = async () => {
            try {
                const response = await getUsersData();
                if (response?.users) {
                    setUsers(response.users);
                } else {
                    console.error("No user data found in response");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        userDetail();
    }, []);

    useEffect(() => {
        const searchUsersData = async () => {
          try {
            let response;
    
            if (search) {
              response = await searchUsers({ userName: search });
            } else {
              response = await searchUsers({ page: pagination, limit: pageSize });
            }
    
            if (response && response.data) {
              setUsers(response.data);
              setTotalPages(response.totalPages);
            } else {
              console.error("No  data found in response");
            }
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
    
        searchUsersData();
      }, [pagination, pageSize, search]);

    const handleSearchInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleUserIconClick = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setShowActionId(prev => (prev === userId ? null : userId));
    };

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleDelete = async (username) => {
        setDeletingUser(username);
        try {
            const confirmDelete = window.confirm(`Do you want to delete the user ${username}?`);
            if (confirmDelete) {
                let response = await getDeleteUser(username);
                if (response?.message === 'User deleted successfully') {
                    navigate('/admin/users');
                } else {
                    console.error(response?.message || 'Delete user failed');
                }
            }
        } catch (error) {
            console.error('An error occurred during the delete user', error);
        }
    };

    const handlePreviousClick = () => {
        if (pagination > 1) {
            setPagination(pagination - 1);
        }
    };

    const handleNextClick = () => {
        if (pagination < totalPages) {
            setPagination(pagination + 1);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setShowActionId(null);
    };

    return (
        <div className="user-page">
            <div className="user-header">
            <div className="search">
                    <div className='search-container'>
                        <input
                            type="text"
                            placeholder="Search the user Name"
                            value={search}
                            onChange={handleSearchInputChange}
                            className="search-input"
                        />
                    </div>
                </div>
                <table className="user-table">
                    <thead>
                        <tr>
                            
                            <th>Username</th>
                            <th>Email</th>
                            <th>password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map((user) => (
                            <tr key={user.id} className="user-row">
                                
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td style={{ position: 'relative' }}>
                                    <CgMoreVerticalAlt
                                        className="user-icon"
                                        onClick={(event) => handleUserIconClick(event, user.id)}
                                    />
                                    <Popper
                                        open={showActionId === user.id}
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
                                                        >
                                                            <MenuItem onClick={() => handleEdit(user)}>Edit</MenuItem>
                                                            <MenuItem onClick={() => handleDelete(user.username)}>Delete</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="user-pagination">
                    <a
                        className={`user-1 ${pagination === 1 ? 'disabled' : ''}`}
                        onClick={handlePreviousClick}
                    >
                        &laquo;
                    </a>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <a
                            key={index + 1}
                            className={`user-${index + 1} ${pagination === index + 1 ? 'active' : ''}`}
                            onClick={() => setPagination(index + 1)}
                        >
                            {index + 1}
                        </a>
                    ))}
                    <a
                        className={`user-1 ${pagination === totalPages ? 'disabled' : ''}`}
                        onClick={handleNextClick}
                    >
                        &raquo;
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserPage;


