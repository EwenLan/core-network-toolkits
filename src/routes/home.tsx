import { RouteGroup } from "../common/route"
import { Func } from "../pages/home/function"
import { Welcome } from "../pages/home/welcome"

export const HomeIndex = RouteGroup({
    pathPrefix: "/home",
    routes: [
        { pathName: "welcome", title: "Welcome", element: <Welcome /> },
        { pathName: "function", title: "Function", element: <Func /> },
    ]
})