import Home from "../pages/Home";
import BXH from "../pages/BXH";
import Top100 from "../pages/Top100";

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
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
