import { createContext } from "react";

export const CartContext = createContext({

    items: [],
    onItemToCart: () => { },
    updateItemQuantity: () => { }, // we mention here also to get better auto completion
});
