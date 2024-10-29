import { createBrowserRouter } from "react-router-dom";
import Layouth from "./layouts/Layouth";
import Products from "./views/Products";
import NewProduct from "./views/NewProduct";
import AuthLayouth from "./layouts/AuthLayouth";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import NewCategory from "./views/NewCategory";
import Orders from "./views/Orders";
import Perfil from "./views/Perfil";
import ActiveOrders from "./components/ActiveOrders";
import CompleteOrders from "./components/CompleteOrders";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Layouth/>,
        children: [
            {   
                index: true,
                element:<Home/>
            },
            {   
                path:'products',
                element:<Products/>
            },
            {   
                path:'new-product',
                element:<NewProduct/>,
            },
            {   
                path:'update-product/:id',
                element:<NewProduct/>,
            },
            {   
                path:'new-category',
                element:<NewCategory/>,
            },
            {   
                path:'orders',
                element:<Orders/>,
                children: [
                    {
                        index: true,
                        element:<ActiveOrders/>
                    },
                    {
                        path:'completeOrders',
                        element:<CompleteOrders/>
                    }
                ]
            },
            {   
                path:'perfil',
                element:<Perfil/>,
            },
            
        ]

    },
    {
        path:'/auth',
        element: <AuthLayouth/>,
        children: [
            {   
                index: true,
                element:<Login/>
            },
            {
                path:'/auth/register',
                element:<Register/>,
            }
        ]
    }
])