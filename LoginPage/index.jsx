import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { getLoginPage } from "../../services/userService";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./LoginPage.css";

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');
    const [showpassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleClick = async () => {
        setUserNameError('');
        setPasswordError('');
        setFormError('');

        if (!userName) {
            setUserNameError("Enter email or mobile number");
            return;
        }

        if (!password) {
            setPasswordError("Enter the password");
            return;
        }

        try {
            const response = await getLoginPage({ email: userName, password });

            if (response.data.message === 'Login successful') {
                localStorage.setItem('user', JSON.stringify(response.data.user))
                navigate('/admin');
            } else {
                setFormError(response.data.message || 'Invalid username or password');
            }
        } catch (error) {
            setFormError('An error occurred during login');
        }
    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
        if (userNameError) {
            setUserNameError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError) {
            setPasswordError('');
        }
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showpassword);
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <div className="form-field">
                <label>
                    <input
                        type="text"
                        value={userName}
                        placeholder="Enter email or mobile number"
                        onChange={handleUserNameChange}
                        className="form-input2"
                    />
                </label>
                {userNameError && <span className="error-message">{userNameError}</span>}
            </div>
            <div className="form-field">
                <label>
                    <div className="password-field">
                        <input
                            type={showpassword ? "text" : "password"}
                            value={password}
                            placeholder="Enter the password"
                            onChange={handlePasswordChange}
                            className="form-input2">
                        </input>
                        <span className="icon-field" onClick={handlePasswordVisibility}>
                            {showpassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </label>

                {passwordError && <span className="error-message">{passwordError}</span>}
            </div>
            <div className="form-field">
                <input
                    type="button"
                    onClick={handleClick}
                    value="Login"
                    className="login-button"
                />
            </div>
            {formError && <span className="error-message global-error">{formError}</span>}
        </div>
    );
};

export default LoginPage;
