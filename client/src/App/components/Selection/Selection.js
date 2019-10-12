import React from "react";
import {NavLink} from "react-router-dom";

function Selection() {
    return (
        <div id="home">
            <h1>Welcome to Wicked Ways Grocery list</h1>
            <NavLink to="/user/sign-in">
                <div className="sign-in-section">
                    <h2>Please sign in to create a grocery list</h2>
                    <h4>Sign In</h4>
                </div>
            </NavLink>
            <NavLink to="/user/sign-up">
                <div className="sign-up-section">
                    <h2>Or if you are new here</h2>
                    <h4>Sign Up</h4>
                </div>
            </NavLink>
        </div>
    )
}

export default Selection;