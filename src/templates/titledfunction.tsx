import { Typography } from "antd"
const { Title } = Typography

export interface TitledFunctionPropsType {
    title: string
    content: JSX.Element
}

export function TitledFunction(props: TitledFunctionPropsType): JSX.Element {
    return (
        <div className="title-function">
            <Title>{props.title}</Title>
            {props.content}
        </div>
    )
}