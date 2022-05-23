import { RouteGroup } from "../common/route"
import { PTMSIDecoder } from "../pages/home/ptmsi"
import { Welcome } from "../pages/home/welcome"

export const HomeIndex = RouteGroup({
    pathPrefix: "/home",
    routes: [
        { pathName: "welcome", title: "Welcome", element: <Welcome /> },
        { pathName: "ptmsi", title: "PTMSI Decoder", element: <PTMSIDecoder /> },
    ]
})