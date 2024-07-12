import React, { useState } from "react";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import "./WelcomePage.css"; // Import the CSS file

const WelcomePage = () => {
    const [activePage, setActivePage] = useState("login");

    const handleLinkClick = (event, page) => {
        event.preventDefault();
        setActivePage(page);
    };

    return (
        <div className="welcome-container">
            <h2>Welcome Page</h2>
            <div className="form-container">
                {activePage === "login" && <LoginPage />}
                {activePage === "register" && <RegisterPage />}

                <div className="link-container">
                    {activePage === "login" && (
                        <p>  If You Don't have an Account, Please 
                            <a className="link-name" href="#" onClick={(e) => handleLinkClick(e, "register")}>
                                Go to Register
                            </a>
                        </p>
                    )}
                    {activePage === "register" && (
                        <p> If You  Already have an Account, Please 
                            <a className="link-name" href="#" onClick={(e) => handleLinkClick(e, "login")}>
                                Go to Login
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;




