// routes.js
import { createBrowserRouter, useNavigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { useContext ,useEffect} from 'react';
import { Appcontext } from './context/AppContext';
import Create from "./pages/Post/Create";
import Show from "./pages/Post/Show";
import Update from "./pages/Post/Update";

const route = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <ConditionalRedirectRoute> <Login /></ConditionalRedirectRoute>
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path:'/create',
                element:<Create/>
            },
            {
                path:"/posts/:id",
                element:<Show/>,
            },
            {
                path:'/posts/update/:id',
                element:<Update/>
            }
        ],
    },
]);

function ConditionalRedirectRoute ({ children }) {
    const { user, loading } = useContext(Appcontext);
    const navigate = useNavigate();

    // Ensure the component doesn't redirect before loading the user context
    useEffect(() => {
        if (user && !loading) {
            navigate("/");
        }
    }, [user, loading, navigate]);

    if (loading) {
        return <div>Loading...</div>; // You can add a loading spinner or message here
    }

    return children;
}

export default route;
