import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Home, Info, Briefcase, ShieldUser, ShoppingBag, BadgePlus, Gem, ShoppingCart } from "lucide-react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/ASLogo.png'
import logoBar from '../assets/ASLogoBar.png'
import { AuthContext } from "../store/AuthContext";
import { CartContext } from "../store/CartContext";

export default function VivoThemeUI() {
    const [darkMode, setDarkMode] = useState(false);
    const [bar, setBar] = useState(false);


    const cartCtx = useContext(CartContext);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const pageVariants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 },
    };

    function logout() {
        alert("Logout Successfull");
        authCtx.logout();
        navigate("/login");
    }
    function showCartHandler() {
        setBar(false)
        navigate("/cart");
    }
    return (
        <div className="">
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
                <span className="md:hidden fixed z-50 top-3 right-3 text-black">
                    <button onClick={() => setBar(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                            <path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" />
                        </svg>
                    </button>
                </span>
            )}
            <div className="flex">
                {!bar && <div className="relative max-md:fixed top-5 z-50">
                    <img src={logoBar} className="transition-all duration-1000 ease-in-out w-24 h-24" />
                </div>}
                <motion.div
                    className={`h-fit top-0 glass-card max-md:py-3 max-md:pr-5 md:p-5 rounded-2xl shadow-2xl backdrop-blur-md bg-white/10 w-fit max-md:w-full mt-2 z-40   relative mx-auto  max-md:fixed max-md:z-40 max-md:transition-all max-md:duration-500 max-md:ease-in-out ${bar ? "max-md:top-0" : "max-md:-top-full"}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <nav className="flex items-start justify-between z-50">
                        <img src={logoBar} className="md:hidden w-24 h-24 z-50" />
                        <ul className="flex items-center max-md:items-start gap-5 max-md:flex-col max-md:py-5">
                            {/* {tabs.map((tab) => (
                            <motion.button
                                key={tab.name}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`px-6 py-2 rounded-full flex items-center space-x-2 transition-all ${activeTab === tab.name ? "bg-yellow-500/20" : "hover:bg-white/10"
                }`}
                                onClick={() => setActiveTab(tab.name)}
                            >
                                {tab.icon}
                                <Link to={`/${authCtx.isAuthenticated ? "admin/addProduct" : tab.name}`} className="capitalize">{tab.name}</Link>
        </motion.button>

    ))
} */}
                            <motion.li whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.5 }}
                                onClick={() => setBar(false)}
                                className={`px-6 py-2 cursor-pointer rounded-full flex items-center space-x-2 transition-all hover:bg-yellow-500/50 ${isActive('/about') ? 'bg-yellow-500/50' : ' '}`}>
                                <Link to="/" className="capitalize">Home</Link>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.5 }}
                                onClick={() => setBar(false)}
                                className={`px-6 py-2 cursor-pointer rounded-full flex items-center space-x-2 transition-all hover:bg-yellow-500/50 ${isActive('/about') ? 'bg-yellow-500/50' : ' '}`}>
                                <Link to="/about" className="capitalize">About</Link>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.5 }}
                                onClick={() => setBar(false)}
                                className={`px-6 py-2 cursor-pointer rounded-full flex items-center space-x-2 transition-all hover:bg-yellow-500/50 ${isActive('/shop') ? 'bg-yellow-500/50' : ' '}`}>
                                <Link to="/shop" className="capitalize">Shop</Link>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.5 }}
                                onClick={() => setBar(false)}
                                className={`px-6 py-2 cursor-pointer rounded-full flex items-center space-x-2 transition-all hover:bg-yellow-500/50 ${isActive('/order') ? 'bg-yellow-500/50' : ' '}`}>
                                <Link to="/order" className="capitalize">order</Link>
                            </motion.li>
                            {
                                authCtx.isAuthenticated && <motion.li whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.5 }}
                                    onClick={() => setBar(false)}
                                    className={`px-6 py-2 cursor-pointer rounded-full flex items-center space-x-2 transition-all hover:bg-yellow-500/50 ${isActive('/admin/addProduct') ? 'bg-yellow-500/50' : ' '}`}>
                                    <Link to="/admin/addProduct" className="capitalize">Add Products</Link>
                                </motion.li>
                            }
                            {
                                authCtx.isAuthenticated && <motion.li whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.5 }}
                                    onClick={() => setBar(false)}
                                    className={`px-6 py-2 cursor-pointer rounded-full flex items-center space-x-2 transition-all hover:bg-yellow-500/50 ${isActive('/admin/products') ? 'bg-yellow-500/50' : ' '}`}>
                                    <Link to="/admin/products" className="capitalize">Products</Link>
                                </motion.li>
                            }
                            {
                                !authCtx.isAuthenticated && <motion.li whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.5 }}
                                    onClick={() => setBar(false)}
                                    className={`px-6 py-2 cursor-pointer rounded-full flex items-center space-x-2 transition-all hover:bg-yellow-500/50 ${isActive('/login') ? 'bg-yellow-500/50' : ' '}`}>
                                    <Link to="/login" className="capitalize">admin</Link>
                                </motion.li>
                            }
                            {
                                authCtx.isAuthenticated && <motion.li whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.5 }}
                                    onClick={() => setBar(false)}
                                    className={`px-6 py-2 cursor-pointer rounded-full flex items-center space-x-2 transition-all hover:bg-yellow-500/50 ${isActive('/login') ? 'bg-yellow-500/50' : ' '}`}>
                                    <button onClick={logout} className="capitalize">Logout</button>
                                </motion.li>
                            }
                            <motion.button whileHover={{ scale: 1.1 }}
                                onClick={showCartHandler}
                                whileTap={{ scale: 0.5 }}
                                className={`px-6 py-2 cursor-pointer rounded-full flex items-center space-x-2 transition-all hover:bg-yellow-500/50 ${isActive('/cart') ? 'bg-yellow-500/50' : ' '}`}>
                                <ShoppingCart size={24} />
                                <p>{cartCtx.items.length}</p>
                            </motion.button>
                        </ul >
                        {/* <motion.button whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} onClick={toggleDarkMode} className="p-2">
                        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </motion.button> */}
                    </nav >

                    {/* <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="text-center text-3xl font-semibold"
                    >
                        {activeTab} Page
                    </motion.div>
                </AnimatePresence> */}
                </motion.div>
            </div >
            <Outlet />
        </div >
    );
}
