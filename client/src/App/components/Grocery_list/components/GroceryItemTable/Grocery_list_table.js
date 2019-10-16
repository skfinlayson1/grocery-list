import React from "react";
import {NavLink} from "react-router-dom";

// Grocery item table to display items
function GroceryListTable(props) {
    return (
        <table>
            <tr>
                <th>Purchased</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Edit Item</th>
                <th>Delete Item</th>
            </tr>

            {props.items.map(item => {
                return (
                    <tr>
                        <td><input onClick={(e) => props.updatePurchased(!item.purchased, item.name)} type="checkbox" name={item.name} checked={item.purchased}></input></td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.location}</td>
                        <td><NavLink to={`/grocery-item/edit/${props.groceryListName}/${item.name}`}>Edit</NavLink></td>
                        <td onClick={(e) => props.deleteItem(e, item.name)}>Delete</td>
                    </tr>
                )
            })}
        </table>
    )
}

export default GroceryListTable;