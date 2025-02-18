import { createContext, useState } from "react";

// Create the CartContext
export const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItems: () => { },
    removeItems: () => { }
});

// CartContextProvider component
export const CartContextProvider = ({ children }) => {
    const [shoppingCart, setShoppingCart] = useState([]);

    // Calculate the total amount
    const calculateTotalAmount = (items) => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Handler to add items to the cart
    const addItemsHandler = (item) => {
        setShoppingCart((prevState) => {
            const updatedItems = [...prevState];

            // Find if the item already exists in the cart
            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem._id === item._id
            );

            if (existingCartItemIndex !== -1) {
                // If the item exists, increase its quantity
                updatedItems[existingCartItemIndex] = {
                    ...updatedItems[existingCartItemIndex],
                    quantity: updatedItems[existingCartItemIndex].quantity + 1,
                };
            } else {
                // If the item does not exist, add it with a quantity of 1
                updatedItems.push({ ...item, quantity: 1 });
            }


            return updatedItems;
        });
    };

    // Handler to remove items from the cart
    const removeItemsHandler = (itemId) => {
        setShoppingCart((prevState) => {
            const updatedItems = [...prevState];

            // Find the item in the cart
            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem._id === itemId
            );

            if (existingCartItemIndex !== -1) {
                const existingCartItem = updatedItems[existingCartItemIndex];

                if (existingCartItem.quantity > 1) {
                    // Reduce quantity if more than 1
                    updatedItems[existingCartItemIndex] = {
                        ...existingCartItem,
                        quantity: existingCartItem.quantity - 1
                    };
                } else {
                    // Remove item if quantity is 1
                    updatedItems.splice(existingCartItemIndex, 1);
                }
            }

            return updatedItems;
        });
    };

    // Calculate totalAmount from cart items
    const totalAmount = calculateTotalAmount(shoppingCart);

    // Context value
    const ctxValue = {
        items: shoppingCart,
        totalAmount,  // Now totalAmount is included
        addItems: addItemsHandler,
        removeItems: removeItemsHandler,
        setShoppingCart
    };

    // Provide the context
    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    );
};
