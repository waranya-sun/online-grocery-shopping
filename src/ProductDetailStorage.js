import React from "react";

export default function ProductDetailStorage({storage}){
    return(
        <div className="productDetailStorage">
            <p>
                <strong>Storage instructions : </strong>{storage}.
            </p>
        </div>
    )
}