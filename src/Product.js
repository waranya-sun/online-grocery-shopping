import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button.js";
import cheese from "./assets/images/cheese.png";
import milk from "./assets/images/milk.png";
import yogurt from "./assets/images/yogurt.png";
import egg from "./assets/images/egg.png";
import tomato from "./assets/images/tomato.png";
import kiwi from "./assets/images/kiwi.png";

export default function Product(props) {
    const { details } = props;

    const productFromCart = props.cart.find(product => product.id === details.id)
    const quantity = productFromCart ? productFromCart.quantity : 0;
    console.log(props.cart)

    const img_src = details.image;
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
        <div className="product">
            <div className="product-image-container">
                <Link to={`/products/${details.id}`}>
                    <img
                        src={imgSrc(img_src)}
                        width="100"
                        height="100"
                        className="product-image"
                        alt=""
                    />
                </Link>
                {quantity > 0 && (
                    <div className="product-quantity-container">
                        <div className="product-quantity">{quantity}</div>
                    </div>
                )}
            </div>
            <div className="product-info">
                <h3>{details.name}</h3>
                <p>{details.description}</p>
            </div>
            <div className="product-checkout">
                <div>
                    {quantity > 0 && (
                        <Button outline className="product-delete" onClick={() => props.onProductDelete(details.id)}>x</Button>
                    )}
                </div>
                <Button outline onClick={() => props.onProductAdd(details)}>
                    ${details.price}
                </Button>
            </div>

        </div>
    );
}