import React from "react";
import {Redirect} from "react-router-dom";
import {url} from "../../../config/url_config";

class NewList extends React.Component {
    constructor() {
        super();
        this.state = {
            name: null,
            completed: false
        }
    }

    handleChange = (target, e) => {
        const val = e.target.value;
        this.setState((prevState) => {
            return {target: prevState[target] = val}
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const val = {username: this.props.username, name: this.state.name};

        fetch(`${url}/create-list`, {
            method: "POST",
            body: JSON.stringify(val),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json().then((res) => {
            // HANDLE ERRORS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            this.setState((prev) => {return {completed: prev.completed = true}})
        }))
    }

    render() {
        if (!this.state.completed) {
            return (
                <div id="new-list">
                    <h1>Create a new list</h1>
                    <form>
                        <label htmlFor="name">Name of new grocery list</label>
                        <input type="text" name="name" placeholder="Name" onChange={(e) => this.handleChange("name", e)} />

                        <button onClick={this.handleSubmit}>Create</button>
                    </form>
                </div>
            )
        } else {
             return <Redirect to={"/"} />
        }
    }
}

export default NewList;