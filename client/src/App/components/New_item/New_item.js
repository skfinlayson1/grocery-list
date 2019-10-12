import React from "react";
import {url} from "../../../config/url_config";

class NewList extends React.Component {
    constructor() {
        super();

        this.state = {
            itemName: "",
            quantity: "",
            location: "",
        };
    }

    handleChange = (target, e) => {
        const val = e.target.value;

        this.setState((prevState) => {
            return {target: prevState[target] = val}
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()

        
        let val = this.state;
        val.groceryListName = this.props.url.match.params.name;
        val.username = this.props.username;
        val = JSON.stringify(val);

        fetch(`${url}/create-item`, {
            method: "POST",
            body: val,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json().then((res) => {
            console.log(res);
        }))
    }

    render() {
        return (
            <div id="new-item">
                <form>
                    <label htmlFor="name">New Item Name</label>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        placeholder="Name"
                        onChange={(e) => this.handleChange("itemName", e)}
                    ></input>

                    <label htmlFor="quantity">Quantity of item</label>
                    <input
                        type="text"
                        name="quantity"
                        value={this.state.quantity}
                        placeholder="Quantity"
                        onChange={(e) => this.handleChange("quantity", e)}
                    ></input>

                    <label htmlFor="location">Desired Location to Purchase</label>
                    <input
                        type="text"
                        name="location"
                        value={this.state.location}
                        placeholder="Location"
                        onChange={(e) => this.handleChange("location", e)}
                    ></input>
                </form>

                <button onClick={this.handleSubmit}>Create New Item</button>
            </div>
        )
    }
}

export default NewList;