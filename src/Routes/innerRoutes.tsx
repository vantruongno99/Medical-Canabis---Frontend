import React from "react";


const Home = React.lazy(() => import("../Views/Home"));
const Tasks = React.lazy(() => import("../Views/Task/Tasks"));
const Devices = React.lazy(() => import("../Views/Device/Devices"));
const Device = React.lazy(() => import("../Views/Device/Device"));
const CreateDevice = React.lazy(() => import("../Views/Device/CreateDevice"));
const CreateTask = React.lazy(() => import("../Views/Task/CreateTask"));
const Task = React.lazy(() => import("../Views/Task/Task"));

const innerRoutes = [
    { path: '/', element: <Home /> },
    { path: '/task/:id', element: <Task /> },
    { path: '/task', element: <Tasks /> },
    { path: '/device/:id', element: <Device /> },
    { path: '/device', element: <Devices /> },
    { path: '/device/new', element: <CreateDevice /> },
    { path: '/task/new', element: <CreateTask /> },


]

export default innerRoutes

