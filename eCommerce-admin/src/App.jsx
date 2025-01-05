import { AddItmesForm } from "./components/AddItmesForm"
import { HomePage } from "./components/HomePage"
import { ListedItems } from "./components/ListedItems"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { NavigationBar } from "./components/NavigationBar"
import { EditPage } from "./components/EditPage"


function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <NavigationBar />, children: [
        { path: "/", element: <HomePage /> },
        { path: "/addproduct", element: <AddItmesForm /> },
        { path: "/listedproducts", element: <ListedItems /> },
        { path: "/edit/:id", element: <EditPage /> }
      ]
    },
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
