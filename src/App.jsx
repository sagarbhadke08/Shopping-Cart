

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import CartContextProvider from "./store/shopping-cart-context.jsx";
import Product from "./components/Product.jsx";

function App() {
  
  return (
    <CartContextProvider>
      {/* <CartContext.Provider value={shoppingCart}> */}
      {/* <CartContext.Provider value={{ items: [] }}> */}
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
      {/* onAddItemToCart={handleAddItemToCart} /> */}
    </CartContextProvider>
  );
}

export default App;
