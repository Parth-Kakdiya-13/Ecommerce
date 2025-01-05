import { createContext, useState } from "react"


export const CartContext = createContext({
    items: [],
    addItems: () => { },
    removeItems: () => { }
})

export const CartContextProvider = ({ children }) => {

    const [shoppingCart, setShoppingCart] = useState({ items: [] });

    const addItemsHandler = (list) => {

        setShoppingCart((prestate) => {
            const updatedItems = [...prestate.items];

            const existingCartItemIndex = updatedItems.findIndex((cartIndex) => {
                return cartIndex._id === list._id
            })

            const existingCartItem = updatedItems[existingCartItemIndex]
            console.log(existingCartItem);

            if (!existingCartItem) {
                updatedItems.push({
                    ...list,
                    quantity: 1
                })
            } else {
                const updatedItem = {
                    ...updatedItems,
                    quantity: existingCartItem.quantity + 1
                }
                updatedItems[existingCartItemIndex] = updatedItem
            }


            return {
                ...prestate,
                items: updatedItems
            }

        })
    }

    const removeItemsHandler = () => {

    }






    const ctxvalue = {
        items: shoppingCart,
        addItems: addItemsHandler,
        removeItems: removeItemsHandler
    }




    return <CartContext.Provider value={ctxvalue}>
        {children}
    </CartContext.Provider>
}