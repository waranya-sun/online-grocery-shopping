import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink, useParams, useRouteMatch } from "react-router-dom";
import ProductDetailInfo from "./ProductDetailInfo.js";
import ProductDetailNutrition from "./ProductDetailNutrition.js";
import ProductDetailStorage from "./ProductDetailStorage.js";
import useFetch from "./useFetch.js";
import cheese from "./assets/images/cheese.png";
import milk from "./assets/images/milk.png";
import yogurt from "./assets/images/yogurt.png";
import egg from "./assets/images/egg.png";
import tomato from "./assets/images/tomato.png";
import kiwi from "./assets/images/kiwi.png";

export default function ProductDetails(props) {
    const [product, setProduct] = useState({});
    const { get } = useFetch("https://supermarketapp-5709e-default-rtdb.firebaseio.com/");
    const params = useParams();
    const match = useRouteMatch();
    console.log(match.path);
    console.log(match.url);

    useEffect(() => {
        get(`productinfo/id${params.id}.json`)
            .then(data => {
                console.log(data);
                setProduct(data)
            })
            .catch(error => console.error(error))
    }, [])

    const img_src = product.image;
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
        <div className="product-details-layout">
            <div>
                <h2>{product.name}</h2>
                <img
                    src={imgSrc(img_src)}
                    width="125"
                    height="125"
                    className="product-details-img"
                    alt={product.name}
                />
            </div>
            <div>
                <div className="tabs productDetails">
                    <ul>
                        <li>
                            <NavLink exact activeClassName="tab-active" to={match.url}>
                                Details
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="tab-active" to={match.url + "/nutrition"}>
                                Nutrition
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="tab-active" to={match.url + "/storage"}>
                                Storage
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path={match.path}>
                        <ProductDetailInfo
                            onProductAdd={props.onProductAdd}
                            product={product}
                        />
                    </Route>
                    <Route exact path={match.path + "/nutrition"}>
                        <ProductDetailNutrition nutrition={product.nutrition} />
                    </Route>
                    <Route exact path={match.path + "/storage"}>
                        <ProductDetailStorage storage={product.storage} />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}