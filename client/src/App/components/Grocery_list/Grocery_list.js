import React from "react";
import {NavLink} from "react-router-dom";
import {url} from "../../../config/url_config";

import GroceryListTable from "./components/GroceryItemTable";

class GroceryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            interval: null,
            loading: true
        }
    }

// MOUNT -------------------------------------------------------------------------
    componentDidMount() {
        // function to create an interval to check for new grocery items every 15 seconds
        function interval(state) {
            const int = setInterval(() => {
                makeRequest(state);
            }, 15000)
            return int;
        }
        // function to make request to server for grocery list items
        function makeRequest(state) {
            fetch(`${url}/grocery-list/show/${this.props.url.match.params.name}`)
            .then((res) => res.json().then((res) => {
                const items = res.groceryitems;
                state.setState((prev) => {
                    return {items: prev.items = items, loading: prev.loading = false}
                })
            }))
            .catch((err) => {
                console.log(err);
            })
        }
        // initial request
        makeRequest(this);
        // Add interval to state so it can be cleared when the component unmounts
        this.setState((prev) => {
            return {interval: prev.interval = interval(this)}
        })
    }

// UNMOUNT ------------------------------------------------------------------------
    componentWillUnmount() {
        // clear the 15 second grocery list update interval
        clearInterval(this.state.interval);
    }

    render() {
        if (this.state.loading){
            return <h1>Loading...</h1>
        } else {
            return (
                <div>
                    <h1>{this.props.url.match.params.name}</h1>

                    <NavLink to={`/grocery-list/create-item/${this.props.url.match.params.name}`}>Create new item</NavLink>

                    {this.state.items.length > 0 ?
                        <GroceryListTable items={this.state.items} />
                    : 
                        <h2>Add Grocery Items to View Them Here</h2>
                    }          
                </div>
            )
        }
    }
}

export default GroceryList;