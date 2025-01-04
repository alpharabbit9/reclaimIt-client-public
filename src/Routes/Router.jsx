import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../Pages/Root';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Regiser from '../Pages/Register';
import Register from '../Pages/Register';
import AddLostFound from '../Pages/addLostFound';

const Router = createBrowserRouter([
    {
        path:'/',
        element:<Root></Root>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'login',
                element:<Login></Login>
            },
            {
                path:'register',
                element:<Register></Register>
            },
            {
                path:'addItems',
                element:<AddLostFound></AddLostFound>
            }
        ]
    }
])
    

export default Router;