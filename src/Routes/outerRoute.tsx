import React from "react";


const Login = React.lazy(() => import("../Views/Login"));
const NotFound = React.lazy(() => import("../Views/NotFound"))
const Forbidden = React.lazy(() => import("../Views/Forbidden"))


const outerRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/403', Element: <Forbidden /> },
    { path: '*', element: <NotFound /> },
]

export default outerRoutes

