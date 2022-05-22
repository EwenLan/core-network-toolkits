import { Navigate } from "react-router-dom"
import { DefaultRoute } from "../constdef"
import { About } from "../pages/about"
import { HomeIndex } from "./home"

export const IndexRoutes = [
    {
        path: "/",
        element: <Navigate to={DefaultRoute} />
    },
    {
        path: "/home",
        element: <Navigate to={DefaultRoute} />
    },
    {
        path: "/about",
        element: <About />
    },
    ...HomeIndex,
]