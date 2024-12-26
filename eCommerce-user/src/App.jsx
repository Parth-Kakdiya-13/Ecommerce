
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ListedProducts } from './components/ListedProducts'
import { NavigationBar } from './components/NavigationBar'
import { HomePage } from './components/HomePage'
import { Cart } from './components/Cart'
import { About } from './components/About'

function App() {

  const router = createBrowserRouter([
    {
      path: '/', element: <NavigationBar />, children: [
        { path: '/', element: <HomePage /> },
        { path: '/shop', element: <ListedProducts /> },
        { path: '/cart', element: <Cart /> },
        { path: '/about', element: <About /> }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
