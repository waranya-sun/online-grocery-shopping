import React, { useState, useEffect } from "react";
import useFetch from "./useFetch";
import Product from "./Product.js";

export default function Products(props) {
    const [products, setProducts] = useState([]);
    const { get, loading } = useFetch("https://supermarketapp-5709e-default-rtdb.firebaseio.com/");

    useEffect(() => {
        console.log("Products Page");
        get("supermarket.json")
            .then(data => {
                console.log(data);
                setProducts(data);
            }, [])
            .catch(error => console.log("Could not load products", error))
    }, [])
    return (
        <div className="products-layout">
            <h1>Products</h1>
            <div className="products-grid">
                {products.map(product => {
                    return <Product
                        key={product.id}
                        details={product}
                        cart={props.cart}
                        onProductAdd={props.onProductAdd}
                        onProductDelete={props.onProductDelete}
                    />
                })}
            </div>
        </div>
    )
}