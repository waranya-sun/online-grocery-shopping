import React from "react";
import Button from "./Button.js";

export default function ProductDetailInfo({ product, onProductAdd }) {
    return (
        <div className="productDetailInfo">
            <p>
                {product.description} sold at <strong>${product.price}</strong> per piece.
            </p>
            <Button onClick={() => onProductAdd(product)}>${product.price}</Button>
        </div>
    )
}