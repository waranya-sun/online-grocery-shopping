import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home.js";
import Products from "./Products.js"
import ProductDetails from "./ProductDetails";
import Cart from "./Cart.js";

function App() {
  localStorage.setItem("cart", []);
  const [cart, setCart] = useState(function () {
    let savedCart = [];
    try {
      savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      savedCart = [];
    }
    return savedCart;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function handleProductAdd(newProduct){
    // check if item exists
    const existingProduct = cart.find( product => product.id === newProduct.id);
    if(existingProduct){
      const updatedCart = cart.map( product => {
        if(product.id === newProduct.id){
          return {
            ...product,
            quantity : product.quantity + 1
          };
        }
        return product;
      });
      setCart(updatedCart);
    }else{
    // product is a new one to the cart 
    setCart([...cart, {...newProduct, quantity : 1}]);
    }
  }

  function handleProductDelete(id){
    const updatedCart = cart.filter( product => product.id !== id)
    setCart(updatedCart);
  }

  return (
    <BrowserRouter>
      <Navbar cart={cart} />
      <div className="container">
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/products"><Products
            cart={cart}
            onProductAdd={handleProductAdd}
            onProductDelete={handleProductDelete}
          /></Route>
          <Route path="/products/:id"><ProductDetails onProductAdd={handleProductAdd} /></Route>
          <Route exact path="/cart"><Cart cart={cart} /></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
