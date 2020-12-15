import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import ProductList from "./components/ProductList";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import { commerce } from "./lib/commerce";
const useStyles = makeStyles((theme) => ({
  container: {
    margin: 0,
    padding: 20,
  },
}));

const App = () => {
  const classes = useStyles();
  const [products, setProductList] = useState([]);
  const [cart, setCart] = useState([]);

  const getProductList = async () => {
    const { data } = await commerce.products.list();
    setProductList(data);
  };

  const getCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };
  useEffect(() => {
    getProductList();
    getCart();
  }, []);

  return (
    <Router>
      <div>
        <CssBaseline />
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <div className={classes.container}>
            <Route exact path="/">
              <ProductList
                products={products}
                onAddToCart={handleAddToCart}
                handleUpdateCartQty
              />
            </Route>
            <Route exact path="/cart">
              <Cart
                cart={cart}
                onUpdateCartQty={handleUpdateCartQty}
                onRemoveFromCart={handleRemoveFromCart}
                onEmptyCart={handleEmptyCart}
              />
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
