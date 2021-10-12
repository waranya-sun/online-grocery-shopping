import React from "react";
import {Link} from "react-router-dom";
import home_pic from "./assets/images/home_pic.jpg";

export default function Home(){
    return(
        <div className="home-layout">
            <div>
                <h1>Online Grocery Shopping</h1>
                <img src={home_pic} width="320px" className="home_pic"/>
                <p className="home_paragraph">
                Order your groceries from <strong>Online Grocery Shopping</strong> with our easy to use app,
                and get your products delivered straight to your doorstep.
                </p>
                <Link to="/products" className="btn btn-default">Start Shopping</Link>
            </div>
            <img/>
        </div>
    )
}