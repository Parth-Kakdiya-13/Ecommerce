import { createContext, useState } from "react";

// Create the CartContext
export const CartContext = createContext({
    items: [],
    addItems: () => { },
    removeItems: () => { }
});

// CartContextProvider component
export const CartContextProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useState([]);

    // Handler to add items to the cart
    const addItemsHandler = (item) => {
        setShoppingCart((prevState) => {
            const updatedItems = [...prevState];

            // Find the index of the item in the cart
            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem._id === item._id
            );

            if (existingCartItemIndex !== -1) {
                // If the item exists, update its quantity
                const updatedItem = {
                    ...updatedItems[existingCartItemIndex],
                    quantity: updatedItems[existingCartItemIndex].quantity + 1
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                // If the item does not exist, add it with a quantity of 1
                updatedItems.push({ ...item, quantity: 1 });
            }

            console.log(updatedItems);


            return updatedItems;
        });
    };

    // Handler to remove items from the cart
    const removeItemsHandler = (itemId) => {
        setShoppingCart((prevState) => {
            const updatedItems = [...prevState];

            // Find the index of the item in the cart
            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem._id === itemId
            );

            if (existingCartItemIndex !== -1) {
                const existingCartItem = updatedItems[existingCartItemIndex];

                if (existingCartItem.quantity > 1) {
                    // If quantity is greater than 1, decrease the quantity
                    const updatedItem = {
                        ...existingCartItem,
                        quantity: existingCartItem.quantity - 1
                    };
                    updatedItems[existingCartItemIndex] = updatedItem;
                } else {
                    // If quantity is 1, remove the item from the cart
                    updatedItems.splice(existingCartItemIndex, 1);
                }
            }


            return updatedItems;
        });
    };

    // Context value
    const ctxValue = {
        items: shoppingCart,
        addItems: addItemsHandler,
        removeItems: removeItemsHandler
    };

    // Provide the context
    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    );
};
