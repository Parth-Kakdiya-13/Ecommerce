import { createContext, useState } from "react";

export const OrderContext = createContext({
    orders: [],  // ✅ Renamed to 'orders' to avoid confusion with cart items
    placeOrder: () => { },
});

export const OrderContextProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    function placeOrder(items, totalAmount) {
        if (items.length === 0) return;

        setOrders((preOrder) => [
            ...preOrder,
            { items, totalAmount }
        ]);
    }

    console.log("Orders:", orders);

    const ctxValue = {
        orders, // ✅ Only contains objects with items & totalAmount
        placeOrder,
        setOrders
    };

    return (
        <OrderContext.Provider value={ctxValue}>
            {children}
        </OrderContext.Provider>
    );
};
