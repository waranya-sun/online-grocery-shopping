import React, { useState } from "react";
import Input from "./Input.js";
import Button from "./Button.js";
import { loadStripe } from "@stripe/stripe-js";
import cheese from "./assets/images/cheese.png";
import milk from "./assets/images/milk.png";
import yogurt from "./assets/images/yogurt.png";
import egg from "./assets/images/egg.png";
import tomato from "./assets/images/tomato.png";
import kiwi from "./assets/images/kiwi.png";

const stripeLoadedPromise = loadStripe("pk_test_51JRsufGLfgBri2d0vw8QApAVFSQgcSYyb6AMRRk1gBZg8rtucyfFSSgJo9axUoZYnfXwVVw9ci68Av2HMUTyin7x0095TNNhyx");

export default function Cart(props) {
    const { cart } = props;
    const totalPrice = cart.reduce((total, current) => {
        return total += (current.price * current.quantity)
    }, 0)

    const [email, setEmail] = useState("");

    function handleFormSubmit(event) {
        event.preventDefault();

        const lineItems = cart.map((product) => {
            return { price: product.price_id, quantity: product.quantity };
        });

        stripeLoadedPromise.then((stripe) => {
            stripe
                .redirectToCheckout({
                    lineItems: lineItems,
                    mode: "payment",
                    successUrl: "http://localhost:3000/",
                    cancelUrl: "http://localhost:3000/",
                    customerEmail: email,
                })
                .then((response) => {
                    // this will only log if the redirect did not work
                    console.log("Redirect");
                    console.log(response.error);
                })
                .catch((error) => {
                    // wrong API key? you will see the error message here
                    console.log("Wrong API")
                    console.log(error);
                });
        });
    }

    function imgSrc(imgsrc) {
        if (imgsrc === "cheese") {
            return cheese;
        } else if (imgsrc === "milk") {
            return milk;
        } else if (imgsrc === "yogurt") {
            return yogurt;
        } else if (imgsrc === "egg") {
            return egg;
        } else if (imgsrc === "tomato") {
            return tomato;
        } else if (imgsrc === "kiwi") {
            return kiwi;
        }
    }

    return (
        <div className="cart-layout">
            <div>
                <h1>Your Cart</h1>
                {cart.length === 0 && (
                    <p>You have not added any product to your cart yet.</p>
                )}
                {cart.length > 0 && (
                    <>
                        <table className="table table-cart">
                            <thead>
                                <tr>
                                    <th width="25%" className="th-product">Product</th>
                                    <th width="20%">Unit Price</th>
                                    <th width="10%">Quantity</th>
                                    <th width="25%">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(product => {
                                    return (
                                        <tr key={product.id}>
                                            <td>
                                                <img
                                                    src={imgSrc(product.image)}
                                                    width="30"
                                                    height="30"
                                                />{" "}{product.name}
                                            </td>
                                            <td>${product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>
                                                <strong>${product.price * product.quantity}</strong>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="2"></th>
                                    <th className="cart-highlight">Total</th>
                                    <th className="cart-hightlight">${totalPrice}</th>
                                </tr>
                            </tfoot>
                        </table>
                        <form className="pay-form" onSubmit={handleFormSubmit}>
                            <p>Enter your email and then click on pay and your
                                products will be delevered to you on the same day!
                                <br />
                            </p>
                            <Input
                                placeholder="Email"
                                onChange={event => setEmail(event.target.value)}
                                value={email}
                                type="email"
                                required
                            />
                            <Button type="submit" className="payBtn">Pay</Button>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}