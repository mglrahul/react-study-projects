import React, { useState } from "react";

import Header from "../src/Components/Layout/Header";
import Meals from "../src/Components/Meals/Meals";
import Cart from "../src/Components/Cart/Cart";
import CartProvider from "../src/store/CartProvider";

const App = () => {
  const [cartIsShown, onCartIsShown] = useState(false);

  const showCartHandler = () =>{
    onCartIsShown(true)
  }

  const hideCartHandler = () =>{
    onCartIsShown(false)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
