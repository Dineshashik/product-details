import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRegisterData } from "../../services/userService";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./RegisterPage.css";

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError('');
        setNameError('');
        setEmailError('');
        setMobileError('');
        setPasswordError('');
        setConfirmPasswordError('');

        if (!name) {
            setNameError("Enter the Name");
            return;
        }

        if (!mobileNo) {
            setMobileError("Enter the Mobile number");
            return;
        }

        if (!email) {
            setEmailError("Enter the Email");
            return;
        }

        if (!password) {
            setPasswordError("Enter the Password");
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        try {
            const response = await getRegisterData({ username: name, mobileNo, email, password, confirmPassword });

            if (response?.data?.message === 'Registration successful') {
                navigate('/admin');
            } else {
                setError(response?.data?.message || 'Registration failed');
            }
        } catch (error) {
            setError('An error occurred during registration');
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (nameError) {
            setNameError('');
        }
    };

    const handleMobileNoChange = (e) => {
        setMobileNo(e.target.value);
        if (mobileError) {
            setMobileError('');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError) {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (confirmPasswordError) {
            setConfirmPasswordError('');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div className="register-form-container">
            <h2>Register</h2>
            <div className="form-group">
                <label>
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter the Name"
                        onChange={handleNameChange}
                        className="form-input3"
                    />
                </label>
                {nameError && <span className="error-message">{nameError}</span>}
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="text"
                        value={mobileNo}
                        placeholder="Enter the Mobile No"
                        onChange={handleMobileNoChange}
                        className="form-input3"
                    />
                </label>
                {mobileError && <span className="error-message">{mobileError}</span>}
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="text"
                        value={email}
                        placeholder="Enter the Email"
                        onChange={handleEmailChange}
                        className="form-input3"
                    />
                </label>
                {emailError && <span className="error-message">{emailError}</span>}
            </div>
            <div className="form-group">
                <label>
                    <div className="password-field">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            value={password}
                            placeholder="Enter the Password"
                            onChange={handlePasswordChange}
                            className="form-input3"
                        />
                        <span className="icon-passwordfield" onClick={togglePasswordVisibility}>
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </label>
                {passwordError && <span className="error-message">{passwordError}</span>}
            </div>
            <div className="form-group">
                <label>
                    <div className="password-field">
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            value={confirmPassword}
                            placeholder="Confirm the Password"
                            onChange={handleConfirmPasswordChange}
                            className="form-input3"
                        />
                        <span className="icon-passwordfield" onClick={toggleConfirmPasswordVisibility}>
                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </label>
                {confirmPasswordError && <span className="error-message">{confirmPasswordError}</span>}
            </div>
            <div className="form-group">
                <input
                    type="button"
                    onClick={handleRegister}
                    value="Register"
                    className="register-button"
                />
            </div>
            {error && <span className="error-message global-error">{error}</span>}
        </div>
    );
};

export default RegisterPage;

