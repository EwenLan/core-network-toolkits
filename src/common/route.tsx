import { ItemType } from "antd/lib/menu/hooks/useItems"
import { Link, RouteObject } from "react-router-dom"
import { OptionsGroup } from "../templates/optionsgroup"

interface RouteProps {
    pathName: string
    title: string
    element: JSX.Element
}

interface RouteGroupProps {
    pathPrefix: string
    routes: RouteProps[]
}

export function SiderLinks(siderLinks: RouteGroupProps): ItemType[] {
    return siderLinks.routes.map((val, ind) => ({
        key: ind,
        label: <Link to={`${siderLinks.pathPrefix}/${val.pathName}`}>{val.title}</Link>
    } as ItemType))
}

export function RouteGroup(routeGroup: RouteGroupProps): RouteObject[] {
    const siderLinks = SiderLinks(routeGroup)
    return routeGroup.routes.map((val) => ({
        path: `${routeGroup.pathPrefix}/${val.pathName}`,
        element: <OptionsGroup siderLinks={siderLinks} content={val.element} />
    } as RouteObject))
}