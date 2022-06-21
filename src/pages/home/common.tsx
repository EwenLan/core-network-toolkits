import { Col, Row, Typography } from "antd"
const { Text } = Typography

type wrapText = string | JSX.Element
export enum KeyValuePairDirection {
    horizontal = "horizontal",
    vertical = "vertical"
}

interface WrappedTextPropsType {
    text: wrapText
    bold?: boolean
}

interface KeyValuePairPropsType {
    title: wrapText
    value: wrapText
    direction?: KeyValuePairDirection
}


export function KeyValuePair(props: KeyValuePairPropsType) {
    if (props.direction === KeyValuePairDirection.vertical) {
        return (
            <div >
                <Row align="middle">
                    <Col flex="auto">
                        <WrappedText text={props.title} bold={true} />
                    </Col>
                </Row>
                <Row align="middle">
                    <Col flex="auto">
                        <WrappedText text={props.value} />
                    </Col>
                </Row>
            </div>
        )
    }
    return (
        <Row align="middle" className="row-space">
            <Col flex="180px"><WrappedText text={props.title} bold={true} /></Col>
            <Col flex="auto"><WrappedText text={props.value} /></Col>
        </Row>
    )
}

function WrappedText(props: WrappedTextPropsType) {
    if (typeof (props.text) === "string") {
        return (
            <Text strong={props.bold}>{props.text}</Text>
        )
    }
    return props.text
}