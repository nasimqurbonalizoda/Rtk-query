import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/layout'
import RtkTodos from './pages/rtkTodos'
import RtkCategori from './pages/rtkCategori'
import Infopage from './pages/infopage'
import Infobyid from './pages/infobyid'

const App = () => {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          index:true,
          element:<RtkTodos/>
        },
        {
          path:"/rtkCategori",
          element:<RtkCategori/>
        },
        {
          path:"/infopage/:id",
          element:<Infopage/>
        },
        {
          path:"/infobyid/:id",
          element:<Infobyid/>
        }
       
      ]
    }
  ])
  return <RouterProvider router={router}/> 
}
export default App

