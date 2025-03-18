import React, { useContext } from "react";
import { OrderContext } from "../store/OrderContext";
import { Button } from "../components/Button";

export const Orders = () => {
    const { orders, setOrders } = useContext(OrderContext);

    function cancelOrder() {
        setOrders([]);
    }

    const sendOrderToWhatsApp = () => {
        if (orders.length === 0) return;

        // Construct order message
        let message = `Hello, I would like to confirm my order:\n\n`;

        orders.forEach((order, index) => {
            message += `🛍 Order ${index + 1}:\n`;
            order.items.forEach((item) => {
                message += `🔹 ${item.title} - ₹${item.price} x ${item.quantity}\n`;
            });
            message += `💰 Total Amount: ₹${order.totalAmount}\n\n`;
        });

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // Open WhatsApp
        window.open(`https://wa.me/9664642952?text=${encodedMessage}`, "_blank");
    };

    return (
        <div className="mt-28 md:mt-5">
            {orders.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center gap-5 items-center max-sm:flex-col">
                        {orders.map((order, index) =>
                            order.items.map((list) => (
                                <ul
                                    key={list._id}
                                    className="flex flex-col items-start border p-4 rounded shadow-md w-fit h-fix"
                                >
                                    <li>
                                        <img
                                            src={`data:image/jpeg;base64,${list.image}`}
                                            alt={list.title}
                                            className="w-48 h-48 object-cover my-4"
                                        />
                                    </li>
                                    <li className="capitalize font-semibold">{list.title}</li>
                                    <li className="capitalize text-gray-500 py-1">{list.description}</li>
                                    <li className="text-teal-600 font-bold">Rs. {list.price}</li>
                                    <li className="font-thin">
                                        Quantity: <span className="font-normal"> {list.quantity}</span>
                                    </li>
                                </ul>
                            ))
                        )}
                    </div>

                    {/* ✅ Display Total Price only once, outside the loop */}
                    <p className="text-xl font-mono p-2 rounded-md w-fit bg-gray-200 my-2">
                        Total Price: Rs. {orders.reduce((sum, order) => sum + order.totalAmount, 0)}
                    </p>
                    <div className="flex gap-2 justify-center items-center max-sm:flex-col">
                        <Button onClick={sendOrderToWhatsApp}>Confirm Order</Button>
                        <Button onClick={cancelOrder}>Cancel Order</Button>
                    </div>
                </div>
            ) : (
                <p className="text-center mt-32 md:mt-0 text-xl text-gray-500">
                    No orders yet.🛍️ Start shopping now!
                </p>
            )}
        </div>
    );
};
