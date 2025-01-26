import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../Pages/Root';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';


import ItemDetails from '../Pages/itemDetails';
import LostFoundItems from '../Pages/LostFoundItems ';
import AddLostFound from '../Pages/addLostFound';
import MyItems from '../Pages/Manage My items/MyItems';


const Router = createBrowserRouter([
    {
        path: '/',
        element: <Root />, // Root element that contains the layout
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'addItems',
                element: <AddLostFound></AddLostFound>
            },
            {
                path: 'lostFoundItems',
                element: <LostFoundItems></LostFoundItems> 
            },
            {
                path: 'items/:id', 
                element: <ItemDetails></ItemDetails> 
            },
            {
                path:'/myItems',
                element:<MyItems></MyItems>
            }
        ],
    },
]);

export default Router;
