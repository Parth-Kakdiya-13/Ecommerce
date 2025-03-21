import React, { useState, useContext } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "../store/CartContext";
import { AuthContext } from "../store/AuthContext";
import logo from '../assets/ASLogo.png'
import logoBar from '../assets/ASLogoBar.png'
import { Button } from "../components/Button";

export const NavigationBar = () => {
    const [bar, setBar] = useState(false);
    const [animateCart, setAnimateCart] = useState(false);

    const cartCtx = useContext(CartContext);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    console.log(isActive);

    function showCartHandler() {
        setBar(false)
        navigate("/cart");
    }

    function logout() {
        alert("Logout Successfull");
        authCtx.logout();
        navigate("/login");
    }

    return (
        <header>
            {!bar && (
                <span className="md:hidden fixed z-50 top-3 right-3 text-black">
                    <button onClick={() => setBar(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16">
                            <path fill="currentColor" d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75m0 4A.75.75 0 0 1 2.75 7h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 7.75m0 4a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75" />
                        </svg>
                    </button>
                </span>
            )}

            {bar && (
                <span className="md:hidden fixed z-50 top-3 right-3 text-white">
                    <button onClick={() => setBar(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" />
                        </svg>
                    </button>
                </span>
            )}

            {!bar && <div className="md:hidden">
                <img src={logoBar} className="transition-all duration-1000 ease-in-out fixed z-50 top-4 left-0 w-24 h-24" />
            </div>}


            {/* Navbar */}
            <motion.nav
                initial={bar ? { y: -200 } : {}}
                animate={bar ? { y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`w-4/5 max-[960px]:w-full relative mx-auto flex items-center justify-between px-5 py-10 bg-black rounded-full min-[960px]:mt-5 max-md:flex-col max-md:items-end max-[960px]:rounded-none max-md:mt-0 max-md:fixed max-md:z-40 max-md:transition-all max-md:duration-500 max-md:ease-in-out ${bar ? "max-md:top-0" : "max-md:-top-96"
                    }`}
            >
                <div className="max-[1250px]:mr-20">
                    <img src={logo} className="absolute top-4 left-0 w-24 h-24" />
                </div>
                <ul className="flex items-center max-md:flex-col gap-2 max-md:items-start">
                    <li className={`mx-0 lg:mx-1 xl:mx-5 text-white hover:text-yellow-500 ${isActive('/') ? 'text-yellow-500' : ' '}`} onClick={() => setBar(false)}><Link to="/">Home</Link></li>
                    <li className={`mx-0 lg:mx-1 xl:mx-5 text-white hover:text-yellow-500 ${isActive('/about') ? 'text-yellow-500' : ' '}`} onClick={() => setBar(false)}><Link to="/about">About Us</Link></li>
                    <li className={`mx-0 lg:mx-1 xl:mx-5 text-white hover:text-yellow-500 ${isActive('/shop') ? 'text-yellow-500' : ' '}`} onClick={() => setBar(false)}><Link to="/shop">Shop</Link></li>
                    <li className={`mx-0 lg:mx-1 xl:mx-5 text-white hover:text-yellow-500 ${isActive('/order') ? 'text-yellow-500' : ' '}`} onClick={() => setBar(false)}><Link to="/order">Orders</Link></li>
                    {authCtx.isAuthenticated && <li className={`mx-0 lg:mx-1 xl:mx-5 text-white hover:text-yellow-500 ${isActive('/admin/addProduct') ? 'text-yellow-500' : ' '}`} onClick={() => setBar(false)}><Link to="/admin/addProduct">Add Product</Link></li>}
                    {authCtx.isAuthenticated && <li className={`mx-0 lg:mx-1 xl:mx-5 text-white hover:text-yellow-500 ${isActive('/admin/products') ? 'text-yellow-500' : ' '}`} onClick={() => setBar(false)}><Link to="/admin/products">Products</Link></li>}
                    {!authCtx.isAuthenticated && <li className={`mx-0 lg:mx-1 xl:mx-5 text-white hover:text-yellow-500 ${isActive('/login') ? 'text-yellow-500' : ' '}`} onClick={() => setBar(false)}><Link to="/login">Admin</Link></li>}
                    {/* {!authCtx.isAuthenticated && <li className={`mx-0 lg:mx-5 text-white hover:text-yellow-500 ${isActive('/signup') ? 'text-yellow-500' : ' '}`} onClick={() => setBar(false)}><Link to="/signup">SignUp</Link></li>} */}
                    {authCtx.isAuthenticated && (
                        <li className="mx-0 lg:mx-5 text-white hover:text-yellow-500">
                            <button onClick={logout}>Logout</button>
                        </li>
                    )}
                </ul>
                <div className="flex items-center max-md:mt-5">
                    <Button
                        className='text-md rounded-full flex gap-3 justify-center items-center'
                        onClick={showCartHandler}
                    >
                        Cart <p className='w-5 h-5 flex items-center justify-center rounded-full text-white bg-black'>{cartCtx.items.length}</p>
                    </Button>

                </div>
            </motion.nav>
            <Outlet />
        </header>
    );
};
