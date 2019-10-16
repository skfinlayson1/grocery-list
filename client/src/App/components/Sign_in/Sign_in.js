import React from "react";
import {Redirect} from "react-router-dom";
import {url} from "../../../config/url_config";

import InfoMessages from "../InfoMessages";


class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            messages: false,
            completed: false
        };
    }

// Handle Change -----------------------------------------------------
    handleChange = (target, e) => {
        const val = e.target.value;
        this.setState((prevState) => {
            return {target: prevState[target] = val}
        });
    }

// Handle Submit -----------------------------------------------------
    handleSubmit = (e) => {
        e.preventDefault();

        const val = JSON.stringify(this.state);

        fetch(`${url}/sign-in`, {
            method: "POST",
            body: val,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json().then((res) => {
            if (res.messages) {
                // Handle errors
                this.setState((prev) => {return {messages: prev.messages = res.messages}})
            } else {
                this.props.updateLoggedIn(res.username, true);
                this.setState((prev) => {return {completed: prev.completed = true}});
            }
        }))
    }

// Sign Out --------------------------------------------------------------
    signOut = (e) => {
        e.preventDefault();

        fetch(`${url}/logout`)
        .then((res) => res.json().then((res) => {
            if (res.messages) {
                this.setState((prev) => {return {messages: prev.messages = res.messages}})
            }
        }))
    }

// Render ==============================================================================
    render() {
        if (!this.state.completed) {
            // If user has not signed in, show log-in inputs
            return (
                <div id="sign-up">

                    <InfoMessages messages={this.state.messages} />

                    <form>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            placeholder="Username"
                            onChange={(e) => this.handleChange("username", e)}
                        ></input>

                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            name="password"
                            value={this.state.password}
                            placeholder="Password"
                            onChange={(e) => this.handleChange("password", e)}
                        ></input>

                        <button onClick={this.handleSubmit}>Submit</button>
                        <button onClick={this.signOut}>Sign Out</button>
                    </form>
                </div>
            )
        } else {
            // if user has signed in, redirect to Landing
            return <Redirect to="/" />
        }
    }
}

export default SignIn;