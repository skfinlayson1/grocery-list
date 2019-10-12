import React from "react";
import {NavLink, Redirect} from "react-router-dom";
import {url} from "../../../config/url_config";

class Landing extends React.Component {
    constructor() {
        super()

        this.state = {
            groceryLists: [],
            loading: true,
            interval: null
        }
    }

// ComonentDidMount -----------------------------------------------------------
    componentDidMount() {
        // Function to check for new grocery lists entries
        function requestList(state) {
            fetch(`${url}/check-for-change`)
            .then((res) => res.json().then((res) => {
                if (res.data) {
                    const data = res.data;
                    state.setState((prev) => {
                        return {groceryLists: prev.groceryLists = data}
                    })
                } else {
                    console.log("nothing returned");
                }
            }))
        }
        // Function to create an interval and return it
        // so it can be cancelled when the component unmounts
        function interval(state) {
            const int = setInterval(() => {
                requestList(state);
            }, 15000)
            return int;
        }

        // Check to make sure the user session persists
        fetch(`${url}/check-status`)
        .then((res) => res.json().then((res) => {
            if (res.username) {
                const username = res.username;
                this.props.updateLoggedIn(username, true)
                this.setState((prev) => {return {loading: prev.loading = false}})
            } else {
                this.props.updateLoggedIn(null, false)
                this.setState((prev) => {return {loading: prev.loading = false}})
            }
        }))
        // Initial check for grocery lists
        requestList(this);
        // Create interval so the lists update as needed
        this.setState((prev) => {
            return {interval: prev.interval = interval(this)}
        })
    }

// ComponentWillUnmount --------------------------------------------------------------
    componentWillUnmount() {
        // Clear the interval that checks for new grocery lists
        clearInterval(this.state.interval);
    }

// Delete List -------------------------------------------------------------------------
    handleDelete = (e, listName) => {
        e.preventDefault()

        const list = this.state.groceryLists;
        const filteredList = list.filter((list) => list.name !== listName)

        this.setState((prev) => {return {groceryLists: prev.groceryLists = filteredList}})
    
// +++++++++++++++++ If list doesn't get deleted from server add it back to groceryLists with error message +++++++++

        fetch(`${url}/delete-list`, {
            method: "POST",
            body: JSON.stringify({listName, username: this.props.username}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

// Render -------------------------------------------------------------------------------
    render() {
        // Wait for response from the server to see if a user session exists
        if (this.state.loading) {
            return <h1>Loading</h1>
        // Once the user is loaded, render the grocery list or tell them to sign in
        } else if (this.props.username) {
            return (
                <div id="home">
                    <h1>{this.props.username}'s grocery lists</h1>
                    <h2>Click on any grocery list to view it</h2>
                    <NavLink to="/grocery-list/new-list" >
                        <h3>Create new grocery list</h3>    
                    </NavLink>
    
                    {this.state.groceryLists.map((list) => {
                        return (
                            <div>
                                <NavLink to={`/grocery-list/show/${list.name}`}>
                                    <h2>{list.name}</h2>
                                </NavLink>
                                <NavLink to={`/grocery-list/edit/${list.name}`}>Edit</NavLink>
                                <h3 onClick={(e) => this.handleDelete(e, list.name)}>Delete</h3>
                            </div>
                        )
                    })}
                </div>
            );
        // Redirect to user to sign in or sign up
        } else {
            return <Redirect to="/user" />
        }
    }
}

export default Landing;