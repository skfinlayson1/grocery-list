import React from "react";

function GroceryListTable(props) {
    return (
        <table>
            <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Location</th>
            </tr>

            {props.items.map(item => {
                return (
                    <tr>
                        <td><input type="checkbox" name={item.name}></input></td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <th>{item.location}</th>
                    </tr>
                )
            })}
        </table>
    )
}

export default GroceryListTable;