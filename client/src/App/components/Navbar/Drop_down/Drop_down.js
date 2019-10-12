import React from "react";
import {NavLink} from "react-router-dom";

export default function DropDown(props) {

    if (props.menuState) {
        return (
            <div id="drop-down-container">
                <nav id="drop-down">

                    <NavLink to="/admin">
                        <h3 onClick={props.toggleMenu}>Admin</h3>
                    </NavLink>

                    <NavLink to="/contact">
                        <h3 onClick={props.toggleMenu}>Contact</h3>
                    </NavLink>

                    <NavLink to="/about">
                        <h3 onClick={props.toggleMenu}>About</h3>
                    </NavLink>

                    <small onClick={props.toggleMenu}>X</small>

                </nav>                
            </div>

        )
    } else {
        return null
    }

}