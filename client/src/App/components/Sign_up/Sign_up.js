import React from "react";
import {Redirect} from "react-router-dom";
import {url} from "../../../config/url_config";


class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: "",
            completed: false
        };
    }

    handleChange = (target, e) => {
        const val = e.target.value;
        this.setState((prevState) => {
            return {target: prevState[target] = val}
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const val = JSON.stringify(this.state);

        fetch(`${url}/sign-up`, {
            method: "POST",
            body: val,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json().then((res) => {
            if (res.username) {
                this.props.updateLoggedIn(res.username, true);
                this.setState((prev) => {return {completed: prev.completed = true}})
            } else {
                console.log('Error with sign in');
            }
        }))
    }

    signOut = (e) => {
        e.preventDefault();

        fetch(`${url}/logout`)
        .then((res) => res.json().then((res) => {
            console.log(res);
        }))
    }

    render() {
        if (!this.state.completed) {
            return (
                <div id="sign-up">
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

                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            placeholder="Email"
                            onChange={(e) => this.handleChange("email", e)}
                        ></input>

                        <button onClick={this.handleSubmit}>Submit</button>
                        <button onClick={this.signOut}>Sign Out</button>
                    </form>
                </div>
            )
        } else {
            return <Redirect to={"/"} />
        }
    }
}

export default SignUp;