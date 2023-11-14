import Home from "../pages/Home";
import BXH from "../pages/BXH";
import Top100 from "../pages/Top100";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const publicRoutes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/bxh",
        component: BXH,
    },
    {
        path: "/top100",
        component: Top100,
    },
    {
        path: "/login",
        component: Login,
        layout: null,
    },
    {
        path: "/signup",
        component: Signup,
        layout: null,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
