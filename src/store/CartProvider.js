import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [{
    id: 12,
    name: 'test',
    amount: 11,
    price: 123
  }],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if(action.type === 'ADD'){
    console.log('action.type===add', state);
    
    const updatedItems = state && state.items.concat(action.item);
    const updatedTotalAmount = state && state.totalAmount + (action.item.price * action.item.amount)

    console.log('action.type===add', updatedItems, updatedTotalAmount);
    return;
    // return {
    //   items: updatedItems,
    //   totalAmount : updatedTotalAmount
    // }
  }else if(action.type === 'DELETE'){
    // const updatedItems = state.items.map(item => item.id !== action.id);
    // const updatedTotalAmount = state.totalAmount - (action.item.price * action.item.amount)

    // return {
    //   items: updatedItems,
    //   totalAmount : updatedTotalAmount
    // }
    return;
  }
  return defaultCartState;
}

const CartProvider = (props) => {
  const[cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    console.log('item:', item, cartState);
    dispatchCartAction({type: 'ADD', item: item})
  };

  const removeItemFromCartHandler = (id) => {
    console.log('removeItemFromCartHandler:', id);
    dispatchCartAction({type: 'DELETE', id: id})
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
