import { RouteGroup } from "../common/route"
import { ConfigurationForm } from "../pages/home/configurationform"
import { IPAddressFormat } from "../pages/home/ipaddress"
import { MMLMirror } from "../pages/home/mmlmirror"
import { PTMSIDecoder } from "../pages/home/ptmsi"
import { Welcome } from "../pages/home/welcome"

export const HomeIndex = RouteGroup({
    pathPrefix: "/home",
    routes: [
        { pathName: "welcome", title: "Welcome", element: <Welcome /> },
        { pathName: "ptmsi", title: "PTMSI Decoder", element: <PTMSIDecoder /> },
        { pathName: "configurationform", title: "Configuration Form", element: <ConfigurationForm /> },
        { pathName: "mmlmirror", title: "MML Mirror", element: <MMLMirror /> },
        { pathName: "ipaddress", title: "IP Address Format", element: <IPAddressFormat /> },
    ]
})