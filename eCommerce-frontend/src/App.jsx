import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ListedProducts } from './user/ListedProducts';
import { NavigationBar } from './user/NavigationBar';
import { HomePage } from './user/HomePage';
import { Cart } from './user/Cart';
import { About } from './user/About';
import { CartContextProvider } from './store/CartContext';
import { Login } from './user/Login';
import { SignUp } from './user/SignUp';
import { AuthProvider, AuthContext } from './store/AuthContext';
import { AddItmesForm } from './admin/AddItmesForm';
import { ListedItems } from './admin/ListedItems';
import { EditPage } from './admin/EditPage';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { Orders } from './user/Orders';
import { Reset } from './admin/Reset';
import { ResetPassword } from './admin/ResetPassword';
import { Categories } from './user/Categories';
import { OrderContextProvider } from './store/OrderContext';
import VivoThemeUI from './test/Test';
// Protected Route Component


const router = createBrowserRouter([
  {
    path: '/',
    element: <VivoThemeUI />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'shop', element: <ListedProducts /> },
      { path: 'shop/:category', element: <Categories /> },
      { path: 'cart', element: <Cart /> },
      { path: 'order', element: <Orders /> },
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login /> },
      // { path: 'signup', element: <SignUp /> },
      { path: 'reset', element: <Reset /> },
      { path: 'reset/:token', element: <ResetPassword /> },
      {
        path: '/admin',
        element: <ProtectedRoute />, // Wrap admin routes with ProtectedRoute
        children: [
          { path: 'addProduct', element: <AddItmesForm /> },
          { path: 'products', element: <ListedItems /> },
          { path: 'edit/:id', element: <EditPage /> },
        ]
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <OrderContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </OrderContextProvider>
    </AuthProvider>
  );
}

export default App;
