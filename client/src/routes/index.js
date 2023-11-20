import Home from "../pages/Home";
import BXH from "../pages/BXH";
import Top100 from "../pages/Top100";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Favorite from "../pages/Favorite";
import History from "../pages/History";
import { HeaderOnly } from "../Layouts";
import ForgetPassword from "../pages/ForgetPassword";
import config from "../config";
import Dashboard from "../pages/Dashboard";
import Logout from "../pages/Logout";
import VerifyEmail from "../pages/VerifyEmail";

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.bxh,
        component: BXH,
    },
    {
        path: config.routes.top100,
        component: Top100,
    },
    {
        path: config.routes.favorite,
        component: Favorite,
    },
    {
        path: config.routes.history,
        component: History,
    },
    {
        path: config.routes.login,
        component: Login,
        layout: HeaderOnly,
    },
    {
        path: config.routes.signup,
        component: Signup,
        layout: HeaderOnly,
    },
    {
        path: config.routes.forgetPassword,
        component: ForgetPassword,
        layout: HeaderOnly,
    },
    {
        path: config.routes.logout,
        component: Logout,
        layout: null,
    },
    {
        path: config.routes.verifyEmail,
        component: VerifyEmail,
        layout: HeaderOnly,
    },
];
const privateRoutes = [
    {
        path: config.routes.dashboard,
        component: Dashboard,
    },
];

export { publicRoutes, privateRoutes };
