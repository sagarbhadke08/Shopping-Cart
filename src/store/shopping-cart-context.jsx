import { createContext, useReducer, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
export const CartContext = createContext({

  items: [],
  onItemToCart: () => { },
  updateItemQuantity: () => { }, // we mention here also to get better auto completion
});


//* this function should not be recreated whenever the component dunction executes
//*bcz it dont need dorect access to any value or updated in the component function
//*Also wont need access ti props or anything like that hence defining outside the function.
//* this function will accept two parameter state param and action parameter.
//? This function wull be called by react
//? state ---> getting latest state 

function shoppingCartReducer(state, action) {

  if (action.type === 'ADD_ITEM') {



    //*  const updatedItems = [...prevShoppingCart.items]; // bcz we are receving state here which are latest guranteed from react thats why we replaced (...prevState)

    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(

      //* (cartItem) => cartItem.id === id //id here can be extracted from the actionwhich we are receving from the dispatch function wwwhere we have stored in property name payload.

      (cartItem) => cartItem.id === action.payload
    );


    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // const product = DUMMY_PRODUCTS.find((product) => product.id === id);
      const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
      updatedItems.push({
        // id: id,
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }



    return {
      items: updatedItems,
    };

  }

  if (action.type === 'UPDATE_ITEM') {
    // const updatedItems = [...prevShoppingCart.items];
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      // (item) => item.id === productId
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {

      ...state, //? Not needed here bcz we have only one value in the state but in more complex statte obejcts you wanna add that to not to lose any data
      //* If we had a more complex state object with multiple properties, we might want to spread and copy the 
      //*old state first so that we dont lose any other values and then we just update the one value in our state that is updated when this action here occurs
      items: updatedItems,
    };
  }

  return state; // return updated state


}//* next step is to connect this reducer function to the //?useReducer Hook so in useReducer hook passing the function in useReducer as 
//*1st argumrny and second value which will be set to the State wich is first agrument here 

//* action --> it will be recived from the dispatch function as we have declared
// shoppingCartDispatch({

//   type: 'ADD_ITEM', 
//   payload: id
// }


export default function CartContextProvider({ children }) {

  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
    items: [],
  });
  //? 1st value to connect with
  //? shoppinfCartReducer and second value means set the initial value  for te state in that function (shoppingCartReducer)  it with the 


  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {

    shoppingCartDispatch({

      type: 'ADD_ITEM',
      payload: id
    });



  }

  // function handleUpdateCartItemQuantity(productId, amount) {
  // setShoppingCart((prevShoppingCart) => {
  // const updatedItems = [...prevShoppingCart.items];
  // const updatedItemIndex = updatedItems.findIndex(
  //   (item) => item.id === productId
  // );

  // const updatedItem = {
  //   ...updatedItems[updatedItemIndex],
  // };

  // updatedItem.quantity += amount;

  // if (updatedItem.quantity <= 0) {
  //   updatedItems.splice(updatedItemIndex, 1);
  // } else {
  //   updatedItems[updatedItemIndex] = updatedItem;
  // }

  // return {

  //  ...state, //? Not needed here bcz we have only one value in the state but in more complex statte obejcts you wanna add that to not to lose any data
  //   //* If we had a more complex state object with multiple properties, we might want to spread and copy the 
  //   //*old state first so that we dont lose any other values and then we just update the one value in our state that is updated when this action here occurs
  //   items: updatedItems,
  // };
  // });
  // }

  function handleUpdateCartItemQuantity(productId, amount) {

    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      //* payload:  // which must be consist of two values
      //* we can pass as two values also but i m sticking to the payload idea
      payload: {
        // productId: productId,
        // amount:amount, //* we can also write like this
        productId,
        amount

      }
      //?  productId: productId,
      //?  amount:amount,
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,// added bcz to expose to contextapi
    updateItemQuantity: handleUpdateCartItemQuantity
  };

  return <CartContext.Provider value={ctxValue}>
    {children}
  </CartContext.Provider>

}