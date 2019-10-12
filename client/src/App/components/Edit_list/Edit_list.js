import React from "react";
import {Redirect} from "react-router-dom";
import {url} from "../../../config/url_config";

class EditList extends React.Component {
    constructor() {
        super();

        this.state = {
            name: null,
            staticName: null,
            listCount: null,
            loading: true,
            completed: false
        }
    }

    componentWillMount() {
        fetch(`${url}/grocery-list/edit/${this.props.url.match.params.name}`)
        .then((res) => res.json().then((res) => {
            if (res.name) {
                this.setState((prev) => {
                    return {
                        name: prev.name = res.name,
                        staticName: prev.staticName = res.name,
                        listCount : prev.listCount = res.groceryitems.length || "None",
                        loading: false,
                    }
                })
            } else {
                // ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }
        }))
    }
    
    handleChange = (target, e) => {
        const val = e.target.value;

        this.setState((prevState) => {
            return {target: prevState[target] = val}
        });
    }

    handleSubmit = (e) => {
        fetch(`${url}/grocery-list/update/${this.props.url.match.params.name}`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json().then((res) => {
            this.setState((prev) => {return {completed: prev.completed = true}})
        }))
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading...</h1>
        } else if (this.state.completed) {
            return <Redirect to={`/`} />
        } else {
            return (
                <div>
                    <label htmlFor="name">Edit Grocery List Name</label>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        placeholder="Edit Name"
                        onChange={(e) => this.handleChange("name", e)} />

                    <h3>Grocery Items in {this.state.staticName}: {this.state.listCount}</h3>

                    <button type="submit" onClick={this.handleSubmit}>Update</button>
                </div>
            )
        }
    }
}

export default EditList;