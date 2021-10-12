import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar(props) {
    const cartCount = props.cart.reduce((total, current) => {
        return total += current.quantity;
    }, 0)
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-brand">Online Grocery Shopping</NavLink>
            <ul>
                <li className="nav-item">
                    <NavLink exact activeClassName="active" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink activeClassName="active" to="/products">Products</NavLink>
                </li>
                <li>
                    <NavLink to="/cart" className="nav-item nav-cart btn btn-accent">Cart ({cartCount})</NavLink>
                </li>
            </ul>
        </nav>
    )
}